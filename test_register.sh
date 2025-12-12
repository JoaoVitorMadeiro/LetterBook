#!/bin/bash
curl -v -X POST http://localhost:8080/api/v1/auth/register \
-H "Content-Type: application/json" \
-d '{
  "nome": "Sara Costa",
  "email": "sarab.costa@gmail.com",
  "senha": "password",
  "username": "sarabcosta"
}'
