'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axiosClient from '@/app/services/axiosClient';
import Image from 'next/image';

interface Question {
    _id: string;
    pergunta: string;
    categoria_pergunta: string;
    status_pergunta: boolean;
}

export default function FormEditorPage() {
    const { id } = useParams();
    const router = useRouter();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ativo, setAtivo] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

    // Load form data + all questions
    useEffect(() => {
        async function loadData() {
            const [formRes, questionsRes] = await Promise.all([
                axiosClient.get(`/forms/${id}`),
                axiosClient.get('/question'),
            ]);

            const form = formRes.data;
            setNome(form.nome);
            setDescricao(form.descricao);
            setAtivo(form.ativo);
            setSelectedQuestions(form.questions.map((q: Question) => q._id));
            setQuestions(questionsRes.data);
        }

        loadData();
    }, [id]);

    const toggleSelection = (qid: string) => {
        setSelectedQuestions((prev) =>
            prev.includes(qid) ? prev.filter((q) => q !== qid) : [...prev, qid]
        );
    };

    const handleUpdate = async () => {
        try {
            await axiosClient.put(`/forms/${id}`, {
                nome,
                descricao,
                questions: selectedQuestions,
                ativo,
            });
            router.push('/administrador/managementforms');
        } catch (err) {
            alert('Erro ao atualizar formulário');
            console.error(err);
        }
    };

    return (
        <main className="min-h-screen bg-gray-100">
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
                <button
                    onClick={() => router.push('/administrador/managementforms')}
                    className="text-black font-bold"
                >
                    Voltar
                </button>
            </nav>

            <section className="p-6 max-w-4xl mx-auto space-y-8">
                <h1 className="text-2xl font-bold text-black">Editar Formulário</h1>

                {/* Form Info */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="nome" className="block font-semibold text-black mb-1">
                            Nome do Formulário
                        </label>
                        <input
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2 text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="descricao" className="block font-semibold text-black mb-1">
                            Descrição
                        </label>
                        <input
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2 text-black"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={ativo}
                            onChange={(e) => setAtivo(e.target.checked)}
                            id="ativo"
                            className="h-4 w-4"
                        />
                        <label htmlFor="ativo" className="text-black">Formulário Ativo</label>
                    </div>
                </div>

                {/* Questions Selection */}
                <div className="bg-white p-4 rounded shadow-md border border-gray-200">
                    <h2 className="text-lg font-semibold text-black mb-4">Selecionar Perguntas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {questions.map((q) => (
                            <div key={q._id} className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id={q._id}
                                    checked={selectedQuestions.includes(q._id)}
                                    onChange={() => toggleSelection(q._id)}
                                    className="mt-1"
                                />
                                <label htmlFor={q._id} className="text-black">{q.pergunta}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action */}
                <div className="flex justify-end">
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Salvar Alterações
                    </button>
                </div>
            </section>
        </main>
    );
}
