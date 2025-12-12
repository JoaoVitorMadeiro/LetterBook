#!/bin/bash
curl -v -X POST http://localhost:8080/api/v1/auth/register \
-H "Content-Type: application/json" \
-d '{
  "nome": "Teste User",
  "email": "teste.novo@gmail.com",
  "senha": "password123",
  "username": "testenovo"
}'
