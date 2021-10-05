const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const porta = 3000;
app.set("port", porta);
app.use(bodyParser.json());

let contador = 2;
let produtos = [{
        id: 1,
        nome: "produto",
        unidade: "2",
        valorUnitario: "99.9 R$"
    },
    {
        id: 2,
        nome: "Caneta",
        unidade: "152",
        valorUnitario: "2.5 R$"
    }
];

//tratamento de requisições GET
app.get("/produtos", (req, res, next) => {
    console.log(produtos);
    res.status(200).json(produtos);
})

//tratamento de requisições POST
app.post("/produtos", (req, res, next) => {
    const produto = {
        id: contador += 1,
        nome: req.body.nome,
        unidade: req.body.unidade,
        valorUnitario: req.body.valorUnitario,
    }
    produtos.push(produto)
    console.log(produtos);
    res.status(201).json(produto);
});


//tratamento de requisições PUT
app.put("/produtos", (req, res, next) => {
    produtos.forEach((produto) => {
        if (produto.id === req.body.id) {
            produto.nome = req.body.nome;
            produto.unidade = req.body.unidade;
            produto.valorUnitario = req.body.valorUnitario;
        }

        console.log(produtos);
    })
    res.status(204).end();
});

//Deletar
app.delete("/produtos/:id", (req, res, next) => {
    const id = req.params.id;
    produtos.forEach((produto, index) => {
        if (produto.id == id) produtos.splice(index, 1)
    })
    res.status(200).json(produtos);
})

const server = http.createServer(app);
server.listen(3000);