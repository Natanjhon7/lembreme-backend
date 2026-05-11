Manual de Uso = LembreMe

Url base = https://lembreme-backend.onrender.com/api

Autenticação

Todas as rotas de **medicamentos** exigem um token JWT válido no cabeçalho:
Authorization: Bearer SEU_TOKEN


Endpoints de Autenticação

Cadastrar
POST  /auth/register           Exemplo da requisição:json

{
  "nome": "Teste teste",
  "email": "testeteste@email.com",
  "senha": "123456"
}

Login
POST   /auth/login

{
  "email": "testeteste@email.com",
  "senha": "123456"
}

Endpoints de Medicamentos

GET	 /medicamentos

Criar novo medicamento

POST	/medicamentos

{
  "nome": "Paracetamol",
  "dosagem": "500mg",
  "horario": "14:00",
  "frequencia": "diario"
}

Atualizar medicamento

PUT	/medicamentos/:id

{
  "nome": "Paracetamol 750mg",
  "dosagem": "750mg",
  "horario": "15:00",
  "frequencia": "diario"
}

Marcar medicamento como tomado

PATCH	/medicamentos/:id/tomar

Excluir medicamento

DELETE	/medicamentos/:id
