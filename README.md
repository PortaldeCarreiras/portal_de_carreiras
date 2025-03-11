# Portal de Carreiras
 

## Instruções para rodar o backend

Backend desenvolvido com Node (v18.17.1) e Typescript utilizando o e o Mongoose para conexão com banco de dados.

1. Clone o repositório:
    ```bash
    git clone https://github.com/PortaldeCarreiras/portal_de_carreiras.git
    ```

2. Entre no diretório do projeto e do backend:
    ```bash
    cd portal_de_carreiras/backend
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Crie uma cópia do arquivo `.env.example` chamado `.env`:
    ```bash
    cp .env.example .env
    ```

5. Abra o arquivo `.env` e insira as URLs do servidor. Por exemplo:
    ```plaintext
    # SERVER
    PORT=

    # TOKEN
    EXPIRES_IN=
    SALT_ROUNDS=
    SECRET=

    # DATABASE

    DATABASE_URL=
    ```

6. Inicie o servidor:
    ```bash
    npm start
    ```