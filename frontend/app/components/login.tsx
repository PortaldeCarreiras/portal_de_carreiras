'use client';

import { useState } from 'react';
import api from '../services/axiosClient';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';

export default function LoginComponent() {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { cpf, password: senha }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.token) {
                const { cpf, nome } = response.data.model;

                console.log('Login successful:', response.data);

                // Display success message
                Swal.fire("Logado com sucesso!");

                // Store the token in local storage or a cookie
                localStorage.setItem('token', response.data.token);

                // Redirect to the desired page (e.g., dashboard)
                router.push("/administrador/excel");
            } else {
                setMensagemErro("Erro ao obter token de acesso");
            }
        } catch (error) {
            console.error('Erro no login:', error);
            setMensagemErro('Usuário ou senha incorreto'); // General error message
        }
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

            {/* Seção de Login */}
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

                {/* Conteúdo da Seção de Login */}
                <div className="max-w-md bg-white border rounded shadow-md p-6 relative">
                    <label className="block text-sm font-extrabold text-gray-600 mb-2">
                        CPF:
                        <input
                            className="w-full p-2 border rounded-md mb-4 shadow-md"
                            type="text"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </label>

                    <label className="block text-sm font-extrabold text-gray-600 mb-2">
                        Senha:
                        <input
                            className="w-full p-2 border rounded-md mb-4 shadow-md"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </label>

                    <button
                        className="bg-red-500 text-white font-extrabold p-2 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:shadow-outline-blue active:bg-red-900"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <div className="mt-2 text-red-500">
                        {mensagemErro && <p>{mensagemErro}</p>}
                    </div>

                    <div className="mt-4">
                        <button
                            className="text-red-500 hover:underline focus:outline-none"
                            onClick={() => router.push('/senha/recuperar-senha')}
                        >
                            Esqueci a senha
                        </button>
                    </div>
                </div>
                {/* Fim do Conteúdo da Seção de Login */}
            </div>
        </main>
    );
}
