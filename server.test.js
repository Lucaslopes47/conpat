const request = require('supertest');
const { initializeDatabase, clearPatrimoniosTable } = require('./server'); // Ajuste o caminho conforme necessário
const app = require('./server'); // Ajuste o caminho conforme necessário

describe('Testes de Rota', () => {
  beforeAll(async () => {
    // Chama a função de inicialização do banco de dados
    await initializeDatabase();
  });

  it('Deve responder com status 200 na rota /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  beforeAll(async () => {
    // Limpa a tabela de patrimônios antes de iniciar os testes
    await clearPatrimoniosTable();
  });

  it('Deve retornar uma lista vazia de patrimônios quando não houver dados cadastrados', async () => {
    // Faz uma requisição para obter os patrimônios
    const response = await request(app).get('/api/patrimonios');

    // Verifica se a resposta tem status 200
    expect(response.status).toBe(200);

    // Verifica se o corpo da resposta é uma array vazia
    expect(response.body).toEqual([]);
  });

  it('Deve redirecionar para /index.html ao fazer login com credenciais corretas', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'admin123' });
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/index.html');
  });

  it('Deve responder com status 401 ao fazer login com credenciais incorretas', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrongpassword' });
    expect(response.status).toBe(401);
  });

  it('Deve criar a tabela patrimonios com sucesso', async () => {
    // Este teste pode ser melhorado para verificar diretamente a existência da tabela
    // ou inserção de um registro e verificação subsequente.
    const response = await request(app).get('/api/patrimonios');
    expect(response.status).toBe(200);
  });
});
describe('Testes de Integração', () => {
  it('Deve retornar o status 200 ao fazer login com credenciais corretas', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'admin123' });
    expect(response.status).toBe(302);
  });

  it('Deve cadastrar um novo patrimônio', async () => {
    const patrimonio = {
      responsavel: 'João',
      usuario: 'Maria',
      dataCadastro: '2024-04-03',
      matricula: '123',
      matriculaAntiga: '456',
      modelo: 'CPU',
      tipo: 'Adição',
      movimentacao: 'Entrada',
      secretaria: 'SEMAD'
    };

    const response = await request(app)
      .post('/api/patrimonios')
      .send(patrimonio);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Patrimônio cadastrado com sucesso');
  });

  it('Deve retornar uma lista de patrimônios', async () => {
    const response = await request(app).get('/api/patrimonios');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  
});
describe('Testes de Integração', () => {
  // Teste anteriormente definido

  it('Deve excluir um patrimônio existente', async () => {
    // Supondo que o patrimônio de ID 1 exista no banco de dados
    const idPatrimonioParaExcluir = 1;

    // Faz uma requisição para excluir o patrimônio pelo ID
    const responseExclusao = await request(app).delete(`/api/patrimonios/${idPatrimonioParaExcluir}`);

    // Verifique se o patrimônio foi excluído com sucesso
    expect(responseExclusao.status).toBe(200);
    expect(responseExclusao.text).toBe('Patrimônio excluído com sucesso');

    // Verifique se o patrimônio não está mais presente no banco de dados
    const responseListaAtualizada = await request(app).get('/api/patrimonios');
    expect(responseListaAtualizada.body).not.toContainEqual({ id: idPatrimonioParaExcluir });
  });

});
