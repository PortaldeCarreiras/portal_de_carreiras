'use client';

import { SetStateAction, useState } from 'react';
import Image from 'next/image';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function DashboardComponent() {
    const [selectedData, setSelectedData] = useState('data1');

    const data1 = { labels: ['Sim', 'Não'], datasets: [{ label: 'Alunos', data: [30, 50], backgroundColor: ['#FF6384', '#36A2EB'] }] };
    const data2 = { labels: ['Sim', 'Não'], datasets: [{ label: 'Alunos', data: [45, 25], backgroundColor: ['#4BC0C0', '#FF9F40'] }] };
    const data3 = { labels: ['Sim', 'Não'], datasets: [{ label: 'Alunos', data: [45, 25], backgroundColor: ['#4F5555', '#FF5554'] }] };
    const data4 = {labels: ['Tecnologia', 'Marketing', 'Recursos Humanos', 'Financeiro'], datasets: [{label: 'Alunos',data: [25, 30, 15, 20],backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']}]};

    const barData1 = { labels: ['Análise e Desenvolvimento de Sistemas', 'Banco de Dados', 'Desenvolvimento de Software Multiplataforma', 'Gestão da Produção Industrial', 'Gestão Empresarial (EaD)', 'Logística', 'Manufatura Avançada', 'Manutenção de Aeronaves', 'Projetos de Estruturas Aeronáuticas'], datasets: [{ label: 'Alunos', data: [10, 15, 20, 12, 8, 25, 30, 5, 18], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }] };
    const barData2 = { labels: ['Responderam', 'Não responderam'], datasets: [{ label: 'Alunos', data: [15, 25], backgroundColor: ['#4BC0C0', '#FF9F40'] }] };

    const handleDropdownChange = (event: { target: { value: SetStateAction<string> } }) => {
        setSelectedData(event.target.value);
    };

    return (
        <main className="h-screen bg-white">
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
                <div className="flex space-x-4">
                    <a href="/" className="text-black font-semibold">Home</a>
                    <a href="/administrador/managementforms" className="text-black font-semibold">Formulários</a>
                </div>
            </nav>

            <div className="flex flex-col items-center p-8 bg-white min-h-screen">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

                <div className="relative mb-8">
                    <select className="bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:border-slate-500" onChange={handleDropdownChange}>
                        <option value="data1">Estágio</option>
                        <option value="data2">Aluno</option>
                    </select>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    {selectedData === 'data1' ? (
                        <>
                            <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Fazendo estágio</h2>
                                <div className="w-64 h-64">
                                    <Bar data={data1} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                            <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Estágio remunerado</h2>
                                <div className="w-64 h-64">
                                    <Bar data={data2} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                            <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Trabalha na área</h2>
                                <div className="w-64 h-64">
                                    <Bar data={data3} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                            <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Área de atuação</h2>
                                <div className="w-64 h-64">
                                    <Bar data={data4} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Cursos</h2>
                                <div className="w-full max-w-full" style={{ height: '400px' }}>
                                    <Bar data={barData1} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                            <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Responderam o formulário</h2>
                                <div className="w-64 h-64">
                                    <Bar data={barData2} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
