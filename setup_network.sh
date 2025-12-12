# Script de configuração de rede para o LetterBook
# Adiciona o alias 'letterbook' ao arquivo hosts para desenvolvimento local

if grep -q "letterbook" /etc/hosts; then
    echo "O alias 'letterbook' já existe no arquivo /etc/hosts."
else
    echo "Adicionando 'letterbook' ao /etc/hosts (necessário sudo)..."
    echo "127.0.0.1 letterbook" | sudo tee -a /etc/hosts
    echo "Alias adicionado com sucesso!"
fi
