// ARQUIVO PRINCIPAL
import express from "express";
import * as dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";


// HABILITAR O SERVIDOR A TER VARIÁVEIS DE AMBIENTE
dotenv.config();


// INSTANCIAR A VARIÁVEL QUE FICARÁ RESPONSÁVEL PELO SERVIDOR -> APP
const app = express();


// CONFIGURAR O SERVIDOR PARA ACEITAR ENVIAR E RECEBER ARQUIVOS EM JSON 
app.use(express.json());


// AGORA QUERO QUE O SERVIDOR USE A ROTA /USER
app.use("/user", userRoute);


// SERVIDOR SUBINDO PRO AR 
app.listen(process.env.PORT, () => {
  console.log(
    `App up and running on port http://localhost:${process.env.PORT}`
  );
});
