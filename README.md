<!-- header -->
<h1 align="center">Trybe Futebol Clube</h1>
<p align="center">Um site informativo sobre partidas e classificações de futebol</p>

<ul align="center">
<a href="https://gialencar-tfc-client-c474c268f911.herokuapp.com/">:link: Live Site</a> • 
<a href="https://gialencar-tfc-api-6faa779c10ac.herokuapp.com/">:link: API</a> • 
<a href="https://documenter.getpostman.com/view/20130984/2s84Dmyk4z">:link: API Docs</a>
</ul>


<h2 align="center">
    <img alt="Website up badge" src="https://img.shields.io/website?url=https%3A%2F%2Fgialencar-tfc-client-c474c268f911.herokuapp.com%2F&style=for-the-badge&logo=heroku">
    <img alt="API up badge" src="https://img.shields.io/website?url=https%3A%2F%2Fgialencar-tfc-api-6faa779c10ac.herokuapp.com%2F&style=for-the-badge&logo=heroku&label=API">
    <p>
        <img src="https://img.shields.io/badge/node-%5E16.15.0-brightgreen" />
        <img src="https://img.shields.io/badge/react-17.0.2-blue" />
    </p>
</h2>


# Tabela de conteúdos

<!--ts-->
- [Sobre](#sobre)
- [Objetivo](#objetivo)
- [Tecnologias](#tecnologias)
- [Rodando localmente](#rodando-a-aplicação-localmente)
  - [Pré-Requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Executando](#executando)
<!--te-->

# Sobre

TFC foi um projeto desenvolvido durante o curso da [Trybe](betrybe.com). Um site
informativo, onde é possível criar, editar e finalizar partidas, acompanhar a classificação e também estatísticas sobre o desempenho dos times, filtrando os
resultados por classificação geral, como mandante, e como visitante.

## Objetivo

O objetivo do projeto foi construir o back-end, uma API RESTful, para ser consumida pelo front-end desenvolvido em React.js, que foi fornecido pronto pela [Trybe](betrybe.com).

## Tecnologias

### As seguintes ferramentas foram usadas na construção do projeto:

- Node.js
- Typescript
- Express
- MySQL
- Sequelize
- JWT
- Mocha, Chai & Sinon
- Docker
- Docker Compose

Essa API foi construída em Node.js utilizando o framework Express. O ORM (Object Relational Mapper) Sequelize foi utilizado para trabalhar com o banco de dados MySQL.
<br>
A autenticação no login ficou por conta do JWT (JSON Web Token), e as senhas são
criptografadas usando bcrypt, salvando então apenas o hash no banco de dados. O código foi desenvolvido utilizando desenvolvimento orientado a testes (TDD), e foi conteinerizada com docker e docker-compose.

## Rodando a aplicação localmente

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Docker](https://docs.docker.com/engine/install/), [Docker-compose](https://docs.docker.com/compose/install/)

### Instalação

```bash
# Clone este repositório
$ git clone git@github.com:gialencar/TFC-Trybe-Futebol-Club.git

# Acesse a pasta do projeto no terminal/cmd
$ cd TFC-Trybe-Futebol-Club
```

### Executando

```bash
# Navegue para a pasta app
$ cd app

# Execute o docker-compose
$ docker-compose up -d

# O app inciará na porta:3000 - acesse <http://localhost:3000>
```
