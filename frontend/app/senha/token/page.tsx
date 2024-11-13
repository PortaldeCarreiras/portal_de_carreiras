'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TokenPage() {
    const [token, setToken] = useState('');
    const router = useRouter();

    return (
        <main className="flex h-screen">
            {/* Imagem do Estudante */}
            <div className="flex-none w-1/3 relative">
                <div className="bg-red-500 h-full w-1/12 absolute left-0"></div>
                <Image
                    src="/images/red-girl.png"
                    className="object-cover h-full w-full"
                    alt="Estudante"
                    width={800}
                    height={600}
                />
            </div>

            {/* Seção de Token */}
            <div className="flex-grow bg-gray-400 flex flex-col items-center justify-center p-6 relative">
                
                {/* Seção de Logo da Faculdade */}
                <div className="absolute top-0 right-0 p-4 bg-white rounded-full hidden lg:block shadow-lg">
                    <Image
                        src="/images/fatecSJC.png"
                        className="object-contain h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48"
                        alt="Logo da Faculdade"
                        width={200}
                        height={150}
                    />
                </div>

                {/* Conteúdo da Seção do Token */}
                <div className="max-w-md bg-white border rounded shadow-md p-6 relative">
                    <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                        Insira o Token
                    </h1>

                    <label className="block text-sm font-extrabold text-gray-600 mb-2">
                        Token:
                        <input
                            className="w-full p-2 border rounded-md mb-4 shadow-md"
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </label>

                    <button
                        className="bg-red-500 text-white font-extrabold p-2 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:shadow-outline-blue active:bg-red-900"
                        onClick={() => {
                            router.push('/senha/nova_senha');
                        }}
                    >
                        Enviar Token
                    </button>

                    <div className="mt-4">
                        <button
                            className="text-red-500"
                            onClick={() => router.push('/')}
                        >
                            Voltar para a página de <span className="underline">Login</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
