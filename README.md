BiblioConecta – Projeto N708 (MVP Funcional)

Este é o MVP minimalista e funcional do BiblioConecta, desenvolvido para a disciplina N708 – Projeto Aplicado Multiplataforma Etapa 2.

O sistema segue os requisitos mínimos:

Frontend implementado em Next.js (App Router + Tailwind)

Backend via Next API Routes

Persistência simples usando arquivos JSON (MVP), com documentação do schema SQL para migração futura

Login, cadastro, visualização de livros, reserva e favoritos

Integração de todos os componentes funcionais

🚀 Como executar o projeto
1. Instalar dependências
npm install

2. Rodar o servidor de desenvolvimento
npm run dev

3. Acessar o sistema

Abra no navegador:
http://localhost:3000

🔑 Credenciais de teste

Você pode usar:

Email: vitoria@example.com

Senha: senha123

Ou criar uma conta na página /register.

📂 Sobre a implementação

O backend é feito com API Routes (Next.js).

A autenticação usa session-token:

salvo localmente em localStorage

validado pelo backend via sessions.json

enviado pelo cabeçalho x-session-token

Os dados são salvos em data/*.json (usuários, reservas, livros, favoritos).
Isso atende o MVP; na documentação do projeto está incluído também o schema SQL para futuras migrações (MySQL/PostgreSQL).

📌 Notas importantes (para o professor/avaliador)

O projeto foi desenvolvido visando entregar um MVP funcional dentro da realidade do escopo individual.

Estrutura de API, persistência, rotas privadas, validações e tela de cadastro/login estão implementadas.

Telas principais (Login, Cadastro, Home, Modal de Livro, Reserva, Favoritos) estão integradas.

Documentação técnica (README, schema SQL e organização do repositório) foram entregues conforme solicitado.