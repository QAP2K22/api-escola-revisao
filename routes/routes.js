const express = require("express")
const ControllerAluno = require("../controller/aluno")
const router = express.Router()

router.get("/", function (req, res) {
    res.json({})
})

router.get("/alunos", (req, res) => ControllerAluno.getAllAlunos(req, res))
router.get("/alunos/reprovados", (req, res) => ControllerAluno.getReprovados(req, res))
router.get("/alunos/recuperacao", (req, res) => ControllerAluno.getRecuperacao(req, res))
router.get("/alunos/aprovados", (req, res) => ControllerAluno.getAprovados(req, res))
router.post("/alunos/adicionar", (req, res) => ControllerAluno.create(req, res))
router.put("/alunos/atualizarTurmas", (req, res) => ControllerAluno.updateTurmas(req, res))
router.delete("/alunos/excluir/:", (req, res) => ControllerAluno.delete(req, res))


module.exports = router