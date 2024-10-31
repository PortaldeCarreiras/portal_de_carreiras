# Portal de Carreiras

## Rotas

## Rotas - Autenticação

### 1. Autenticação

- **URL**: `/auth/login`
- **Método**: `POST`
- **Body**:
```json
{
    "cpf": "string",
    "password": "string"
}
```

## Rotas - Estudantes

### 1. Criar aluno
- **URL**: `/student`
- **Método**: `POST`
- **Autenticação**: `Authorization: Bearer <token>` 
- **Body**: 
* Apenas os campos de nome e documento são obrigatórios.
```json
{
  "nome": "string",
  "senha": "string",
  "role": "string",
  "identidade": {
    "tipo": "string",
    "numero": "number"
  },
  "sexo": "string",
  "nascimento": "string",
  "estado_civil": "string",
  "endereco": {
    "uf": "string",
    "rua": "string",
    "numero": "number",
    "complemento": "string",
    "bairro": "string",
    "cep": "number"
  },
  "contatos": {
    "principal": {
      "ddd": "number",
      "telefone": "number",
      "email": "string"
    },
    "secundario": {
      "ddd": "number",
      "telefone": "number",
      "email": "string"
    }
  },
  "afrodescendente": "boolean",
  "escolaridade": "boolean",
  "necessidade": "string",
  "notas": {
    "historia": "number",
    "quimica": "number",
    "ingles": "number",
    "matematica": "number",
    "fisica": "number",
    "geografia": "number",
    "biologia": "number",
    "multidisciplinar": "number",
    "raciocinio_logico": "number",
    "portugues": "number",
    "acertos": "number",
    "nota_prova": "number",
    "nota_redacao": "number",
    "nota_final": "number",
    "nota_final_acrescida": "number"
  },
  "classificacao": {
    "curso_1": {
      "nome_curso": "string",
      "class": "number",
      "situacao": "string"
    },
    "curso_2": {
      "nome_curso": "string",
      "class": "number",
      "situacao": "string"
    }
  },
  "documentos": {
    "tipo_identidade": "string",
    "cpf": "number",
    "nome_mae": "string"
  }
}

```

### 2. Editar aluno
- **URL**: `/student/:id`
- **Método**: `PUT`
- **Autenticação**: `Authorization: Bearer <token>` 
- **Body**:
Mesmos campos do método de criar, porém com o seguinte funcionamento:

Caso envie um campo, que faça parte do schema, que não esteja salvo no aluno, ele irá salvar com o valor passado. 
Caso o campo enviado já esteja salvo no aluno, o valor será atualizado.


### 3. Deletar aluno
- **URL**: `/student/:id`
- **Método**: `DELETE`
- **Autenticação**: `Authorization: Bearer <token>`
* A exclusão funciona por meio do ID do estudante que é gerado no Banco de Dados, esse ID é passado como parâmetro para o back-end na hora da remoção.

### 4. Buscar aluno
- **URL**: `/student/:id`
- **Método**: `GET`
- **Autenticação**: `Authorization: Bearer <token>` 
* A Busca funciona também pelo ID do estudante do Banco de Dados, esse ID é passado como parâmetro para o back-end na hora de uma busca específica.

### 5. Buscar todos alunos
- **URL**: `/student`
- **Método**: `GET`
- **Autenticação**: `Authorization: Bearer <token>` 
* A busca geral apenas faz uma consulta no Banco de Dados retornando todos os estudantes encontrados.


## Rotas - Perguntas


### 1. Criar pergunta
- **URL**: `/question`
- **Método**: `POST`
- **Autenticação**: `Authorization: Bearer <token>` 
- **Body**: 
* A pergunta, o status e a categoria são obrigatórios.
```json
{
    "pergunta": "string",
    "status_pergunta": "boolean",
    "categoria_pergunta": "string"
}
```

