# Projeto de Gerenciamento de Patrimônios (CONPAT)

## Visão Geral

O projeto CONPAT é uma aplicação web desenvolvida em Node.js utilizando o framework Express, juntamente com um banco de dados MySQL, para gerenciar o patrimônio de uma organização. Ele inclui funcionalidades como login com autenticação básica, cadastro de novos patrimônios, consulta de patrimônios cadastrados, e consultas com filtragem por data.

## Funcionalidades

- [x] Login com autenticação básica
- [x] Cadastro de novos patrimônios
- [x] Listagem de patrimônios cadastrados
- [x] Consulta de patrimônios cadastrados com filtragem por data
- [x] Geração e download de planilhas Excel com todos os patrimônios ou apenas os filtrados por data


## Tecnologias Utilizadas

* Backend: Node.js, Express
* Banco de Dados: MySQL
* Frontend: HTML, CSS, JavaScript, Bootstrap
* Bibliotecas: xlsx.js (para geração de planilhas Excel)

## Dependências

### Dependências Principais

* express: Framework para Node.js que facilita a criação de aplicações web e APIs.
Instalação: npm install express

* mysql2: Cliente MySQL para Node.js com suporte a Promises, utilizado para conectar e interagir com o banco de dados MySQL.
Instalação: npm install mysql2

* body-parser: Middleware para analisar corpos de requisição em formato JSON, facilitando o acesso aos dados enviados pelo cliente.
Instalação: npm install body-parser

* cors: Middleware para habilitar CORS (Cross-Origin Resource Sharing), permitindo que a API seja acessada de diferentes domínios.
Instalação: npm install cors

* path: Módulo nativo do Node.js utilizado para trabalhar com diretórios e caminhos de arquivos

### Dependências de Desenvolvimento

* Bootstrap 4.5.2
* xlsx.js 0.16.9:
  
## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

* Node.js (versão 12 ou superior)
* MySQL (versão 8.0 ou superior)

### Uso

* Para fazer login, utilize as credenciais padrão (usuário: admin, senha: admin123).
* Para cadastrar um novo patrimônio, pasta preencher os dados obrigadotorios e clicar no botão cadastrar.
* Para consultar os patrimônios cadastrados, acesse a rota /api/patrimonios com um método GET. Também é possível filtrar os resultados por data adicionando parâmetros dataInicio e dataFim na requisição.

### Considerações Finais

* O projeto CONPAT está em versão beta e pode ser adaptado para uso em diferentes prefeituras ou secretarias. As configurações do banco de dados e autenticação podem ser ajustadas conforme as necessidades específicas de cada organização.
