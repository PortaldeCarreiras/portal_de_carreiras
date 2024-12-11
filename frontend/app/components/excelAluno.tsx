'use client';

import { useState } from 'react';
import axiosClient from '../services/axiosClient';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const UploadComponent = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadType, setUploadType] = useState<'students' | 'questions'>('students'); // Tipo de upload
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    // Alterar tipo de upload
    const handleTypeChange = (type: 'students' | 'questions') => {
        setFile(null); // Limpar arquivo selecionado
        setUploadType(type);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const convertStringToBoolean = (str: string | undefined) => {
        if (typeof str !== 'string') {
            return false; // Ou qualquer valor padrão que faça sentido no seu contexto
        }
        const lowerStr = str.toLowerCase();
        return lowerStr === 'sim';
    };

    // Mapeamento para estudantes
    const mapRowToStudent = (row: any) => {
        if (!row.nome || !row.email) {
            console.error(`Dados inválidos na linha: ${JSON.stringify(row)}`);
            return null; // Ignora registros inválidos
        }
        return {
            nome: row.nome || '',
            identidade: {
                tipo: row.identidade_tipo || 'cpf',
                numero: parseInt(row.identidade) || 0,
            },
            sexo: row.sexo || '',
            estado_civil: row.estado_civil || '',
            endereco: {
                uf: row.uf || '',
                rua: row.endereco || '',
                numero: parseInt(row.numero) || 0,
                complemento: row.complemento || '',
                bairro: row.bairro || '',
                cep: parseInt(row.cep) || 0,
            },
            contatos: {
                principal: {
                    ddd: parseInt(row.ddd) || 0,
                    telefone: parseInt(row.telefone) || 0,
                    email: row.email || '',
                },
                secundario: {
                    ddd: parseInt(row.ddd_2) || 0,
                    telefone: parseInt(row.telefone_2) || 0,
                    email: row.email_2 || '',
                },
            },
            afrodescendente: convertStringToBoolean(row.afrodescendente),
            escolaridade: convertStringToBoolean(row.escolaridade),
            necessidade: row.necessidade || '',
            notas: {
                historia: parseFloat(row.historia) || 0,
                quimica: parseFloat(row.quimica) || 0,
                ingles: parseFloat(row.ingles) || 0,
                matematica: parseFloat(row.matematica) || 0,
                fisica: parseFloat(row.fisica) || 0,
                geografia: parseFloat(row.geografia) || 0,
                biologia: parseFloat(row.biologia) || 0,
                multidisciplinar: parseFloat(row.multidisciplinar) || 0,
                raciocinio_logico: parseFloat(row.raciocinio_logico) || 0,
                portugues: parseFloat(row.portugues) || 0,
                acertos: parseFloat(row.acertos) || 0,
                nota_prova: parseFloat(row.nota_prova) || 0,
                nota_redacao: parseFloat(row.nota_redacao) || 0,
                nota_final: parseFloat(row.nota_final) || 0,
                nota_final_acrescida: parseFloat(row.nota_final_acrescida) || 0,
            },
            classificacao: {
                curso_1: {
                    nome_curso: row.curso_1 || '',
                    class: parseInt(row.class) || 0,
                    situacao: row.situacao || '',
                },
                curso_2: {
                    nome_curso: row.curso_2 || '',
                    class: parseInt(row.class_2) || 0,
                    situacao: row.situacao_2 || '',
                },
            },
            documentos: {
                tipo_identidade: row.tipo_identidade || 'cpf',
                cpf: parseInt(row.cpf) || 0,
                nome_mae: row.nome_mae || '',
            },
        };
    };

    // Mapeamento para perguntas
    const mapRowToQuestion = (row: any) => {
        if (!row.pergunta) { return null };
        return {
            pergunta: row.pergunta || '',
            status_pergunta: row.status_pergunta?.toString().toLowerCase() === 'true',
            categoria_pergunta: row.categoria_pergunta || '',
        }
    };

    const handleUpload = async () => {
        if (!file) {
            Swal.fire('Erro', 'Por favor, selecione um arquivo primeiro.', 'error');
            return;
        }

        setUploading(true);

        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(sheet);

            try {
                if (uploadType === 'students') {
                    const students = rows.map(mapRowToStudent).filter((student): student is NonNullable<typeof student> => student !== null);
                    await axiosClient.post('/students/batch', students);
                    Swal.fire('Sucesso', 'Os estudantes foram cadastrados com sucesso!', 'success');
                } else if (uploadType === 'questions') {
                    const questions = rows.map(mapRowToQuestion).filter((question): question is NonNullable<typeof question> => question !== null);
                    await axiosClient.post('/questions/batch', questions);
                    Swal.fire('Sucesso', 'As perguntas foram cadastradas com sucesso!', 'success');
                }
            } catch (error) {
                console.error('Erro ao processar o upload:', error);
                Swal.fire('Erro', 'Houve um problema ao processar o upload.', 'error');
            } finally {
                setUploading(false);
            }
        };

        reader.readAsBinaryString(file);
    };

    // Logout do usuário
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id_aluno');
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
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
                    <span className="ml-3 text-xl font-bold text-gray-800">Administração</span>
                </div>
                <div className="flex space-x-4">
                    <button onClick={handleLogout} className="text-black font-bold">
                        Logout
                    </button>
                    <button onClick={() => router.push('/administrador/dashboard')} className="text-black font-bold">
                        Dashboard
                    </button>
                    <button onClick={() => router.push('/administrador/managementforms')} className="text-black font-bold">
                        Perguntas
                    </button>
                </div>
            </nav>

            {/* Conteúdo Principal */}
            <div className="flex-grow flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-lg lg:max-w-3xl bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
                        Upload de Arquivos
                    </h1>

                    {/* Botões de Tipo de Upload */}
                    <div className="mb-6 flex justify-around">
                        <button
                            className={`py-2 px-4 rounded-lg font-extrabold shadow-md ${uploadType === 'students' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => handleTypeChange('students')}
                        >
                            Upload de Estudantes
                        </button>
                        <button
                            className={`py-2 px-4 rounded-lg font-extrabold shadow-md ${uploadType === 'questions' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => handleTypeChange('questions')}
                        >
                            Upload de Perguntas
                        </button>
                    </div>

                    {/* Botão para Download do Arquivo Excel */}
                    <div className="mb-6">
                        <a
                            href={
                                uploadType === 'students'
                                    ? '/modelo_padrao_upload_de_usuarios.xlsx'
                                    : '/modelo_padrao_upload_de_perguntas.xlsx'
                            }
                            download
                            className="w-full py-3 rounded-lg bg-green-500 text-white font-extrabold shadow-md hover:bg-green-600 transition duration-200 ease-in-out flex items-center justify-center"
                        >
                            Baixar Modelo de Arquivo Excel
                        </a>
                    </div>

                    {/* Input para Upload de Arquivo */}
                    <div className="mb-6">
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleFileChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-200 text-black"
                        />
                    </div>

                    {/* Botão de Upload */}
                    <button
                        onClick={handleUpload}
                        className={`w-full py-3 rounded-lg text-white font-extrabold ${uploading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} shadow-md transition duration-200 ease-in-out`}
                        disabled={uploading}
                    >
                        {uploading ? 'Carregando...' : 'Fazer Upload'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadComponent;
