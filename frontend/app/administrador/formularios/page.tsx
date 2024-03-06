'use client';

// Importe React para usar JSX
import React from 'react';

// Defina o tipo para as respostas do formulário
type RespostaFormulario = {
    nome: string;
    idade: number;
    cidade: string;
    // Adicione outros campos do seu formulário conforme necessário
};

export default function FormulariosPage() {
    // Dados fictícios para a tabela
    const dadosFormulario: RespostaFormulario[] = [
        { nome: 'João', idade: 25, cidade: 'São Paulo' },
        { nome: 'Maria', idade: 30, cidade: 'Rio de Janeiro' },
        { nome: 'Carlos', idade: 22, cidade: 'Belo Horizonte' },
        // ... adicione mais dados conforme necessário
    ];

    // Função para contar as respostas para cada campo do formulário
    const contarRespostas = (campo: keyof RespostaFormulario) => {
        return dadosFormulario.reduce((total, resposta) => {
            return resposta[campo] ? total + 1 : total;
        }, 0);
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-white border rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Resultados dos Formulários</h1>

            {/* Tabela de Dados do Formulário */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Dados do Formulário</h2>
                <table className="w-full border">
                    <thead>
                        <tr>
                            <th className="border p-2">Nome</th>
                            <th className="border p-2">Idade</th>
                            <th className="border p-2">Cidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dadosFormulario.map((resposta, index) => (
                            <tr key={index} className="text-center">
                                <td className="border p-2">{resposta.nome}</td>
                                <td className="border p-2">{resposta.idade}</td>
                                <td className="border p-2">{resposta.cidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
