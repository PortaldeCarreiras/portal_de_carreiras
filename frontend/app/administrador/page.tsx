'use client';

export default function AdministradorPage() {
    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white border rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Gerenciar Perguntas</h1>

            {/* Formulário de Adição/Modificação de Perguntas */}
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-extrabold text-gray-600">
                        Pergunta:
                        <textarea
                            className="w-full p-2 border rounded-md mt-1"
                            placeholder="Digite sua pergunta aqui"
                            rows={3}
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-extrabold text-gray-600">
                        Opções (separadas por vírgula):
                        <input
                            className="w-full p-2 border rounded-md mt-1"
                            type="text"
                            placeholder="Opção A, Opção B, Opção C"
                        />
                    </label>
                </div>

                <button
                    className="bg-green-500 text-white font-extrabold p-2 rounded-md hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-900"
                    type="submit"
                >
                    Salvar Pergunta
                </button>
            </form>
        </div>
    );
}
