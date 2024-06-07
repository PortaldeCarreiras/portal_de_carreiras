import mongoose, { Document, Schema } from "mongoose";

interface Identity {
  tipo: string;
  numero: number;
}

interface Endereco {
  uf: string;
  rua: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: number;
}

interface Contatos {
  ddd: number;
  telefone: number;
  email: string;
}

interface Notas {
  historia: number;
  quimica: number;
  ingles: number;
  matematica: number;
  fisica: number;
  geografia: number;
  biologia: number;
  multidisciplinar: number;
  raciocinio_logico: number;
  portugues: number;
  acertos: number;
  nota_prova: number;
  nota_redacao: number;
  nota_final: number;
  nota_final_acrescida: number;
}

interface ClassificacaoCurso {
  nome_curso: string;
  class: number;
  situacao: string;
}

interface Classificacao {
  curso_1: ClassificacaoCurso;
  curso_2: ClassificacaoCurso;
}

interface Documentos {
  tipo_identidade?: string;
  cpf: number;
  nome_mae?: string;
}

interface Student extends Document {
  nome: string;
  senha: string;
  identidade?: Identity;
  sexo?: string;
  nascimento?: string;
  estado_civil?: string;
  endereco?: Endereco;
  contatos?: {
    principal?: Contatos;
    secundario?: Contatos;
  };
  afrodescendente?: boolean;
  escolaridade?: boolean;
  necessidade?: string;
  notas?: Notas;
  classificacao?: Classificacao;
  documentos: Documentos;
}

const IdentitySchema: Schema = new Schema({
  tipo: { type: String, required: false },
  numero: { type: Number, required: false },
});

const EnderecoSchema: Schema = new Schema({
  uf: { type: String, required: false },
  rua: { type: String, required: false },
  numero: { type: Number, required: false },
  complemento: { type: String },
  bairro: { type: String, required: false },
  cep: { type: Number, required: false },
});

const ContatosSchema: Schema = new Schema({
  ddd: { type: Number, required: false },
  telefone: { type: Number, required: false },
  email: { type: String, required: false },
});

const NotasSchema: Schema = new Schema({
  historia: { type: Number },
  quimica: { type: Number },
  ingles: { type: Number },
  matematica: { type: Number },
  fisica: { type: Number },
  geografia: { type: Number },
  biologia: { type: Number },
  multidisciplinar: { type: Number },
  raciocinio_logico: { type: Number },
  portugues: { type: Number },
  acertos: { type: Number },
  nota_prova: { type: Number },
  nota_redacao: { type: Number },
  nota_final: { type: Number },
  nota_final_acrescida: { type: Number },
});

const ClassificacaoCursoSchema: Schema = new Schema({
  nome_curso: { type: String },
  class: { type: Number },
  situacao: { type: String },
});

const ClassificacaoSchema: Schema = new Schema({
  curso_1: { type: ClassificacaoCursoSchema },
  curso_2: { type: ClassificacaoCursoSchema },
});

const DocumentosSchema: Schema = new Schema({
  tipo_identidade: { type: String, required: false },
  cpf: { type: Number, required: true },
  nome_mae: { type: String, required: false },
});

const StudentSchema: Schema = new Schema({
  nome: { type: String, required: true },
  senha: { type: String, required: true },
  identidade: { type: IdentitySchema, required: false },
  sexo: { type: String, required: false },
  nascimento: { type: String, required: false },
  estado_civil: { type: String, required: false },
  endereco: { type: EnderecoSchema, required: false },
  contatos: {
    principal: { type: ContatosSchema, required: false },
    secundario: { type: ContatosSchema, required: false },
  },
  afrodescendente: { type: Boolean, required: false },
  escolaridade: { type: Boolean, required: false },
  necessidade: { type: String, required: false },
  notas: { type: NotasSchema, required: false },
  classificacao: { type: ClassificacaoSchema, required: false },
  documentos: { type: DocumentosSchema, required: true },
});

const StudentModel = mongoose.model<Student>("Student", StudentSchema);

export default StudentModel;
export type { Student };
