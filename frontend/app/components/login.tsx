// LoginComponent.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';

export default function LoginComponent() {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const router = useRouter()
    var mensagem = ""

    const handleLogin = async () => {
        try {
            console.log('Antes da chamada ao backend');

            const response = await axios.post('http://localhost:3001/login', { cpf, senha })

            console.log('Após a chamada ao backend');

            if (response.data.sucesso) {
                const { cpf, nome, administrador } = response.data.usuario;

                // Sweat ALert
                Swal.fire("Logado com sucesso!")

                // Redirecionamento com base no tipo de usuário usando o componente Link
                if (administrador === 0) {
                    router.push("/alunos")
                } else if (administrador === 1) {
                    router.push("/administrador/formularios")
                } else if (administrador === 2) {
                    router.push("/administrador")
                }
            } else {
                setMensagemErro(response.data.mensagem);
                console.log(mensagemErro)
            }
        } catch (error) {
            console.error('Erro no login:', error);
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
            <div className="flex-grow bg-gray-700 flex flex-col items-center justify-center p-6 relative">

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
                        {mensagemErro && (<p>
                            {mensagemErro === 'Usuário não encontrado' && 'Usuário não encontrado. Verifique seu CPF.'}
                            {mensagemErro === 'Usuário desativado' && 'Usuário desativado. Entre em contato com o suporte.'}
                            {mensagemErro === 'Senha incorreta' && 'Senha incorreta. Tente novamente.'}
                            {mensagemErro === 'Erro interno do servidor' && 'Erro no login. Tente novamente mais tarde.'}
                        </p>)}
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
};
