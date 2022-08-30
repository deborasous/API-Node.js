const express = require("express");
const { randomUUID } = require("crypto"); //cria um ID para fazer o gerenciamento
const fs = require("fs"); //COLOCA AS INFORMAÇÕES DOs PRODUTOs CADASTRADOS EM UM ARQUIVO DENTRO DA APLICAÇÃO QUE SIMULA UM BANCO DE DADOS usando o pacote File System do Node.js

const app = express(); //inicializa o Express

app.use(express.json()); //define com qual tipo de arquivo o express deve tratar/ faz a intermediação entre o arquivo app.js e request.http

let products = []; //funciona como se fosse um banco de dados em memória

//O fs.writeFile está trazendo um array vazio, o fs.readFile() vai corrigir... vamos pegar as informações de dentro do arquivo que foi criado e quando der um send request no GET do arquivo resquest.http ele trás as informações do documento products.json. Assim, todos os produtos que forem inseridos no POST, será armazenado no arquivo products.json que será incluido no array let products = []
fs.readFile("products.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    products = JSON.parse(data); //retorna os dados em formato de objeto. em JSON.stringify(products) ele foi convertido para JSON
  }
});
/**
 * POST inserir um dado
 * GET buscar um/mais dados
 * PUT alterar um dado
 * DELETE remover um dado
 */

/** FORMAS DE RECEBER AS INFORMAÇÕES (parametros comuns dentro do Express)
 * BODY utiliza com o metodo POST ou PUT quando deseja enviar informações(dados para a aplicação) no corpo da requisição(dados de usuário, dados do produto, etc.)
 * PARAMS são os dados que vem na URL, são os parametros de rota... /product/546546843
 * QUERY fazem parte da rota(URL), mas não são obrigatorios... /product?id=5464564322&value=6683213666 (paginação)
 */

/*REQUISIÇÕES DO TIPO post, delete não pode ser feito pelo browser, somente do tipo get*/

app.post("/products", (req, res) => {
  //descrição e saiba mais

  const { infProduct, knowMore } = req.body; //trás as informações do json de dentro do arquivo request.http

  const product = {
    infProduct,
    knowMore,
    id: randomUUID(), //gera o id
  };
  products.push(product);

  /*FILE SYSTEM (fs) = VAI CRIAR UM ARQUIVO AUTOMATICAMENTE DENTRO DA APLICAÇÃO, ASSIM QUE FOR DADO UM SEND REQUEST NO POST DO ARQUIVO request.http
  //quando inserir um produto no products.push(product);, atualize o arquivo
  //1º parametro = products.json é o nome do arquivo que será criado no diretório
  //2º parametro = products deve ser convertido para JSON.stringify(products), pois se colocar a variavel products direto dá erro. JSON.stringify(products) é o array que quero que seja inserido no arquivo em formato JSON
  //3º paramentro = (err) => recebe um erro se houver, se não confirma a inclusão do produto
  //quando der o send require no POST do arquivo request.http, criará o arquivo no diretório, mas quando der GET trás um array vazio. Resolução acima em fs.readFile()

  //BLOCO DE CODIGO
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Produto inserido");
    }
  });

  ###OBS=== para evitar de escrever o mesmo código para o POST, PUT E DELETE,, pois devem ser subscritos. Cria- se no final do deste arquivo uma FUNÇÃO que com o bloco de codigo acima e chama eles onde desejar, como a linha abaixo
  */
  productFile();

  return res.json(product);
});

//CRIAR ROTA PARA TODOS OS PRODUTOS CADASTRADOS
app.get("/products", (req, res) => {
  return res.json(products); //pega o array products e retorna para quem está fazendo a requisição
});

//CRIA ROTA PARA PEGAR O PRODUTO PELO ID
app.get("/products/:id", (req, res) => {
  const { id } = req.params; //desistrutura de dentro do req.params somente o id
  const product = products.find((product) => product.id === id); //vai percorrer o objeto product e achar o dentro de products o parametro product que seja igual ao id
  return res.json(product);
});

//CRIA ROTA PARA AUTERAR UMA INFORMAÇÃO
app.put("/products/:id", (req, res) => {
  const { id } = req.params; //pega o id
  const { infProduct, knowMore } = req.body; //e recebe os dados relacionados a esse id, para que possam ser alterados

  //ENCONTRAR DENTRO DO ARRAY O OBJETO QUE DESEJA ALTERAR
  //só retorna o index do objeto
  const productIndex = products.findIndex((product) => product.id === id); //vai percorrer o array para encontrar o id para alterá-lo abaixo
  //esse será o produto alterado
  products[productIndex] = {
    ...products[productIndex], //insere todas as informações contidas no productIndex, mesmo infProduct e knowMore
    infProduct,
    knowMore,
  };

  productFile();

  return res.json({ message: "Produto alterado com sucesso" });
});

//REMOVER UM PRODUTO
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex((product) => product.id === id);
  products.splice(productIndex, 1); //PEGA O INDEX QUE FOI ENCONTRADO ACIMA E REMOVA UMA POSIÇÃO

  productFile() 

  return res.json({ message: "Produto excluido com sucesso" });
});

//quando chamada no POST, PUT ou no DELETE a function createProductFile() atualiza o array
function productFile() {
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Produto inserido");
    }
  });
}

app.listen(4002, () => console.log("rota 4002"));
