const customExpress = require('./config/customExpress');

const conexao = require('./database/conexao');
const Tables = require('./database/tables');


conexao.connect(erro => {
    if(erro){
        console.log(erro)
    }else{
        console.log('conectado ao BD');
        Tables.init(conexao);
        const app = customExpress();
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
    }
})



