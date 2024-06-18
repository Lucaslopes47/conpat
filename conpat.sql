CREATE DATABASE conpat;
USE conpat;

CREATE TABLE patrimonios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    responsavel VARCHAR(255) NOT NULL,
    usuario VARCHAR(255) NOT NULL,
    dataCadastro DATE NOT NULL,
    matricula VARCHAR(255) NOT NULL,
    matriculaAntiga VARCHAR(255),
    modelo VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    movimentacao VARCHAR(255) NOT NULL,
    secretaria VARCHAR(255)
);
