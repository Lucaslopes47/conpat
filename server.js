const express = require('express');
const mysql = require('mysql2/promise'); // Use a versão de promessas do mysql2
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Amoskate123*',
  database: 'conpat'
};

// Função para inicializar o banco de dados
async function initializeDatabase() {
  const connection = await mysql.createConnection(dbConfig);

  // Verifica se a tabela 'patrimonios' existe
  const [rows] = await connection.execute(`
    SELECT COUNT(*) AS count 
    FROM information_schema.tables 
    WHERE table_schema = 'conpat' 
    AND table_name = 'patrimonios'
  `);

  const tableExists = rows[0].count > 0;

  if (tableExists) {
    console.log('Tabela patrimonios existente');
  } else {
    // Cria a tabela se não existir
    await connection.execute(`
      CREATE TABLE patrimonios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        responsavel VARCHAR(255),
        usuario VARCHAR(255),
        dataCadastro DATE,
        matricula VARCHAR(255),
        matriculaAntiga VARCHAR(255),
        modelo VARCHAR(255),
        tipo VARCHAR(255),
        movimentacao VARCHAR(255),
        secretaria VARCHAR(255)
      )
    `);
    console.log('Tabela patrimonios criada com sucesso');
  }

  await connection.end();
}

// Função para limpar a tabela de patrimônios
async function clearPatrimoniosTable() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    await connection.execute('DELETE FROM patrimonios');
  } catch (error) {
    console.error('Erro ao limpar a tabela de patrimônios:', error);
  } finally {
    await connection.end();
  }
}

// Rota para excluir um patrimônio pelo ID
app.delete('/api/patrimonios/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM patrimonios WHERE id = ?';

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(query, [id]);
    await connection.end();
    res.send('Patrimônio excluído com sucesso');
  } catch (err) {
    console.error('Erro ao excluir patrimônio:', err);
    res.status(500).send(err);
  }
});


// Middleware de autenticação básica
const authenticate = (req, res, next) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    next();
  } else {
    res.status(401).json({ message: 'Acesso negado' });
  }
};

// Rota para o login
app.post('/login', authenticate, (req, res) => {
  res.redirect('/index.html');
});

// Rota básica para a raiz do servidor
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login/tela', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login', 'tela.html'));
});

// Rota para cadastrar um novo patrimônio
app.post('/api/patrimonios', async (req, res) => {
  const { responsavel, usuario, dataCadastro, matricula, matriculaAntiga, modelo, tipo, movimentacao, secretaria } = req.body;
  const query = 'INSERT INTO patrimonios (responsavel, usuario, dataCadastro, matricula, matriculaAntiga, modelo, tipo, movimentacao, secretaria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(query, [responsavel, usuario, dataCadastro, matricula, matriculaAntiga, modelo, tipo, movimentacao, secretaria]);
    await connection.end();
    res.send('Patrimônio cadastrado com sucesso');
  } catch (err) {
    console.error('Erro ao cadastrar patrimônio:', err);
    res.status(500).send(err);
  }
});

// Rota para obter os patrimônios cadastrados
app.get('/api/patrimonios', async (req, res) => {
  const query = 'SELECT * FROM patrimonios';

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute(query);
    await connection.end();
    res.json(results);
  } catch (err) {
    console.error('Erro ao obter patrimônios:', err);
    res.status(500).send(err);
  }
});

app.use(express.static(path.join(__dirname, 'public')));

// Iniciar o servidor
if (require.main === module) {
  const PORT = 3000;
  initializeDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  }).catch(err => {
    console.error('Erro ao inicializar o banco de dados:', err);
  });
}

module.exports = app;
module.exports.initializeDatabase = initializeDatabase;
module.exports.clearPatrimoniosTable = clearPatrimoniosTable;