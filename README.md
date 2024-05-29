# Projeto de Gerenciamento de Patrimônios (CONPAT)

## Visão Geral

O projeto CONPAT é uma aplicação web desenvolvida em Node.js utilizando o framework Express, juntamente com um banco de dados MySQL, para gerenciar o patrimônio de uma organização. Ele inclui funcionalidades como login com autenticação básica, cadastro de novos patrimônios, consulta de patrimônios cadastrados, e consultas com filtragem por data.

## Funcionalidades

- [x] Login com autenticação básica
- [x] Cadastro de novos patrimônios
- [x] Consulta de patrimônios cadastrados
- [x] Consulta de patrimônios cadastrados com filtragem por data
- [x] Inicialização do banco de dados, verificando a existência da tabela `patrimonios` e criando-a se necessário
- [x] Baixar planilha por data selecionada contendo os dados somente da data seleciona ou planilha completa, contendo todos os dados que 


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
* MySQL (versão 8.0 ou superior)

### Uso

* Para fazer login, utilize as credenciais padrão (usuário: admin, senha: admin123).
* Para cadastrar um novo patrimônio, pasta preencher os dados obrigadotorios e clicar no botão cadastrar.
* Para consultar os patrimônios cadastrados, acesse a rota /api/patrimonios com um método GET. Também é possível filtrar os resultados por data adicionando parâmetros dataInicio e dataFim na requisição.

### Considerações Finais

* O projeto CONPAT está em versão beta e pode ser adaptado para uso em diferentes prefeituras ou secretarias. As configurações do banco de dados e autenticação podem ser ajustadas conforme as necessidades específicas de cada organização.
