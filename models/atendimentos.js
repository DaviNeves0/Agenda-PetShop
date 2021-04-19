const moment = require('moment')
const conexao = require('../database/conexao');


class Atendimentos{
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const date = moment(atendimento.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataEhValida = moment(date).isSameOrAfter(dataCriacao)
        const clienteeHValido = atendimento.cliente.length >=4

        const validacoes = [
            {
                nome: 'date',
                valido: dataEhValida,
                mensagem:'Data deve ser maior ou igual a data atual'
            },
            {
                nome:'cliente',
                valido: clienteeHValido,
                mensagem: 'Cliente deve ter pelo menos três letras'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, date}
        
            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados)=>{
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(201).json(resultados)
                }
            })
        }
       
    }
}

module.exports= new Atendimentos