// IMPORTAÇÕES
import express from "express";
//////////// import UserModel from "../model/user.model.js";


// CRIAR VARIÁVEL QUE SERÁ ROTEADOR
const userRoute = express.Router();


// ARQUIVOS RECORTADOS DO INDEX.JS
// BANCO DE DADOS
const bancoDeDados = [
  {
    id: "b5e927e0-3955-4322-a10f-6d4253e0da7c",
    documentName: "Licitação ENAP - Curso Web Dev",
    status: "em andamento",
    details:
      "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB, em parceria com a IronHack",
    dateInit: "16/12/2022",
    comments: [
      "Processo aberto",
      "Processo partiu para as partes assinarem",
      "Processo em análise final",
      "Processo já tem data final",
    ],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
  {
    id: "e967baa5-b20c-409c-be27-c1bc2b5d0429",
    documentName: "Licitação Compras - Notebooks",
    status: "em andamento",
    details: "Processo de licitação para compra de notebooks",
    dateInit: "30/12/2022",
    comments: ["Processo em aberto e sem previsão de conclusão"],
    dateEnd: "",
    setor: "TRE",
  },
  {
    id: "9c5fa24f-6bb1-4285-a170-5223fc9b71fb",
    documentName: "Licitação Compras - Ar condicionado",
    status: "Finalizado",
    details: "Processo de licitação para compra de ar condicionado",
    dateInit: "15/12/2022",
    comments: ["Processo aberto", "Processo finalizado"],
    dateEnd: "25/11/2022",
    setor: "TJDFT",
  },
];

// /////////// Create rota no mongodb - comentar as rotas antigas e substituir por essas
// // ROTA (1) VERSAO MONGODB - Criar novo processo - PUT
// userRoute.post("/create-process", async (req, res) => {
//     try {
//         const form = req.body;
//         const newProcess = await UserModel.create(form)
//         return res.status(200).json(newProcess)

//     // Decorar esse erro! Usar esse padrão sempre
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({msg: "Algo deu errado na criação do processo"})
//     } // ou error.erros.properties.message pra mostrar o erro específico

// })
// // lembrar de atualizar a rota no insomnia pra testar e rodar o node index.js



// ROTA (1) para acessar constante "bemVindo" como teste -> OK
// req = request = requsição que vem do cliente
// res = response = resposta para o cliente
// retorna uma resposta com status 200 e um json
userRoute.get("/enap", (req, res) => {
    const bemVindo = "Bem vindo ao servidor da ENAP turma 92 - Ironhack";
    console.log("Rota 1 executada com sucesso")
    return res.status(200).json(bemVindo);
});


// ROTA (2) acessar todo o banco de dados -> OK!
userRoute.get("/all-processes", (req, res) => {
    console.log("Rota 2 executada com sucesso")
    return res.status(200).json(bancoDeDados);
});


// ROTA (3) acessar um processo pelo ID - GET - rota: /process/:id -> OK!
userRoute.get("/process/:id", (req, res) => {
  const { id } = req.params;
  const getProcessById = bancoDeDados.find((process) => process.id === id);
  const index = bancoDeDados.indexOf(getProcessById);
  console.log("Rota 3 executada com sucesso");
  return res.status(200).json(bancoDeDados[index]);
});


// ROTA (4) adicionar um novo processo - POST - rota: /addProcess -> OK!
userRoute.post("/addProcess", (req, res) => {
  const form = req.body;
  bancoDeDados.push(form);
  console.log("Rota 4 executada com sucesso");
  return res.status(201).json(bancoDeDados);
});


// ROTA (5) adicionar um comentário à array de comentários - PUT - rota: /addComment/:id -> OK!
userRoute.post("/addComment/:id", (req, res) => {
  const { id } = req.params;
  const getProcessById = bancoDeDados.find((process) => process.id === id);
  const index = bancoDeDados.indexOf(getProcessById);
  const form = req.body;
  bancoDeDados[index].comments.push(form.comment);
  console.log("Rota 5 executada com sucesso");
  return res.status(201).json(bancoDeDados[index]);
});


// ROTA (6) acessar todos os processos em andamento - GET - rota: /status/open -> OK!
userRoute.get("/status/open", (req, res) => {
  const statusOpen = bancoDeDados.filter((process) => process.status === "em andamento");
  console.log("Rota 6 executada com sucesso");
  return res.status(200).json(statusOpen);
});


// ROTA (7) acessar todos os processos finalizados - GET - rota: /status/closed -> OK! -> corrigir case sensitive
userRoute.get("/status/closed", (req, res) => {
    const statusClosed = bancoDeDados.filter((process) => process.status === "Finalizado");
    console.log("Rota 7 executada com sucesso");
    return res.status(200).json(statusClosed);
  });


// ROTA (8) acessar todos os processos DE UM DETERMINADO SETOR - GET - rota: /setor/:nomeSetor -> OK!
userRoute.get("/setor/:nomeSetor", (req, res) => {
    const { nomeSetor } = req.params;
    const processosSetor = bancoDeDados.filter((process) => process.setor === nomeSetor);
    console.log("Rota 8 executada com sucesso");
    return res.status(200).json(processosSetor);
});


// ROTA (9) acessar um processo escolhido aleatoriamente - GET - rota: /random -> PENDENTE
userRoute.get("/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * bancoDeDados.length);
    console.log(bancoDeDados.length);
    const randomProcess = bancoDeDados[randomIndex];
    console.log("Rota 9 executada com sucesso");
    return res.status(200).json(randomProcess);
});



// ROTA (10) editar um processo - PUT - rota: /edit/:id -> OK!
userRoute.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const editProcess = bancoDeDados.find((process) => process.id === id);
  const index = bancoDeDados.indexOf(editProcess);
  bancoDeDados[index] = {
    ...editProcess,
    ...req.body,
  };
  console.log("Rota 10 executada com sucesso");
  return res.status(200).json(bancoDeDados[index]);
});


// ROTA (11) excluir um objeto - DELETE - rota: /delete -> OK!
userRoute.delete("/delete/:id", (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  const deleteProcessById = bancoDeDados.find((process) => process.id === id);

  if (!deleteProcessById) {
    return res.status(400).json({ msg: "Usuário não encontrado" });
  }

  const index = bancoDeDados.indexOf(deleteProcessById);
  bancoDeDados.splice(index, 1);
  console.log("Rota 11 executada com sucesso");
  return res.status(200).json(bancoDeDados);
});


// Exportando as rotas
export default userRoute;
