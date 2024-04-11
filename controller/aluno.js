


const aluno = require("../models/aluno")

const ControllerAluno = {
    getAllAlunos: async (req, res) => {
        try {
            res.json(await aluno.find());
        } catch (error) {
            res.status(404).json({ error: "[BACKEND STATUS]: " + error })
        }
    },
    getReprovados: async (req, res) => {
        try {
            const alunosReprovados = await aluno.find({ mediaFinal: { $lt: 5 } });
            res.json(alunosReprovados);
        } catch (error) {
            res.status(404).json({ error: "[BACKEND STATUS]: " + error })
        }
    },
    getRecuperacao: async (req, res) => {
        try {
            const alunosReprovados = await aluno.find({ mediaFinal: { $gte: 5, $lt: 7 } });
            res.json(alunosReprovados);
        } catch (error) {
            res.status(404).json({ error: "[BACKEND STATUS]: " + error })
        }
    },
    getAprovados: async (req, res) => {
        try {
            const alunosReprovados = await aluno.find({ mediaFinal: { $gte: 7 } });
            res.json(alunosReprovados);
        } catch (error) {
            res.status(404).json({ error: "[BACKEND STATUS]: " + error })
        }
    },
    create: async (req, res) => {
        const turmas = {
            ["A"]: true,
            ["B"]: true,
            ["C"]: true,
            ["D"]: true,
            ["E"]: true
        }

        try {
            const aluno_dados = req.body

            if (aluno_dados.nome == '' || aluno_dados.nome == null) {
                res.status(403).json({ error: "[BACKEND STATUS]: Dado nome está incorreto." })
            }

            if (aluno_dados.turma == '' || aluno_dados.turma == null) {
                res.status(403).json({ error: "[BACKEND STATUS]: Dado turma está incorreto." })
                return;
            } else if (turmas[aluno_dados.turma.toUpperCase()] == null) {
                res.status(403).json({ error: "[BACKEND STATUS]: Turma não existe." })
                return;
            }

            if (typeof (aluno_dados.notas) == Object) {
                res.status(403).json({ error: "[BACKEND STATUS]: Você precisa enviar uma array" })
                return;
            } else if (aluno_dados.notas.length < 4) {
                res.status(403).json({ error: "[BACKEND STATUS]: Você precisa enviar uma array com 4 números" })
                return;
            } else if (!aluno_dados.notas.every((value) => value >= 0 && value <= 10)) {
                res.status(403).json({ error: "[BACKEND STATUS]: As notas precisão ser entre 0 e 10." })
                return
            }

            let somaNotas = 0

            aluno_dados.notas.every((value) => somaNotas += value)

            const mediaFinal = somaNotas / aluno_dados.notas.length
            aluno_dados.mediaFinal = mediaFinal

            res.json(await aluno.create(aluno_dados))
        } catch (error) {
            res.status(404).json({ error: "[BACKEND STATUS]: " + error })
        }
    },
    delete: async (req, res) => {
        try {
            const nomeAluno = req.query.nomeAluno
            res.json(await aluno.deleteMany({ nome: nomeAluno }))
        } catch (error) {
            res.status(404).json({ error: "[BACKEND STATUS]: " + error })
        }
    },
    updateTurmas: async (req, res) => {
        try {
            const { nomeTurma, nomeTurmaAtualizar } = req.query
            res.json(await aluno.updateMany({ turma: nomeTurma }, { $set: { turma: nomeTurmaAtualizar } }, { new: true /* Já realizar o select depois de ter o update*/ }))
        } catch (error) {
            res.status(404).json({ error: "[BACKEND STATUS]: " + error })
        }
    },
}

module.exports = ControllerAluno