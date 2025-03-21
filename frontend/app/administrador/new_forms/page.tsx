'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa'; // Ícone de lixeira

export default function FormularioComponent() {

    type Block = {
        question: string;
        type: string;
        options: string[];
        required: boolean;
    }

    const [blocks, setBlocks] = useState([
        {
            question: '',
            type: 'short-text',
            options: ['Opção 1'],
            required: false
        },
    ]);

    const handleAddOption = (blockIndex: number) => {
        setBlocks((prev) => {
            const updatedBlocks = [...prev];
            const block = updatedBlocks[blockIndex];
            // Adiciona uma nova opção única com base no número de opções já existentes
            const newOption = `Opção ${block.options.length + 1}`;
            // Adiciona apenas uma opção ao array de opções
            updatedBlocks[blockIndex] = {
                ...block,
                options: [...block.options, newOption],
            };
            return updatedBlocks;
        });
    };

    // const handleUpdateBlock = (blockIndex: number, field: keyof Block, value: string | string[]) => {
    //     setBlocks((prev) => {
    //         const updatedBlocks = [...prev];

    //         if (field === 'options' && Array.isArray(value)) {
    //             updatedBlocks[blockIndex][field] = value ;
    //         } else if (field === "required" && typeof value === "boolean") {
    //             updatedBlocks[blockIndex][field] = value;
    //         }
    //         else {
    //             updatedBlocks[blockIndex][field] = value as string;
    //         }
    //         return updatedBlocks;
    //     });
    // };

    const handleUpdateBlock = <K extends keyof Block>(blockIndex: number, field: K, value: Block[K]) => {
        setBlocks((prev) => {
            const updatedBlocks = [...prev];
            updatedBlocks[blockIndex] = {
                ...updatedBlocks[blockIndex],
                [field]: value,
            }
            return updatedBlocks;
        });
    };

    const handleAddNewBlock = () => {
        setBlocks((prev) => [
            ...prev,
            { question: '', type: 'short-text', options: ['Opção 1'], required: false },
        ]);
    };

    const handleSaveForm = () => {
        alert("Formulário salvo!");
    };

    const handleDeleteForm = () => {
        if (window.confirm("Você tem certeza que deseja deletar todo o formulário?")) {
            setBlocks([]);
        }
    };

    const handleDeleteBlock = (blockIndex: number) => {
        setBlocks((prev) => {
            const updatedBlocks = prev.filter((_, index) => index !== blockIndex);
            return updatedBlocks;
        });
    };

    return (
        <main className="h-screen bg-gray-100 overflow-auto">
            {/* Navbar original */}
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
            </nav>

            {/* Exibe as Perguntas */}
            <>
                {/* Bloco do Título e Descrição */}
                <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow rounded-md">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Título do formulário"
                            className="w-full border border-gray-300 rounded-md p-2 text-lg text-black"
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Descrição do formulário"
                            className="w-full border border-gray-300 rounded-md p-2 text-black"
                            rows={3}
                        />
                    </div>
                </div>

                {/* Blocos de Perguntas */}
                {blocks.map((block, blockIndex) => (
                    <div key={blockIndex} className="max-w-3xl mx-auto mt-4 p-6 bg-white shadow rounded-md relative">
                        {/* Pergunta e Tipo de Pergunta lado a lado */}
                        <div className="flex justify-between mb-4">
                            <input
                                type="text"
                                value={block.question}
                                onChange={(e) =>
                                    handleUpdateBlock(blockIndex, 'question', e.target.value)
                                }
                                placeholder="Pergunta sem título"
                                className="w-[48%] border border-gray-300 rounded-md p-2 text-black"
                            />
                            <select
                                value={block.type}
                                onChange={(e) =>
                                    handleUpdateBlock(blockIndex, 'type', e.target.value)
                                }
                                className="w-[48%] border border-gray-300 rounded-md p-2 text-black"
                            >
                                <option value="short-text">Resposta curta</option>
                                <option value="long-text">Parágrafo</option>
                                <option value="multiple-choice">Múltipla escolha</option>
                                <option value="checkbox">Caixas de seleção</option>
                                <option value="date">Data</option>
                            </select>
                        </div>

                        {/* Campo de Resposta */}
                        {block.type === 'short-text' && (
                            <input
                                type="text"
                                placeholder="Texto de resposta curta"
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                disabled
                            />
                        )}

                        {block.type === 'long-text' && (
                            <textarea
                                placeholder="Texto de resposta longa"
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                rows={3}
                                disabled
                            />
                        )}

                        {block.type === 'date' && (
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        )}

                        {(block.type === 'multiple-choice' || block.type === 'checkbox') && (
                            <div className="mb-4">
                                {block.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex items-center mb-2">
                                        {block.type === 'multiple-choice' && (
                                            <input type="radio" name={`options-${blockIndex}`} className="mr-2" disabled />
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

                        {/* Checkbox para obrigatoriedade */}
                        <div className="flex items-center">
                            <label className="text-sm mr-2 text-black">Obrigatória:</label>
                            <input
                                type="checkbox"
                                checked={block.required}
                                onChange={() =>
                                    handleUpdateBlock(blockIndex, 'required', !block.required)
                                }
                                className="w-4 h-4"
                            />
                        </div>

                        {/* Lixeira no canto inferior direito */}
                        <button
                            onClick={() => handleDeleteBlock(blockIndex)}
                            className="absolute bottom-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                            <FaTrashAlt />
                        </button>
                    </div>
                ))}

                {/* Botões de adicionar pergunta, salvar e deletar */}
                <div className="max-w-3xl mx-auto mt-4 space-y-2">
                    <button
                        onClick={handleAddNewBlock}
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-blue-600"
                    >
                        + Adicionar outra pergunta
                    </button>

                    <div className="flex space-x-4 mt-4">
                        <button
                            onClick={handleSaveForm}
                            className="w-full md:w-1/2 bg-green-500 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-green-600"
                        >
                            Salvar
                        </button>

                        <button
                            onClick={handleDeleteForm}
                            className="w-full md:w-1/2 bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-red-600"
                        >
                            Deletar formulário
                        </button>
                    </div>
                </div>
            </>
        </main>
    );
}
