# Portal de Carreiras
 

## Rotas

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

### 2. Criar aluno
- **URL**: `/student`
- **Método**: `POST`
- **Autenticação**: `Authorization: Bearer <token>` 
- **Body**: 
* apenas nome e documento são obrigatórios
```json
{
    "nome": "string",
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
        "ddd_2": "number",
        "telefone_2": "number",
        "email_2": "string"
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
        "nome_curso_1": "string",
        "class": "number",
        "situacao": "string"
      },
      "curso_2": {
        "nome_curso_2": "string",
        "class_2": "number",
        "situacao_2": "string"
      }
    },
    "documentos": {
      "tipo_identidade": "string",
      "cpf": "number",
      "nome_mae": "string"
    }
}
```

### 3. Editar aluno
- **URL**: `/student/:id`
- **Método**: `PUST`
- **Autenticação**: `Authorization: Bearer <token>` 
- **Body**:
Mesmos campos do método de criar, porém com o seguinte funcionamento:

Caso envie um campo, que faça parte do schema, que não esteja salvo no aluno, ele irá salvar com o valor passado. 
Caso o campo enviado já esteja salvo no aluno, o valor será atualizado.


### 4. Deletar aluno
- **URL**: `/student/:id`
- **Método**: `DELETE`
- **Autenticação**: `Authorization: Bearer <token>` 

### 4. Buscar aluno
- **URL**: `/student/:id`
- **Método**: `GET`
- **Autenticação**: `Authorization: Bearer <token>` 

### 4. Buscar todos alunos
- **URL**: `/student`
- **Método**: `GET`
- **Autenticação**: `Authorization: Bearer <token>` 