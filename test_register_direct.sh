#!/bin/bash
EMAIL="test.direct.$(date +%s)@example.com"
USERNAME="user$(date +%s)"
echo "Registering: $EMAIL / $USERNAME"

curl -v -X POST http://localhost:8085/api/v1/auth/register \
-H "Content-Type: application/json" \
-d "{
  \"nome\": \"Direct Test User\",
  \"email\": \"$EMAIL\",
  \"senha\": \"password123\",
  \"username\": \"$USERNAME\" 
}"
