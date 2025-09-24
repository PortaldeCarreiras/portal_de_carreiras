'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosClient from '@/app/services/axiosClient';
import Image from 'next/image';

interface Question {
    _id: string;
    pergunta: string;
    categoria_pergunta: string;
    status_pergunta: boolean;
}

export default function FormQuestionSelector() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        axiosClient.get('/question').then((res) => setQuestions(res.data));
    }, []);

    const toggleSelection = (id: string) => {
        setSelectedQuestions((prev) =>
            prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
        );
    };

    const handleCreate = async () => {
        try {
            await axiosClient.post('/forms', {
                nome,
                descricao,
                questions: selectedQuestions,
            });
            router.push('/administrador/managementforms');
        } catch (err) {
            alert('Erro ao criar o formulário');
            console.error(err);
        }
    };

    // Logout do usuário
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id_aluno');
        router.push('/');
    };

    return (
        <main className="min-h-screen w-full space-y-6 bg-gray-100">
            {/* Navbar */}
            <nav className=" bg-slate-100 shadow-md p-4 flex justify-between items-center">
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
            <div>
                <section className="p-6 max-w-4xl mx-auto space-y-8">
                    <h1 className="text-2xl font-bold text-black">Criar Novo Formulário</h1>

                    {/* Form Info */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="nome" className="block font-semibold text-black mb-1">Nome do Formulário</label>
                            <input id="nome" value={nome}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2 text-black" />
                        </div>
                        <div>
                            <label htmlFor="descricao" className="block font-semibold text-black mb-1">Descrição</label>
                            <input id="descricao" value={descricao}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescricao(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2 text-black"
                            />
                        </div>
                    </div>

                    {/* Questions Selection */}
                    <div className="bg-white p-4 rounded shadow-md border border-gray-200">
                        <h2 className="text-lg font-semibold text-black mb-4">Selecionar Perguntas</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {questions.map((q) => (
                                <div key={q._id} className="flex items-start gap-2">
                                    <input type='checkbox'
                                        id={q._id}
                                        checked={selectedQuestions.includes(q._id)}
                                        onChange={() => toggleSelection(q._id)}
                                        className='mt-1'
                                    />
                                    <label htmlFor={q._id} className="text-black">{q.pergunta}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action */}
                    <div className="flex justify-end">
                        <button onClick={handleCreate}
                            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
                        >Criar Formulário</button>
                    </div>
                </section>
            </div>

        </main>
    );
}
