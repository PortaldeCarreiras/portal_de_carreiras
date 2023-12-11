// pages/index.tsx
import Navbar from "../components/navbar";
import LoginComponent from "../components/login";

const FormulariosPage: React.FC = () => {
    return (
        <div>
            <h1>Formulários</h1>
            <Navbar />
            {/* ... Outros componentes ou conteúdo ... */}
            <LoginComponent />
        </div>
    );
};

export default FormulariosPage;
