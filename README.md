# README - Sistema de Gerenciamento Hospitalar

Este é um sistema de gerenciamento hospitalar desenvolvido como projeto para a disciplina de Processamento de Banco de Dados (PBD). O sistema foi construído utilizando as seguintes tecnologias:

- Express.js: um framework web para Node.js que facilita a criação de aplicativos web e APIs.
- Node.js: um ambiente de execução JavaScript do lado do servidor.
- JavaScript: uma linguagem de programação de alto nível comumente usada para criar aplicativos web interativos.
- MySQL: um sistema de gerenciamento de banco de dados relacional usado para armazenar e gerenciar os dados do sistema.

## Estrutura do Projeto

O projeto segue uma estrutura de diretórios padrão para uma aplicação Node.js/Express:

```
hospital-management-system/
│
├── models/
│   ├── db_controller.js
│   └── (outros arquivos de modelo)
│
├── public/
│   ├── css/
│   ├── js/
│   └── (outros arquivos estáticos)
│
├── routes/
│   ├── index.js
│   ├── receipt.js
│   └── (outros arquivos de rota)
│
├── views/
│   ├── add_receipt.ejs
│   ├── edit_receipt.ejs
│   ├── delete_receipt.ejs
│   └── (outros arquivos de visualização)
│
├── app.js
├── package.json
└── README.md
```

- **models/**: Contém arquivos que definem os modelos de dados e controladores para interagir com o banco de dados.
- **public/**: Contém arquivos estáticos, como CSS, JavaScript e imagens.
- **routes/**: Contém arquivos que definem as rotas da aplicação.
- **views/**: Contém os arquivos de visualização da aplicação, escritos no formato EJS (Embedded JavaScript).
- **app.js**: Arquivo principal que inicializa o servidor Express e configura as rotas e middleware da aplicação.
- **package.json**: Arquivo de manifesto do projeto Node.js que lista as dependências do projeto e outros metadados.

## Instalação e Execução

Para rodar a aplicação, siga estas etapas:

1. Certifique-se de ter o Node.js e o npm (gerenciador de pacotes do Node.js) instalados em sua máquina.
2. Clone este repositório para sua máquina local.
3. Abra um terminal na raiz do projeto.
4. Execute `npm install` para instalar todas as dependências listadas no arquivo `package.json`.
5. Certifique-se de ter um servidor MySQL em execução em sua máquina local e atualize as configurações de conexão com o banco de dados no arquivo `db_controller.js`.
6. Execute o comando `node app.js` para iniciar o servidor.
7. Abra um navegador da web e navegue para `http://localhost:3000` para acessar a aplicação.

## Funcionalidades

Este sistema de gerenciamento hospitalar permite:

- Adicionar, editar e excluir receitas médicas.
- Pesquisar receitas por vários critérios, como ID da consulta ou descrição.
- Visualizar todas as receitas médicas armazenadas no banco de dados.

Para qualquer dúvida ou problema, entre em contato comigo

---
