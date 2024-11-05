'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function NovaSenhaPage() {
    const [nova_senha, setNovaSenha] = useState('');
    const [repita_senha, setRepitaSenha] = useState('');
    const [showPasswordNova, setShowPasswordNova] = useState(false);
    const [showPasswordRepita, setShowPasswordRepita] = useState(false);
    const router = useRouter();

    const toggleShowPasswordNova = () => {
        setShowPasswordNova((prevShowPassword) => !prevShowPassword);
    };

    const toggleShowPasswordRepita = () => {
        setShowPasswordRepita((prevShowPassword) => !prevShowPassword);
    };

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

            {/* Seção da Nova senha */}
            <div className="flex-grow bg-gray-400 flex flex-col items-center justify-center p-6 relative">
                
                {/* Seção de Logo da Faculdade */}
                <div className="absolute top-0 right-0 p-4 bg-white rounded-full hidden lg:block shadow-lg">
                    <Image
                        src="/images/fatecSJC.png"
                        className="object-contain h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 "
                        alt="Logo da Faculdade"
                        width={200}
                        height={150}
                    />
                </div>

                {/* Conteúdo da Seção da Nova senha */}
                <div className="max-w-md bg-white border rounded shadow-md p-6 relative">
                    <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                        Nova senha
                    </h1>

                    <label className="block text-sm font-extrabold text-gray-600 mb-2">
                        Senha:
                        <div className="relative">
                            <input
                                className="w-full p-2 border rounded-md mb-4 shadow-md"
                                type={showPasswordNova ? "text" : "password"}
                                value={nova_senha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={toggleShowPasswordNova}
                                className="absolute inset-y-0 right-2 flex items-center"
                                style={{ top: '-30%' }}
                            >
                                <FontAwesomeIcon icon={showPasswordNova ? faEye : faEyeSlash} />
                            </button>
                        </div>
                    </label>

                    <label className="block text-sm font-extrabold text-gray-600 mb-2">
                        Repita a senha:
                        <div className="relative">
                            <input
                                className="w-full p-2 border rounded-md mb-4 shadow-md"
                                type={showPasswordRepita ? "text" : "password"}
                                value={repita_senha}
                                onChange={(e) => setRepitaSenha(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={toggleShowPasswordRepita}
                                className="absolute inset-y-0 right-2 flex items-center"
                                style={{ top: '-30%' }}
                            >
                                <FontAwesomeIcon icon={showPasswordRepita ? faEye : faEyeSlash} />
                            </button>
                        </div>
                    </label>

                    <button
                        className="bg-red-500 text-white font-extrabold p-2 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:shadow-outline-blue active:bg-red-900"
                        onClick={() => router.push('/')}
                    >
                        Atualizar senha
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
                {/* Fim do Conteúdo da Seção da Nova senha */}
            </div>
        </main>
    );
};
