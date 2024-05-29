const request = require('supertest');
const app = require('./server'); // Importa o objeto app do server.js

describe('Testes de Rota', () => {
  it('Deve responder com status 200 na rota /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('Deve redirecionar para /index.html ao fazer login com credenciais corretas', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'admin123' });
    expect(response.status).toBe(302); // 302 é o código de redirecionamento
    expect(response.headers.location).toBe('/index.html');
  });
});

it('Deve retornar status 401 ao fazer login com credenciais incorretas', async () => {
  const response = await request(app)
    .post('/login')
    .send({ username: 'user', password: 'wrongpassword' });
  expect(response.status).toBe(401);
  expect(response.body.message).toBe('Acesso negado');
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
