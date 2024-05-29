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

  it('Deve responder com status 401 ao fazer login com credenciais incorretas', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'user', password: 'wrongpassword' });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Acesso negado');
  });

  // Adicione mais testes conforme necessário
});

