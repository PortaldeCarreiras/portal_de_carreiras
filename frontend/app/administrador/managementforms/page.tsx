'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axiosClient from '../../services/axiosClient';
import Swal from 'sweetalert2';

interface Form {
    _id: string;
    nome: string;
    descricao?: string;
    ativo: boolean;
    questions: Question[];
}

interface Question {
    _id: string;
    pergunta: string;
    status_pergunta: boolean;
    categoria_pergunta: string;
}

export default function ManagementForms() {
    const [forms, setForms] = useState<Form[]>([]);
    const [selectedForms, setSelectedForms] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchForms = async () => {
        try {
            setIsLoading(true);
            const response = await axiosClient.get('/forms');
            setForms(response.data);
        } catch (error) {
            console.error('Erro ao buscar formulários:', error);
            Swal.fire('Erro', 'Não foi possível carregar os formulários.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchForms();
    }, []);

    const handleCreateForm = () => {
        router.push('/administrador/managementforms/new');
    };

    const goToForm = (formId: string) => {
        router.push(`/administrador/managementforms/${formId}`);
    };

    const downloadCSV = (formId: string) => {
        // downloadFunction(formId);
    }

    const handleDownloadSelected = async () => {
        try {
            const response = await axiosClient.post(
                '/export/forms-csv',
                { formIds: Array.from(selectedForms) },
                { responseType: 'blob' } // important: we expect a file
            );

            const blob = new Blob([response.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'respostas_formularios.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Erro ao baixar formulários:', error);
            Swal.fire('Erro', 'Falha ao exportar os formulários selecionados.', 'error');
        }
    };


    const handleSelectForm = (formId: string) => {
        setSelectedForms((prev) => {
            const newSet = new Set(prev);
            newSet.has(formId) ? newSet.delete(formId) : newSet.add(formId);
            return newSet;
        });
    };

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
                    <button onClick={() => router.push('/administrador/question')} className="text-black font-bold">Nova Pergunta</button>
                    <button onClick={() => router.push('/administrador/dashboard')} className="text-black font-bold">Dashboard</button>
                    <button onClick={() => router.push('/administrador/excel')} className="text-black font-bold">Excel</button>
                    <button onClick={handleLogout} className="text-black font-bold">Logout</button>
                </div>
            </nav>

            {/* Forms */}
            <section className="p-6 flex flex-col items-center">
                <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <span className="text-black text-2xl font-bold">Formulários</span>
                    <button
                        className="text-white bg-green-500 font-bold px-4 py-2 rounded shadow-md hover:bg-green-600"
                        onClick={handleCreateForm}
                    >
                        + Novo Formulário
                    </button>
                </div>

                <div className="w-full max-w-6xl overflow-x-auto">
                    <table className="w-full border border-[#D32F2F] table-fixed">
                        <thead>
                            <tr className="bg-[#D32F2F] text-white">
                                <th className="p-2 w-1/12">Selecionar</th>
                                <th className="p-2 w-2/6">Nome</th>
                                <th className="p-2 w-2/6">Descrição</th>
                                <th className="p-2 w-1/6">Status</th>
                                <th className="p-2 w-1/6">Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forms.length > 0 ? (
                                forms.map((form) => (
                                    <tr
                                        key={form._id}
                                        className="bg-gray-200 border-b border-[#D32F2F] cursor-pointer hover:bg-gray-300"

                                    >
                                        <td className="p-2 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedForms.has(form._id)}
                                                onChange={() => handleSelectForm(form._id)}
                                            />
                                        </td>
                                        <td className="p-2 text-black font-semibold text-center" onClick={() => goToForm(form._id)}>{form.nome}</td>
                                        <td className="p-2 text-black" onClick={() => goToForm(form._id)}>{form.descricao || '-'}</td>
                                        <td className="p-2 text-black text-center" onClick={() => goToForm(form._id)}>
                                            {form.ativo ? <span className="text-green-600 font-bold">Ativo</span> : 'Inativo'}
                                        </td>
                                        <td className="p-2 text-black font-semibold text-center">
                                            <button className=''
                                                onClick={() => downloadCSV}
                                            >CSV</button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="p-4 text-center text-black">
                                        Nenhum formulário encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {selectedForms.size > 0 && (
                        <div className="mt-4 flex justify-end">
                            <button
                                // onClick={() => console.log("Download selecionados:", Array.from(selectedForms))}
                                onClick={handleDownloadSelected}
                                className="text-white bg-blue-600 px-4 py-2 rounded shadow-md hover:bg-blue-700"
                            >
                                Baixar Selecionados ({selectedForms.size})
                            </button>
                        </div>
                    )}

                </div>
            </section>
        </main>
    );
}
