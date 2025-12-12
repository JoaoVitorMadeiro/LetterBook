#!/bin/bash
mkdir -p logs

echo "Iniciando serviços de backend..."

# User Service
echo "Iniciando User Service..."
nohup ./backend/mvnw -f backend/User/pom.xml spring-boot:run > logs/user.log 2>&1 &
USER_PID=$!
echo "User Service PID: $USER_PID"

# Catalogo Service
echo "Iniciando Catalogo Service..."
nohup ./backend/mvnw -f backend/catalogo/pom.xml spring-boot:run > logs/catalogo.log 2>&1 &
CAT_PID=$!
echo "Catalogo Service PID: $CAT_PID"

# Interaction Service
echo "Iniciando Interaction Service..."
nohup ./backend/mvnw -f backend/Interaction/pom.xml spring-boot:run > logs/interaction.log 2>&1 &
INT_PID=$!
echo "Interaction Service PID: $INT_PID"

# Community Service
echo "Iniciando Community Service..."
nohup ./backend/mvnw -f backend/Community/pom.xml spring-boot:run > logs/community.log 2>&1 &
COM_PID=$!
echo "Community Service PID: $COM_PID"

# Gateway Service
echo "Iniciando Gateway Service..."
nohup ./backend/mvnw -f backend/Gateway/pom.xml spring-boot:run > logs/gateway.log 2>&1 &
GATE_PID=$!
echo "Gateway Service PID: $GATE_PID"

echo "Todos os serviços foram iniciados em background."
echo "Acompanhe os logs com: tail -f logs/*.log"
