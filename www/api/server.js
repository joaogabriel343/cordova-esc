const express = require('express');
const sql = require('mssql/msnodesqlv8');  // Use apenas este

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
    server: 'DESKTOP-DIFT32I\\SQLEXPRESS',
    database: 'CalmClassDB',
    driver: 'msnodesqlv8',  // Aqui também
    options: {
        trustedConnection: true // Usa autenticação do Windows
    }
};

const path = require('path');

// Serve a página de cadastro
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../cadastro.html'));
});

// Rota de Login - A URL foi alterada para /api/login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        await sql.connect(dbConfig);
        const result = await sql.query`SELECT * FROM Usuarios WHERE username = ${username} AND password = ${password}`;
        
        if (result.recordset.length > 0) {
            res.status(200).send({ success: true, message: 'Login bem-sucedido' });
        } else {
            res.status(401).send({ success: false, message: 'Usuário ou senha incorretos' });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: 'Erro ao conectar ao banco', error: err });
    }
});


app.post('/api/cadastro', async (req, res) => {
    const { username, password, email, date } = req.body;

    // Verificar se todos os campos obrigatórios foram enviados
    if (!username || !password || !email || !date) {
        return res.status(400).send({ success: false, message: 'Todos os campos são obrigatórios' });
    }

    try {
        await sql.connect(dbConfig);
        
        // Inserir os dados no banco sem enviar o ID
        await sql.query`INSERT INTO Usuarios (Usuario, Senha, Email, DataNascimento) 
                        VALUES (${username}, ${password}, ${email}, ${date})`;

        res.status(201).send({ success: true, message: 'Usuário cadastrado com sucesso' });
    } catch (err) {
        console.log(err);  // Log do erro para depuração
        res.status(500).send({ success: false, message: 'Erro ao cadastrar usuário', error: err });
    }
});



// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
