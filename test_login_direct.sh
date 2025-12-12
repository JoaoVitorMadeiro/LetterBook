#!/bin/bash
curl -v -X POST http://localhost:8085/api/v1/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "sarab.costa@gmail.com", "senha": "password"}'
