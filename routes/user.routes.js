// IMPORTAR BIBLIOTECAS
import express from "express";

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

// ROTA (1) para acessar constante "bemVindo" como teste -> OK
// req = request = requsição que vem do cliente
// res = response = resposta para o cliente
// retorna uma resposta com status 200 e um json
userRoute.get("/enap", (req, res) => {
  const bemVindo = "Bem vindo ao servidor da ENAP turma 92 - Ironhack";
  return res.status(200).json(bemVindo);
});

// ROTA (2) acessar todo o banco de dados -> OK!
userRoute.get("/all-processes", (req, res) => {
  return res.status(200).json(bancoDeDados);
});

// ROTA (3) acessar um processo pelo ID - GET - rota: /process/:id -> OK!
userRoute.get("/process/:id", (req, res) => {
  const { id } = req.params;
  const getProcessById = bancoDeDados.find((process) => process.id === id);
  const index = bancoDeDados.indexOf(getProcessById);
  return res.status(200).json(bancoDeDados[index]);
});

// ROTA (4) adicionar um novo processo - PUT - rota: /addProcess -> OK!
userRoute.post("/addProcess", (req, res) => {
  const form = req.body;
  bancoDeDados.push(form);
  return res.status(201).json(bancoDeDados);
});

// ROTA (5) adicionar um comentário à array de comentários - PUT - rota: /addComment/:id -> OK!
userRoute.post("/addComment/:id", (req, res) => {
  const { id } = req.params;
  const getProcessById = bancoDeDados.find((process) => process.id === id);
  const index = bancoDeDados.indexOf(getProcessById);
  const form = req.body;
  bancoDeDados[index].comments.push(form.comment);
  return res.status(201).json(bancoDeDados[index]);
});

// // ROTA (6) acessar todos os processos em andamento - GET - rota: /status/open -> PENDENTE
// userRoute.get("/status/open", (req, res) => {
//   return res.status(200).json();
// });

// // ROTA (7) acessar todos os processos finalizados - GET - rota: /status/closed -> PENDENTE
// userRoute.get("/status/closed", (req, res) => {
//   return res.status(200).json();
// });

// // ROTA (8) acessar todos os processos DE UM DETERMINADO SETOR - GET - rota: /setor/:nomeSetor -> PENDENTE
// userRoute.get("/setor/nomeSetor", (req, res) => {
//   return res.status(200).json();
// });

// // ROTA (9) acessar um processo escolhido aleatoriamente - GET - rota: /random -> PENDENTE
// userRoute.get("/random", (req, res) => {
//   return res.status(200).json();
// });

// ROTA (10) editar um processo - PUT - rota: /edit/:id -> OK!
userRoute.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const editProcess = bancoDeDados.find((process) => process.id === id);
  const index = bancoDeDados.indexOf(editProcess);
  bancoDeDados[index] = {
    ...editProcess,
    ...req.body,
  };
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
  return res.status(200).json(bancoDeDados);
});

// Exportando as rotas
export default userRoute;
