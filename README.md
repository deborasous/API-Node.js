# Aplicação base de Node.js

<img src="https://user-images.githubusercontent.com/59830792/187295094-3dd04636-fe46-43e0-94d7-3662ba08970e.png" height="70">

<p>Node.js cria um ambiente de execução Javascript server-side, ou seja, é possível usar o JS do lado do servidor sem depender de um browser para a execução.</p>

#### Vesion

<p>Node.js v16.x</p>

#### Install using Ubuntu

<p>curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs</p>

## Frameworks

<img src="https://user-images.githubusercontent.com/59830792/187295107-544b0e8a-0fc6-40f7-84ef-cc659528faca.png" height="50">

<p>O Express é uma estrutura de aplicativo da Web Node.js mínima e flexível que fornece um conjunto robusto de recursos para aplicativos da Web e móveis. Otimiza aplicações web e APIs utilizando o Node para executar o Javascript como linguagem Back end.</p>

#### Install

<p>npm install express --save</p>

## Bibliotecas

<img src="https://user-images.githubusercontent.com/59830792/187455099-cd3c3091-cf04-4aac-8487-9aeccce5db26.png" height="50">

<p>Nodemon monitora qualquer alteração na aplicação e reinicia o servidor Node automaticamente.</p>

#### 1º install

<p>npm install -g nodemon</p>

#### 2º create a script in package.json

<p>"dev": "nodemon app.js" (com o nome que desejar e como segundo parametro define qual o script a ser executado</p>

#### 3º Run the script in terminal

<p>npm run dev</p>

## Extensions

<img src="https://user-images.githubusercontent.com/59830792/187547800-02a726e0-db5b-4309-a8c1-322d8dbae4ee.png" height="50">

<p>O REST Client permite enviar solicitação HTTP e exibir a resposta diretamente no Visual Studio Code..</p>

#### Install in VSCODE

#### If erro

<p>Se der erro e o Nodemon não for encontrado. Remova processos que possam está rodando com : pkill -f node</p>
<p>Depois reinicie o Nodemon local: npm install --save-dev nodemon</p>
