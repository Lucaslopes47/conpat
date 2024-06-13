const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'conpat'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Configuração da sessão
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use true se estiver usando HTTPS
}));

// Middleware de autenticação básica
const authenticate = (req, res, next) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    req.session.authenticated = true;
    next();
  } else {
    res.status(401).json({ message: 'Acesso negado' });
  }
};

// Middleware para verificar se o usuário está autenticado
const isAuthenticated = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect('/login/tela');
  }
};

// Rota para o login
app.post('/login', authenticate, (req, res) => {
  res.redirect('/index.html');
});

// Rota para a tela de login
app.get('/login/tela', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login', 'tela.html'));
});

// Redirecionar a raiz para a tela de login
app.get('/', (req, res) => {
  res.redirect('/login/tela');
});

// Rota para o index.html protegida
app.get('/index.html', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para cadastrar um novo patrimônio
app.post('/api/patrimonios', (req, res) => {
  const { responsavel, usuario, dataCadastro, matricula, matriculaAntiga, modelo, tipo, movimentacao, secretaria } = req.body;
  const query = 'INSERT INTO patrimonios (responsavel, usuario, dataCadastro, matricula, matriculaAntiga, modelo, tipo, movimentacao, secretaria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [responsavel, usuario, dataCadastro, matricula, matriculaAntiga, modelo, tipo, movimentacao, secretaria], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar patrimônio:', err);
      return res.status(500).send(err);
    }
    res.send('Patrimônio cadastrado com sucesso');
  });
});

// Rota para obter os patrimônios cadastrados
app.get('/api/patrimonios', (req, res) => {
  const query = 'SELECT * FROM patrimonios';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao obter patrimônios:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.use(express.static(path.join(__dirname, 'public')));

// Iniciar o servidor
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
