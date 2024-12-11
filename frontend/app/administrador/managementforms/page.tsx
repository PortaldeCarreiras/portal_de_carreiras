'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axiosClient from '../../services/axiosClient';
import Swal from 'sweetalert2';

interface Question {
    _id: string;
    pergunta: string;
    status_pergunta: boolean;
    categoria_pergunta: string;
}

export default function ManagementForms() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const router = useRouter();

    // Busca todas as questões do backend
    const fetchQuestions = async () => {
        try {
            setIsLoading(true);
            const response = await axiosClient.get('/question');
            setQuestions(response.data);
        } catch (error) {
            console.error('Erro ao buscar questões:', error);
            Swal.fire('Erro', 'Não foi possível carregar as questões.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    // Filtrar questões com base no campo de busca
    const filteredQuestions = questions.filter((question) =>
        question.pergunta.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Alternar status (Ativar/Desativar questão)
    const toggleStatus = async (question: Question) => {
        try {
            const updatedQuestion = { ...question, status_pergunta: !question.status_pergunta };
            await axiosClient.put(`/question/${question._id}`, updatedQuestion);

            Swal.fire(
                'Atualizado!',
                `A pergunta foi ${updatedQuestion.status_pergunta ? 'ativada' : 'desativada'} com sucesso.`,
                'success'
            );

            // Atualiza a lista localmente
            setQuestions((prevQuestions) =>
                prevQuestions.map((q) =>
                    q._id === question._id ? updatedQuestion : q
                )
            );
        } catch (error) {
            console.error('Erro ao alterar status da questão:', error);
            Swal.fire('Erro', 'Não foi possível atualizar a questão.', 'error');
        }
    };

    // Abrir modal de edição com os dados da questão selecionada
    const handleEditQuestion = (question: Question) => {
        setSelectedQuestion(question);
        setShowEditModal(true);
    };

    // Fechar modal de edição
    const closeEditModal = () => {
        setSelectedQuestion(null);
        setShowEditModal(false);
    };

    // Atualizar questão
    const saveQuestion = async () => {
        if (selectedQuestion) {
            try {
                await axiosClient.put(`/question/${selectedQuestion._id}`, selectedQuestion);

                Swal.fire('Atualizado!', 'A pergunta foi editada com sucesso.', 'success');

                // Atualiza a lista localmente
                setQuestions((prevQuestions) =>
                    prevQuestions.map((q) =>
                        q._id === selectedQuestion._id ? selectedQuestion : q
                    )
                );

                closeEditModal();
            } catch (error) {
                console.error('Erro ao atualizar questão:', error);
                Swal.fire('Erro', 'Não foi possível atualizar a questão.', 'error');
            }
        }
    };

    // Logout do usuário
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id_aluno');
        router.push('/');
    };

    return (
        <main className="h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-slate-100 shadow-md p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Image
                        src="/images/fatecSJC.png"
                        className="object-contain h-12 w-12 md:h-16 md:w-16"
                        alt="Logo da Faculdade"
                        width={64}
                        height={64}
                    />
                    <span className="ml-3 text-xl font-bold text-gray-800">Administração</span>
                </div>
                <div className="flex space-x-4">
                    <button onClick={handleLogout} className="text-black font-bold">
                        Logout
                    </button>
                    <button onClick={() => router.push('/administrador/dashboard')} className="text-black font-bold">
                        Dashboard
                    </button>
                    <button onClick={() => router.push('/administrador/excel')} className="text-black font-bold">
                        Excel
                    </button>
                </div>
            </nav>

            <section className="p-6 flex flex-col items-center">
                {/* Search Bar and Add Question Button */}
                <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <span className="text-black text-2xl font-bold">Questões</span>
                    <div className="flex items-center gap-4">
                        <button
                            className="text-white bg-green-500 font-bold px-4 py-2 rounded shadow-md hover:bg-green-600"
                            onClick={() => router.push('/administrador/forms')}
                        >
                            + Nova Pergunta
                        </button>
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border-2 border-[#D32F2F] bg-[#FFCDD2] p-2 rounded focus:outline-none focus:border-[#B71C1C] text-black"
                        />
                    </div>
                </div>

                {/* Questions Table */}
                <div className="w-full max-w-6xl overflow-x-auto">
                    <table className="w-full border border-[#D32F2F] table-fixed">
                        <thead>
                            <tr className="bg-[#D32F2F] text-white">
                                <th className="p-2 w-2/5">Questão</th>
                                <th className="p-2 w-1/5">Categoria</th>
                                <th className="p-2 w-1/5">Situação</th>
                                <th className="p-2 w-1/5">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredQuestions.length > 0 ? (
                                filteredQuestions.map((question) => (
                                    <tr key={question._id} className="bg-gray-200 border-b border-[#D32F2F]">
                                        <td className="p-2 text-black truncate">{question.pergunta}</td>
                                        <td className="p-2 text-black">{question.categoria_pergunta}</td>
                                        <td className="p-2 text-black text-center">
                                            {question.status_pergunta ? 'Ativada' : 'Desativada'}
                                        </td>
                                        <td className="p-2 text-center flex justify-around">
                                            <button
                                                onClick={() => handleEditQuestion(question)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => toggleStatus(question)}
                                                className={`px-3 py-1 rounded ${question.status_pergunta
                                                    ? 'bg-red-500 hover:bg-red-700 text-white'
                                                    : 'bg-green-500 hover:bg-green-700 text-white'
                                                    }`}
                                            >
                                                {question.status_pergunta ? 'Desativar' : 'Ativar'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-black">
                                        Nenhuma questão encontrada
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Edit Modal */}
            {showEditModal && selectedQuestion && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
                        <h2 className="text-lg font-bold mb-4">Editar Questão</h2>
                        <label className="block mb-2 text-black">
                            Pergunta:
                            <input
                                type="text"
                                value={selectedQuestion.pergunta}
                                onChange={(e) =>
                                    setSelectedQuestion({ ...selectedQuestion, pergunta: e.target.value })
                                }
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 text-black"
                            />
                        </label>
                        <label className="block mb-2 text-black">
                            Categoria:
                            <input
                                type="text"
                                value={selectedQuestion.categoria_pergunta}
                                onChange={(e) =>
                                    setSelectedQuestion({ ...selectedQuestion, categoria_pergunta: e.target.value })
                                }
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 text-black"
                            />
                        </label>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={closeEditModal}
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 mr-2"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={saveQuestion}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
