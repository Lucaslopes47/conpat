# Projeto de Gerenciamento de Patrimônios

## Visão Geral

Este projeto é uma aplicação Node.js que utiliza o Express para fornecer um servidor web e MySQL para gerenciamento de um banco de dados de patrimônios. Ele inclui autenticação básica, rotas para login, cadastro e consulta de patrimônios.

## Funcionalidades

- [x] Login com autenticação básica
- [x] Cadastro de novos patrimônios
- [x] Consulta de patrimônios cadastrados
- [x] Inicialização do banco de dados, verificando a existência da tabela `patrimonios` e criando-a se necessário

## Tecnologias Utilizadas

* Node.js
* Express
* MySQL
* Jest para testes
* Supertest para testes de rotas
* Body-parser para parsing de requisições
* Cors para permitir requisições de outras origens

## Dependências

### Dependências Principais

* express
* mysql2
* body-parser
* cors
* path

### Dependências de Desenvolvimento

* jest
* supertest

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

* Node.js (versão 12 ou superior)
* MySQL (versão 5.7 ou superior)

