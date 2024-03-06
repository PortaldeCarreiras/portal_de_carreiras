'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Lista de categorias inseridas manualmente (a ser alterado posteriormente)
const categorias = [
    { id_categoria_pergunta: 1 },
    { id_categoria_pergunta: 2 },
    { id_categoria_pergunta: 3 },
    // Adicione mais categorias conforme necessário
];

export default function FormularioComponent() {
    const [perguntas, setPerguntas] = useState([]);
    const [respostas, setRespostas] = useState({});
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(categorias[0]?.id_categoria_pergunta);

    useEffect(() => {
        // Função para obter perguntas de uma categoria específica
        const obterPerguntasPorCategoria = async () => {
            try {
                // Simulando os dados vindos do backend
                const response = await fetch(`http://localhost:3001/perguntas-por-categoria/${categoriaSelecionada}`);
                const data = await response.json();
                setPerguntas(data?.perguntas || []);
            } catch (error) {
                console.error('Erro ao obter perguntas:', error);
            }
        };

        if (categoriaSelecionada) {
            obterPerguntasPorCategoria();
        }
    }, [categoriaSelecionada]);

    const handleSubmit = () => {
        // Lógica para salvar as respostas (a ser implementada)
        // A variável 'respostas' contém as respostas do usuário
        console.log('Respostas:', respostas);

        // Exibir SweetAlert indicando que as respostas foram salvas (a ser melhorado)
        Swal.fire({
            icon: 'success',
            title: 'Respostas Salvas!',
            text: 'As respostas foram salvas com sucesso.',
            confirmButtonText: 'OK',
        });
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white border rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Formulário de Aluno</h1>

            {/* Formulário de Perguntas */}
            <form onSubmit={(e) => e.preventDefault()}>
                {perguntas.map((pergunta) => (
                    <div key={pergunta.pergunta} className="mb-4">
                        <label className="block text-sm font-extrabold text-gray-600">{pergunta.pergunta}:</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md mt-1 shadow-md"
                        />
                    </div>
                ))}

                {/* Botão de Salvar Respostas */}
                <button
                    className="bg-blue-600 text-white font-extrabold p-2 rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:shadow-outline-blue active:bg-blue-900"
                    onClick={handleSubmit}
                >
                    Salvar Respostas
                </button>
            </form>

            {/* Botões de Paginação */}
            <div className="flex space-x-2 mt-4">
                {categorias.map((categoria) => (
                    <button
                        key={categoria.id_categoria_pergunta}
                        className={`px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:shadow-outline-blue hover:bg-red-600 ${categoria.id_categoria_pergunta === categoriaSelecionada ? 'bg-red-700' : ''
                            }`}
                        onClick={() => setCategoriaSelecionada(categoria.id_categoria_pergunta)}
                    >
                        Página {categoria.id_categoria_pergunta}
                    </button>
                ))}
            </div>
        </div>
    );
}
