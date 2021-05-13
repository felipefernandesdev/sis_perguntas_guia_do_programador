const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
const { render } = require("ejs");

//conectar db
connection
        .authenticate()
        .then(()=>{
            console.log("Banco de Dados conectado!!");
        })
        .catch((msgErro)=>{
            console.log(msgErro);
        })

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//rotas
app.get("/",(req, res) => {
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
       
        res.render("index",{
            perguntas: perguntas,
        })
    
    });
    
});

app.get("/perguntar", (req, res)=> {
    res.render("perguntar");
});

app.get("/pergunta/:id",(req, res)=>{
    var id = req.params.id;

    Pergunta.findOne({
        where: {id:id}
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[
                    ['id','DESC']
                ]
            }).then(respostas =>{
                res.render("pergunta",{
                pergunta: pergunta,
                respostas: respostas
            })

            
            });
        }else{
            res.redirect("/");
        }
    });

});

//receber forms
app.post("/salvar",(req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    });
});

app.post("/enviar",(req,res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect(`/pergunta/${perguntaId}`);
    });

});

//servidor
app.listen(80, () => {
    console.log("Servidor Rodando!!");
});
