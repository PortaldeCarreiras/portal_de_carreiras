'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';
import axiosClient from '../../services/axiosClient'; // Importe o cliente Axios configurado

export default function PerguntasComponent() {
    const [blocks, setBlocks] = useState([
        {
            question: '',
            category: '',
            type: 'text',
            options: ['Opção 1'],
        },
    ]);

    const handleAddOption = (blockIndex: number) => {
        setBlocks((prev) => {
            const updatedBlocks = [...prev];
            const block = updatedBlocks[blockIndex];
            const newOption = `Opção ${block.options.length + 1}`;
            updatedBlocks[blockIndex] = {
                ...block,
                options: [...block.options, newOption],
            };
            return updatedBlocks;
        });
    };

    const handleDeleteOption = (blockIndex: number, optionIndex: number) => {
        setBlocks((prev) => {
            const updatedBlocks = [...prev];
            const block = updatedBlocks[blockIndex];
            block.options.splice(optionIndex, 1);
            return updatedBlocks;
        });
    };

    const handleUpdateBlock = (blockIndex: number, field: string, value: string) => {
        setBlocks((prev) => {
            const updatedBlocks = [...prev];
            updatedBlocks[blockIndex][field] = value;
            return updatedBlocks;
        });
    };

    const handleAddNewBlock = () => {
        setBlocks((prev) => [
            ...prev,
            { question: '', category: '', type: 'text', options: ['Opção 1'] },
        ]);
    };

    const handleDeleteBlock = (blockIndex: number) => {
        setBlocks((prev) => prev.filter((_, index) => index !== blockIndex));
    };

    const handleSaveQuestions = async () => {
        try {
            for (const block of blocks) {
                const payload = {
                    pergunta: block.question,
                    categoria_pergunta: block.category,
                    status_pergunta: true, // Todas as perguntas são ativas por padrão
                };

                if (block.type === 'multiple-choice' || block.type === 'checkbox') {
                    payload['options'] = block.options; // Adiciona opções para múltipla escolha/checkbox
                }

                await axiosClient.post('/question', payload);
            }

            alert('Perguntas salvas com sucesso!');
            setBlocks([
                {
                    question: '',
                    category: '',
                    type: 'text',
                    options: ['Opção 1'],
                },
            ]);
        } catch (error) {
            console.error('Erro ao salvar perguntas:', error);
            alert('Ocorreu um erro ao salvar as perguntas.');
        }
    };

    return (
        <main className="h-screen bg-gray-100 overflow-auto">
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
                </div>
                <div>
                    <button
                        onClick={() => window.location.href = '/administrador/managementforms'}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Gerenciar Perguntas
                    </button>
                </div>
            </nav>

            {/* Blocos de Perguntas */}
            <div className="max-w-3xl mx-auto mt-8">
                {blocks.map((block, blockIndex) => (
                    <div key={blockIndex} className="mt-4 p-6 bg-white shadow rounded-md relative">
                        {/* Pergunta e Tipo de Pergunta */}
                        <div className="flex justify-between mb-4">
                            <input
                                type="text"
                                value={block.question}
                                onChange={(e) =>
                                    handleUpdateBlock(blockIndex, 'question', e.target.value)
                                }
                                placeholder="Escreva a pergunta"
                                className="w-[48%] border border-gray-300 rounded-md p-2 text-black"
                            />
                            <select
                                value={block.type}
                                onChange={(e) =>
                                    handleUpdateBlock(blockIndex, 'type', e.target.value)
                                }
                                className="w-[48%] border border-gray-300 rounded-md p-2 text-black"
                            >
                                <option value="text">Texto</option>
                                <option value="date">Data</option>
                                <option value="multiple-choice">Múltipla escolha</option>
                                <option value="checkbox">Caixas de seleção</option>
                            </select>
                        </div>

                        {/* Categoria da pergunta */}
                        <div className="mb-4">
                            <input
                                type="text"
                                value={block.category}
                                onChange={(e) =>
                                    handleUpdateBlock(blockIndex, 'category', e.target.value)
                                }
                                placeholder="Categoria da pergunta"
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        </div>

                        {/* Campo de Resposta */}
                        {block.type === 'text' && (
                            <input
                                type="text"
                                placeholder="Resposta curta"
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                disabled
                            />
                        )}

                        {block.type === 'date' && (
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                disabled
                            />
                        )}

                        {(block.type === 'multiple-choice' || block.type === 'checkbox') && (
                            <div className="mb-4">
                                {block.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex items-center mb-2">
                                        {block.type === 'multiple-choice' && (
                                            <input type="radio" className="mr-2" disabled />
                                        )}
                                        {block.type === 'checkbox' && (
                                            <input type="checkbox" className="mr-2" disabled />
                                        )}
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => {
                                                const updatedOptions = [...block.options];
                                                updatedOptions[optionIndex] = e.target.value;
                                                handleUpdateBlock(blockIndex, 'options', updatedOptions);
                                            }}
                                            className="flex-1 border border-gray-300 rounded-md p-2 text-black"
                                        />
                                        <button
                                            onClick={() => handleDeleteOption(blockIndex, optionIndex)}
                                            className="ml-2 text-red-500 hover:text-red-700"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleAddOption(blockIndex)}
                                    className="text-blue-500 text-sm mt-2"
                                >
                                    + Adicionar opção
                                </button>
                            </div>
                        )}

                        {/* Botão para excluir bloco */}
                        <button
                            onClick={() => handleDeleteBlock(blockIndex)}
                            className="absolute bottom-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                            <FaTrashAlt />
                        </button>
                    </div>
                ))}

                {/* Botões de adicionar pergunta e salvar */}
                <div className="mt-4 space-y-4">
                    <button
                        onClick={handleAddNewBlock}
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-blue-600"
                    >
                        + Adicionar nova pergunta
                    </button>

                    <button
                        onClick={handleSaveQuestions}
                        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-green-600"
                    >
                        Salvar Perguntas
                    </button>
                </div>
            </div>
        </main>
    );
}
