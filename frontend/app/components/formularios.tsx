'use client';

import { useState, useEffect } from 'react';
import axiosClient from '../services/axiosClient';  // Importe o axiosClient
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import router from 'next/router';

interface Pergunta {
    _id: string;
    pergunta: string;
    categoria_pergunta: string;
}

export default function FormularioComponent() {
    const [perguntas, setPerguntas] = useState<{ [key: string]: Pergunta[] }>({}); // Perguntas organizadas por categoria
    const [categorias, setCategorias] = useState<string[]>([]); // Categorias das perguntas ativas
    const [respostas, setRespostas] = useState<{ [key: string]: string }>({}); // Respostas do aluno
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null); // Categoria selecionada

    const obterPerguntasAtivas = async () => {
        try {
            // Usando o axiosClient para fazer a requisição GET
            const response = await axiosClient.get('/question');  // Note que a baseURL já está definida em axiosClient
            
            // A resposta do axios será acessada via response.data
            const data: Pergunta[] = response.data;
            console.log(data);
    
            // Organizar perguntas por categorias
            const categoriasMapeadas = data.reduce((acc: { [key: string]: Pergunta[] }, pergunta: Pergunta) => {
                const { categoria_pergunta } = pergunta;
                if (!acc[categoria_pergunta]) {
                    acc[categoria_pergunta] = [];
                }
                acc[categoria_pergunta].push(pergunta);
                return acc;
            }, {});
    
            // Definir as categorias e a primeira categoria selecionada
            setCategorias(Object.keys(categoriasMapeadas));
            setPerguntas(categoriasMapeadas);
            setCategoriaSelecionada(Object.keys(categoriasMapeadas)[0] || null); // Primeira categoria como selecionada por padrão
        } catch (error) {
            console.error('Erro ao obter perguntas ativas:', error);
        }
    };

    // Chama a função para buscar perguntas ativas ao carregar o componente
    useEffect(() => {
        obterPerguntasAtivas();
    }, []);

    // Lida com a mudança de resposta de uma pergunta específica
    const handleRespostaChange = (perguntaId: string, valor: string) => {
        setRespostas((prevRespostas) => ({
            ...prevRespostas,
            [perguntaId]: valor, // Atualiza a resposta para a pergunta específica
        }));
    };

    // Envia as respostas ao backend
    const handleSubmit = async () => {
        try {
            // Envia as respostas ao backend usando o axiosClient
            const response = await axiosClient.post('/answer', { respostas });
    
            console.log(response);
            console.log(respostas);
    
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Respostas Salvas!',
                    text: 'As respostas foram salvas com sucesso.',
                    confirmButtonText: 'OK',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro ao salvar as respostas.',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error('Erro ao salvar as respostas:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro ao enviar as respostas. Verifique o console para mais detalhes.',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleLoginRedirect = () => {
        router.push('/');
    };

    return (
        <main className="h-screen flex flex-col">
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
                    <span className="ml-3 text-xl font-bold text-gray-800"></span>
                </div>
                <button
                    className="bg-blue-500 text-white font-extrabold p-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                    onClick={handleLoginRedirect}
                >
                    Login
                </button>
            </nav>

            <div className=" bg-white flex items-center justify-center p-6">
                <div className="w-full max-w-lg lg:max-w-3xl bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Formulário de Aluno</h1>

                    {/* Título para Categorias */}
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Selecione uma Categoria:</h2>

                    {/* Botões para selecionar a categoria */}
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        {categorias.map((categoria) => (
                            <button
                                key={categoria}
                                className={`px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none hover:bg-red-600 ${categoria === categoriaSelecionada ? 'bg-red-700' : ''}`}
                                onClick={() => setCategoriaSelecionada(categoria)}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>

                    {/* Formulário de Perguntas da Categoria Selecionada */}
                    <form onSubmit={(e) => e.preventDefault()}>
                        {perguntas[categoriaSelecionada ?? '']?.map((pergunta: Pergunta) => (
                            <div key={pergunta._id} className="mb-6">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    {pergunta.pergunta}
                                </label>
                                <input
                                    type="text"
                                    value={respostas[pergunta._id] || ''}
                                    onChange={(e) => handleRespostaChange(pergunta._id, e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            </div>
                        ))}

                        {/* Botão de Salvar Respostas */}
                        <button
                            className="w-full bg-blue-600 text-white font-extrabold py-3 rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:shadow-outline-blue active:bg-blue-900"
                            onClick={handleSubmit}
                        >
                            Salvar Respostas
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