### 2. Editar pergunta
- **URL**: `/question/:id`
- **Método**: `PUT`
- **Autenticação**: `Authorization: Bearer <token>` 
- **Body**:
Possui os mesmos campos de criação, mas com um funcionamento diferente.

Caso seja enviado um campo que ja faça parte do questionSchema e que não esteja salvo. ele irá salvar o valor anterior.
Caso o campo enviado já esteja salvo, o valor será atualizado.


### 3. Deletar pergunta
- **URL**: `"/question/:id`
- **Método**: `DELETE`
- **Autenticação**: `Authorization: Bearer <token>`
* A exclusão funciona por meio do ID da pergunta que é gerado no Banco de Dados, esse ID é passado como parâmetro na hora da remoção.

### 4. Buscar pergunta
- **URL**: `/question/:id`
- **Método**: `GET`
- **Autenticação**: `Authorization: Bearer <token>` 
* A Busca funciona também pelo ID da pergunta do Banco de Dados, esse ID é passado como parâmetro para o back-end na hora de uma busca específica.

### 5. Buscar todas perguntas
- **URL**: `/question`
- **Método**: `GET`
- **Autenticação**: `Authorization: Bearer <token>` 
* A busca geral apenas faz uma consulta no Banco de Dados retornando todos as perguntas encontradas.

### 6. Buscar perguntas ativas
- **URL**: `/question/active`
- **Método**: `GET`
- **Autenticação**: `Authorization: Bearer <token>` 
* Esse método vai realizar uma consulta no Banco de Dados e retornar apenas as perguntas ativas, para isso o campo "status_pergunta" tem que estar "true", as perguntas com o status = false não serão retornadas.
```json
{
    "status_pergunta": true
}
```

## Rotas - Respostas

### 1. Criar resposta
- **URL**: `/question`
- **Método**: `POST`
- **Autenticação**: `Authorization: Bearer <token>` 
- **Body**: 
* Todos os campos são obrigatórios.
```json
{
  "id_aluno": "string",
  "id_pergunta": "string",
  "resposta": "string",
  "version": "string",
  "data_resposta": "string"
}

```

### 2. Buscar resposta
- **URL**: `/answer/:id`
- **Método**: `GET`
- **Autenticação**: `Authorization: Bearer <token>` 
* A Busca funciona também pelo ID da resposta do Banco de Dados, esse ID é passado como parâmetro para o back-end na hora de uma busca específica.

### 3. Buscar todas respostas
- **URL**: `/answer`
- **Método**: `GET`
- **Autenticação**: `Authorization: Bearer <token>` 
* A busca geral apenas faz uma consulta no Banco de Dados retornando todos as respostas encontradas.

### 4. Buscar a resposta mais recente
- **URL**: `/answer/latest`
- **Método**: `GET`
- **Autenticação**: `Authorization: Bearer <token>` 
* A busca das respostas mais recentes é feito com base na ordenação por versão e data das respostas, depois realiza um agrupamento dessas respostas para extrair a mais recente.

```javascript

{
  $sort: { version: -1, data_resposta: -1 } // Ordena pela versão e data mais recente
},

{
  $group: {
    _id: {
      id_aluno: "$id_aluno",
      id_pergunta: "$id_pergunta" // Agrupa por aluno e pergunta
    },
    
    latestAnswer: { $first: "$$ROOT" } // Pega a resposta mais recente para cada pergunta
  }
}

```

### 5. Buscar a resposta mais recente com base em uma data específica.
- **URL**: `/answer/latest-before-date`
- **Método**: `GET`
- **Autenticação**: `Authorization: Bearer <token>` 
* A busca das respostas mais recente com base em uma data é feita com base em uma data fornecida, ou seja, só serão recuperadas as respostas com datas menor ou igual a especificada.

```javascript
{
  $match: { data_resposta: { $lte: date } } // Filtra as respostas com data menor ou igual à fornecida
},

{
  $sort: { version: -1, data_resposta: -1 } // Ordena pela versão e data mais recente
}
```