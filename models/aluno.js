const mongoose = require('mongoose')

const schema = mongoose.Schema({
    nome: {
        type: String, 
        required: true,
    },
    turma : {
        type: String, 
        required: true,
    },
    notas: {
        type: Array, 
        required: true,
    },
    mediaFinal: {
        type: String, 
        required: true,
    }
})

const aluno = mongoose.model('aluno', schema)

module.exports = aluno