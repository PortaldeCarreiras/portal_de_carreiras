// UploadComponent.tsx
'use client';

import { useState } from 'react';
import axios from '../services/axiosClient';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

const UploadComponent = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

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
    ;

    // Json do estudante
    const mapRowToStudent = (row: any) => {
        return {
            nome: row.NOME || '',
            identidade: {
                tipo: row.IDENTIDADE_TIPO || 'cpf',
                numero: row.IDENTIDADE || '',
            },
            sexo: row.SEXO || '',
            estado_civil: row.ESTADO_CIV || '',
            endereco: {
                uf: row.UF || '',
                rua: row.ENDERECO || '',
                numero: row.NUMERO || '',
                complemento: row.COMPLEMENTO || '',
                bairro: row.BAIRRO || '',
                cep: row.CEP || '00000000',
            },
            contatos: {
                principal: {
                    ddd: row.DDD || '',
                    telefone: row.TELEFONE || '',
                    email: row.EMAIL || '',
                },
                secundario: {
                    ddd: row.DDD_2 || '',
                    telefone: row.TELEFONE_2 || '',
                    email: row.EMAIL_2 || '',
                },
            },
            afrodescendente: convertStringToBoolean(row.AFRODESCENDENTE),
            escolaridade: convertStringToBoolean(row.ESCOLARIDADE),
            necessidade: row.NECESSIDADE || '',
            notas: {
                historia: row.HISTÓRIA || 0,
                quimica: row.QUÍMICA || 0,
                ingles: row.INGLÊS || 0,
                matematica: row.MATEMÁTICA || 0,
                fisica: row.FÍSICA || 0,
                geografia: row.GEOGRAFIA || 0,
                biologia: row.BIOLOGIA || 0,
                multidisciplinar: row.MULTIDISCIPLINAR || 0,
                raciocinio_logico: row.RACIOCÍNIO_LÓGICO || 0,
                portugues: row.PORTUGUÊS || 0,
                acertos: row.ACERTOS || 0,
                nota_prova: row.NOTAPROVA || 0,
                nota_redacao: row.NOTARED || 0,
                nota_final: row.NOTAFINAL || 0,
                nota_final_acrescida: row.NFACRES2 || 0,
            },
            classificacao: {
                curso_1: {
                    nome_curso: row.CURSO_1 || '',
                    class: row.CLASS || 0,
                    situacao: row.SITUACAO || '',
                },
                curso_2: {
                    nome_curso: row.CURSO_NOME2 || '',
                    class: row.CLASS2 || 0,
                    situacao: row.SITUACAO2 || '',
                },
            },
            documentos: {
                tipo_identidade: row.TIPO_IDENTIDADE || 'cpf',
                cpf: row.CPF || '',
                nome_mae: row.NOME_MAE || '',
            },
        };
    };


    // const handleUpload = async () => {
    //     if (!file) {
    //         Swal.fire('Por favor, selecione um arquivo primeiro.');
    //         return;
    //     }

    //     setUploading(true);

    //     const reader = new FileReader();
    //     reader.onload = async (e) => {
    //         const data = e.target?.result;
    //         const workbook = XLSX.read(data, { type: 'binary' });
    //         const sheetName = workbook.SheetNames[0];
    //         const sheet = workbook.Sheets[sheetName];
    //         const rows = XLSX.utils.sheet_to_json(sheet);

    //         try {
    //             for (const row of rows) {
    //                 const student = mapRowToStudent(row);
    //                 const response = await axios.post('/student', student);
    //                 console.log('Usuário criado:', response.data);
    //             }
    //             Swal.fire('Todos os usuários foram criados com sucesso!');
    //         } catch (error) {
    //             console.error('Erro ao criar usuário:', error);
    //             Swal.fire('Erro ao criar usuário. Verifique o console para mais detalhes.');
    //         } finally {
    //             setUploading(false);
    //         }
    //     };
    //     reader.readAsBinaryString(file);
    // };

    const handleUpload = async () => {
        if (!file) {
            Swal.fire('Por favor, selecione um arquivo primeiro.');
            return;
        }

        setUploading(true);

        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = e.target?.result;
            let rows;

            // Detect the file extension
            const fileExtension = file.name.split('.').pop()?.toLowerCase();

            if (fileExtension === 'csv') {
                const workbook = XLSX.read(data, { type: 'binary', codepage: 65001 });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                rows = XLSX.utils.sheet_to_json(sheet, { raw: false });
            } else {
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                rows = XLSX.utils.sheet_to_json(sheet, { raw: false });
            }

            try {
                for (const row of rows) {
                    const student = mapRowToStudent(row);
                    const response = await axios.post('/student', student);
                    console.log('Usuário criado:', response.data);
                }
                Swal.fire('Todos os usuários foram criados com sucesso!');
            } catch (error) {
                console.error('Erro ao criar usuário:', error);
                Swal.fire('Erro ao criar usuário. Verifique o console para mais detalhes.');
            } finally {
                setUploading(false);
            }
        };
        reader.readAsBinaryString(file);
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">Upload de Usuários</h1>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="mb-4 p-2 border rounded"
            />
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white p-2 rounded"
                disabled={uploading}
            >
                {uploading ? 'Carregando...' : 'Upload'}
            </button>
        </div>
    );
};

export default UploadComponent;
