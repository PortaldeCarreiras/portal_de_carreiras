'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa o useRouter

interface Data {
    [key: number]: string[];
}

export default function FormularioComponent() {
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const totalPages = 10;

    const router = useRouter(); // Inicializa o roteador

    const handleDropdownToggle = (index: number) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const data: Data = {
        1: ['Formulário A1', 'Formulário A2', 'Formulário A3', 'Formulário A4', 'Formulário A5', 'Formulário A6', 'Formulário A7', 'Formulário A8'],
        2: ['Formulário B1', 'Formulário B2', 'Formulário B3', 'Formulário B4', 'Formulário B5', 'Formulário B6', 'Formulário B7', 'Formulário B8'],
        3: ['Formulário C1', 'Formulário C2', 'Formulário C3', 'Formulário C4'],
    };

    const allData = Object.values(data).flat();

    const filteredData = allData.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const itemsPerPage = 8;
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalFilteredPages = Math.ceil(filteredData.length / itemsPerPage);

    const visiblePages =
        totalFilteredPages <= 3
            ? Array.from({ length: totalFilteredPages }, (_, i) => i + 1)
            : currentPage === 1
            ? [1, 2, 3]
            : currentPage === totalFilteredPages
            ? [totalFilteredPages - 2, totalFilteredPages - 1, totalFilteredPages]
            : [currentPage - 1, currentPage, currentPage + 1];

    return (
        <main className="h-screen bg-white">
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
                    <button onClick={() => router.push('/')} className="text-black font-bold">Home</button>
                    <button onClick={() => router.push('/administrador/dashboard')} className="text-black font-bold">Dashboard</button>
                </div>
            </nav>

            <section className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-black text-2xl font-bold">Formulários</span>
                    <div className="flex items-center">
                        <button
                            className="text-black font-bold text-xl mr-2"
                            onClick={() => router.push('/administrador/forms')}
                        >
                            +
                        </button>
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border-2 border-[#D32F2F] bg-[#FFCDD2] p-2 rounded focus:outline-none focus:border-[#B71C1C] text-black"
                        />
                        <button className="ml-2 text-black font-bold text-xl">🔍</button>
                    </div>
                </div>

                <table className="w-full border border-[#D32F2F]">
                    <thead>
                        <tr className="bg-[#D32F2F] text-black">
                            <th className="p-2">Formulário</th>
                            <th className="p-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((formulario: string, index: number) => (
                                <tr key={index} className="bg-gray-200 border-b border-[#D32F2F]">
                                    <td className="p-2 text-center text-black">{formulario}</td>
                                    <td className="p-2 text-center relative">
                                        <button
                                            onClick={() => handleDropdownToggle(index)}
                                            className="bg-[#D32F2F] text-black px-4 py-1 rounded hover:bg-[#B71C1C]"
                                        >
                                            Ações
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="p-4 text-center text-black">
                                    Nenhum formulário encontrado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {dropdownOpen !== null && (
                    <>
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 bg-white border border-[#D32F2F] rounded shadow-md z-50">
                            <button
                                onClick={() => setDropdownOpen(null)}
                                className="absolute top-2 right-2 text-black font-bold text-lg"
                            >
                                ✖
                            </button>
                            <ul className="text-center mt-6">
                                <li className="px-4 py-2 hover:bg-[#FFCDD2] cursor-pointer text-black">Editar</li>
                                <li className="px-4 py-2 hover:bg-[#FFCDD2] cursor-pointer text-black">Desativar</li>
                            </ul>
                        </div>
                    </>
                )}

                <div className="flex justify-center mt-4 space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded text-black"
                    >
                        ◄
                    </button>
                    {visiblePages.map((page, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded ${
                                currentPage === page ? 'font-bold text-[#D32F2F]' : 'text-black'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalFilteredPages}
                        className="px-3 py-1 rounded text-black"
                    >
                        ►
                    </button>
                </div>
            </section>
        </main>
    );
}
