export default function AlunosPage() {
    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white border rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Cadastro de Aluno</h1>

            <form>
                <div className="mb-4">
                    <label className="block text-sm font-extrabold text-gray-600">
                        Nome:
                        <input
                            className="w-full p-2 border rounded-md mt-1"
                            type="text"
                            placeholder="Informe seu nome"
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-extrabold text-gray-600">
                        E-mail:
                        <input
                            className="w-full p-2 border rounded-md mt-1"
                            type="email"
                            placeholder="Informe seu e-mail"
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-extrabold text-gray-600">
                        Curso:
                        <input
                            className="w-full p-2 border rounded-md mt-1"
                            type="text"
                            placeholder="Informe seu curso"
                        />
                    </label>
                </div>

                <button
                    className="bg-blue-500 text-white font-extrabold p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-900"
                    type="submit"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
