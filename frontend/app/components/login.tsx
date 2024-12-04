'use client';

import { useState } from 'react';
import api from '../services/axiosClient';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function LoginComponent() {  
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

const handleLogin = async () => {
    try {
        // Verifica qual tipo de login é necessário (Aluno ou Administrador)
        let role: any
        const loginRoute = role === 'admin' ? '/auth/login/admin' : '/auth/login/student';

        const response = await api.post(loginRoute, { cpf, password: senha }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data.token) {
            const { cpf, nome, role, id } = response.data.model;

            console.log('Login successful:', response.data);

            // Exibe mensagem de sucesso
            Swal.fire("Logado com sucesso!");

            // Armazena o token no localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', id);

            // Redireciona baseado no papel do usuário
            if (role === 'admin') {
                router.push("/administrador/excel");  // Rota de administrador
            } else {
                router.push("/alunos");  // Rota de aluno
            }
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
                                style={{ top: '-30%' }}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </button>
                        </div>
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
