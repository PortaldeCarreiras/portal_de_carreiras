'use client';

import { useState } from 'react';
import api from '../services/axiosClient'; // Ajuste o caminho conforme necessário
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const faEyeIcon = faEye as IconProp;
    const faEyeSlashIcon = faEyeSlash as IconProp;


    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login/admin', { username, password: senha }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.token) {
                const { id } = response.data.model;

                // Exibe mensagem de sucesso
                Swal.fire("Logado com sucesso!");

                // Armazena o token e ID do administrador no localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id_admin', id);

                // Redireciona para a página inicial do administrador
                router.push("/administrador/managementforms");
            } else {
                setMensagemErro("Erro ao obter token de acesso");
            }
        } catch (error) {
            console.error('Erro no login:', error);
            setMensagemErro('Usuário ou senha incorreto');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <main className="flex h-screen">
            {/* Imagem do Administrador */}
            <div className="flex-none w-1/3 relative">
                <div className="bg-red-500 h-full w-1/12 absolute left-0"></div>
                <Image
                    src="/images/red-girl.png"
                    className="object-cover h-full w-full"
                    alt="Administrador"
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

                <div className="max-w-md bg-white border rounded shadow-md p-6">
                    <h1 className="text-center text-xl font-bold mb-4">Login do Administrador</h1>

                    <label className="block text-sm font-extrabold text-gray-600 mb-2">
                        Usuário:
                        <input
                            className="w-full p-2 border rounded-md mb-4 shadow-md"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>

                    <label className="block text-sm font-extrabold text-gray-600 mb-2">
                        Senha:
                        <div className="relative">
                            <input
                                className="w-full p-2 border rounded-md mb-4 shadow-md"
                                type={showPassword ? "text" : "password"}
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={toggleShowPassword}
                                className="absolute inset-y-0 right-2 flex items-center"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeIcon : faEyeSlashIcon} />
                            </button>
                        </div>
                    </label>

                    <button
                        className="bg-blue-500 text-white font-extrabold p-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-900"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <div className="mt-2 text-red-500">
                        {mensagemErro && <p>{mensagemErro}</p>}
                    </div>
                </div>
            </div>
        </main>
    );
}
