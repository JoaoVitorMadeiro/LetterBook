O LetterBook é uma plataforma web desenvolvida para catalogar livros e fomentar uma comunidade de leitores, inspirada no conceito do Letterboxd. Este relatório detalha o desenvolvimento do sistema utilizando uma arquitetura de microsserviços, com Java/Spring Boot no backend e Next.js no frontend. O projeto visa centralizar o registro de leituras, resenhas e interações sociais em um ambiente moderno e escalável. Os resultados demonstram uma implementação funcional de autenticação, catálogo e infraestrutura containerizada, validando a escolha tecnológica para resolver a dispersão de ferramentas de acompanhamento literário.
Palavras-chave: microsserviços; Java Spring Boot; Next.js; redes sociais; catálogo literário.

1 Introdução
O LetterBook surge como uma solução para entusiastas da leitura que buscam uma plataforma dedicada à organização de bibliotecas pessoais e à interação com outros leitores. Diferentemente de redes genéricas, o LetterBook foca exclusivamente na experiência literária, oferecendo ferramentas específicas para a catalogação e a crítica de obras.

1.1 Apresentação e oportunidade do tema
	A leitura é um hábito que se beneficia imensamente do compartilhamento social. Atualmente, muitos leitores utilizam planilhas dispersas ou redes sociais não especializadas para registrar seu progresso. Existe, portanto, uma oportunidade clara de mercado para uma aplicação que combine a robustez de um catálogo bibliográfico com a fluidez de uma rede social moderna, preenchendo a lacuna deixada pela falta de inovação em plataformas concorrentes mais antigas.
1.2 Objetivos principais
	O objetivo primário do projeto é desenvolver uma aplicação web robusta e escalável. Os objetivos específicos dividem-se em requisitos funcionais e não funcionais, a saber:
• Gestão de usuários: cadastro, autenticação segura via JWT e perfis personalizados.
 • Catálogo: sistema completo de CRUD para livros, autores, editoras e gêneros.
 • Interações: sistema de avaliações (estrelas), resenhas textuais e curtidas.
 • Arquitetura: implementação de microsserviços independentes, garantindo manutenibilidade e escalabilidade horizontal.
1.3 Contribuições inovadoras
	O projeto inova ao empregar uma stack tecnológica de ponta aplicada ao domínio literário. A utilização de Server Components do Next.js 15 para renderização otimizada com foco em SEO, aliada a uma arquitetura de microsserviços em Java 21, containerizada com Docker, diferencia o LetterBook de soluções monolíticas legadas, oferecendo melhor desempenho/performance e uma experiência de usuário (UX) refinada, com suporte a temas escuros e feedback visual instantâneo.
2 Revisão da tecnologia e ferramentas
A fundamentação tecnológica do projeto baseia-se em padrões da indústria para o desenvolvimento de software distribuído.

2.1 Temáticas teóricas e tecnologias
O ecossistema tecnológico escolhido prioriza a robustez do Java no backend e a flexibilidade do React no frontend, conforme descrito a seguir:
• Backend: Java 21 com Spring Boot 3.5.7. O uso do Spring Data JPA facilita a manipulação de dados complexos, enquanto o Spring Security garante a proteção dos endpoints.
• Frontend: Next.js 15 (App Router) e TypeScript. Essa combinação oferece tipagem estática para a redução de erros e renderização híbrida voltada ao desempenho.
• Banco de dados: PostgreSQL 16, escolhido por sua confiabilidade e suporte a relacionamentos complexos.

2.2 Metodologias de investigação e desenvolvimento
A metodologia adotada segue princípios ágeis, com entregas incrementais focadas em serviços. A infraestrutura utiliza Docker e Docker Compose para a orquestração dos serviços, garantindo que o ambiente de desenvolvimento seja replicável e consistente entre todos os membros da equipe. A separação do sistema em microsserviços (User, Catalog, Interaction Community e Gateway) permite o desenvolvimento e o deploy independentes de cada módulo.

3 Resultados e discussão
Até o presente momento, a equipe alcançou marcos significativos na implementação do sistema.

3.1 Resultados obtidos
Foi estabelecida uma arquitetura de microsserviços operacional, composta por cinco serviços principais executados em contêineres interconectados. O banco de dados PostgreSQL foi estruturado e populado. A API RESTful encontra-se funcional e devidamente documentada, permitindo operações completas de gestão do acervo. No frontend, a migração para TypeScript e a implementação da identidade visual baseada no design system “Letterboxd-inspired” (verde #00E054 e cinza #121212) encontram-se em estágio avançado.

3.1 Resultados obtidos
Foi estabelecida uma arquitetura de microsserviços operacional, composta por cinco serviços principais executados em contêineres interconectados. O banco de dados PostgreSQL foi estruturado e populado. A API RESTful encontra-se funcional e devidamente documentada, permitindo operações completas de gestão do acervo. No frontend, a migração para TypeScript e a implementação da identidade visual baseada no design system Letterboxd-inspired (verde #00E054 e cinza #121212) encontram-se em estágio avançado.

3.2 Discussão
A complexidade inicial da configuração da arquitetura de microsserviços foi mitigada pelo uso eficaz de scripts de automação e do Docker Compose. A decisão de separar o serviço de “Catálogo” do serviço de “Interação” mostrou-se acertada, permitindo escalar a leitura de dados dos livros de forma independente da escrita de resenhas. A adoção do TypeScript no frontend aumentou a segurança do código, prevenindo erros comuns de tipagem durante a integração com a API.
4 Conclusões
O projeto LetterBook demonstra uma base sólida de engenharia de software, tendo atingido os objetivos do MVP (Produto Mínimo Viável). A combinação de um backend robusto em Spring Boot com um frontend moderno em Next.js que resultou em uma plataforma performática/de alto desempenho. Os próximos passos envolvem a finalização das funcionalidades sociais avançadas e o refinamento da interface do usuário, consolidando a aplicação como uma ferramenta valiosa para a comunidade leitora.