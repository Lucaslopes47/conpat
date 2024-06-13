const mysql = require('mysql2/promise');
const prompt = require('prompt');

async function main() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Amoskate123*',
        database: 'conpat'
    });

    async function verificaTabelaExiste() {
        const [rows] = await connection.execute("SHOW TABLES LIKE 'Inventarios'");
        return rows.length > 0;
    }

    async function criarTabela() {
        const sql = `
            CREATE TABLE IF NOT EXISTS Inventarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Colaborador TEXT,
                Usuario TEXT,
                Patrimonio VARCHAR(6),
                Produto TEXT,
                Marca TEXT,
                Serie TEXT,
                Modelo TEXT
            )
        `;
        await connection.execute(sql);
    }

    async function solicitarEntrada(campos, valoresCampos, indice = 0) {
        if (indice >= campos.length) {
            await inserirNoBanco(valoresCampos);
            return;
        }

        const campo = campos[indice];

        if (campo === 'Patrimonio') {
            let valor = await promptInput(campo);

            while (!valor || valor.length !== 6) {
                if (!valor) {
                    console.error('O valor não pode estar vazio.');
                } else {
                    console.error('O patrimônio deve ter no máximo 6 caracteres e nao pode ter menos que 6 tambem.');
                }
                valor = await promptInput(campo);
            }

            valoresCampos[campo] = valor;
        } else if (campo === 'Usuario') {
            let valor = await promptInput(campo);

            while (!valor || !/^\w+\.\w+$/.test(valor)) {
                if (!valor) {
                    console.error('O valor não pode estar vazio.');
                } else {
                    console.error('O usuário deve estar no formato nome.sobrenome.');
                }
                valor = await promptInput(campo);
            }

            valoresCampos[campo] = valor;
        } else {
            // Para outros campos, não há necessidade de validação especial
            valoresCampos[campo] = await promptInput(campo);
        }

        console.clear();
        console.log('Campos preenchidos:');
        for (let i = 0; i <= indice; i++) {
            console.log(`${campos[i]}: ${valoresCampos[campos[i]]}`);
        }

        await solicitarEntrada(campos, valoresCampos, indice + 1);
    }

    async function inserirNoBanco(valoresCampos) {
        const campos = Object.keys(valoresCampos);
        const sql = `INSERT INTO Inventarios (${campos.join(', ')}) VALUES (${campos.map(() => '?').join(', ')})`;
        const valores = Object.values(valoresCampos);
        await connection.execute(sql, valores);
        console.log('Entrada criada com sucesso.');
        const resposta = await promptInput('Deseja preencher uma nova entrada? (Sim/Não)');
        if (resposta.trim().toLowerCase() === 'sim') {
            console.clear();
            await solicitarEntrada(campos, {});
        } else {
            connection.end();
            console.log('Encerrando o programa...');
            process.exit();
        }
    }

    function promptInput(campo) {
        return new Promise((resolve, reject) => {
            prompt.get(campo, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[campo].trim());
                }
            });
        });
    }

    try {
        const tabelaExiste = await verificaTabelaExiste();
        if (!tabelaExiste) {
            await criarTabela();
            console.log('Tabela "Inventarios" criada com sucesso.');
        } else {
            console.log('Tabela "Inventarios" já existe.');
        }
        const campos = ['Colaborador', 'Usuario', 'Patrimonio', 'Produto', 'Marca', 'Serie', 'Modelo'];
        await solicitarEntrada(campos, {});
    } catch (error) {
        console.error('Erro:', error);
        connection.end();
    }
}

main().catch(err => console.error(err));
