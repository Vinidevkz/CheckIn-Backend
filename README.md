<img src='https://github.com/Vinidevkz/CheckIn-Backend/blob/main/logo.png'/>
<strong>Backend do projeto CheckIn - Por Vinicius Eduardo, 2025</strong> 
<hr>
<h2>Sobre o projeto:</h2>
<p>O CheckIn é uma plataforma inovadora de compra de ingressos de cinema, projetada para oferecer uma experiência completa e conveniente aos usuários. Com o CheckIn, os espectadores podem explorar filmes em cartaz, escolher sessões, selecionar horários e reservar seus assentos preferidos, tudo de forma rápida e intuitiva, diretamente de um único lugar.

Além disso, a plataforma integra um sistema de pagamento seguro e eficiente, garantindo transações confiáveis. Após a compra, os usuários recebem um ingresso digital com QR Code, que pode ser facilmente verificado na entrada do cinema por meio do celular, eliminando a necessidade de impressões e proporcionando uma experiência totalmente digital e sustentável.
</p>

<h2>Tecnologias Utilizadas:</h2>
<div style="padding: 20px">
  <strong>🟢Node.JS:</strong>
    <p>Para criação do Backend com JavaScript rodando no servidor.<br>
    Link da Documentação: https://nodejs.org/pt</p>
  <br>
  <strong>⚪Express:</strong>
    <p>Framework Para a criação de API, rotas e middlewares do servidor.<br>
    Link da Documentação: https://expressjs.com/</p>
  <br>
  <strong>🔵Sequelize:</strong>
    <p>Para a criação da ORM (Object-Relational Mapping), para facilitar a relação com o banco de dados.<br>
    Link da Documentação: https://sequelize.org/</p>
  <br>
  <strong>🔴Banco de Dados:</strong>
    <p>MySQL (Banco de Dados relacional)</p>
</div>

<h2>Funcionalidades:</h2>
<div>
  <h3><strong>Usuário:</strong></h3>
  <p><strong>Se cadastrar:</strong> Para se cadastrar na plataforma, o usuário terá que enviar as seguintes informações:</p>

  <div style="background-color: #1b1b1b; padding: 15px; border-radius: 15px; position: relative;">
    <pre style="color: #f8f8f8; font-family: 'Courier New', monospace; margin: 0;">
      <code id="json-code">
{
    "nameUser": "Vinicius",
    "emailUser": "vini@gmail.com",
    "passwordUser": "senhaSuperForte",
    "cpfUser": "111.111.111-11",
    "dataNasc": "01/11/2025"
}
      </code>
    </pre>
  </div>

  <p>Resposta:</p>
      <pre style="color: #f8f8f8; font-family: 'Courier New', monospace; margin: 0;">
      <code id="json-code">
      {
        "message":"Usuário criado com sucesso!","newUser":          
        {
          "idUser":6,
          "emailUser":"vini@gmail.com",
          "passwordUser":"senhaSuperForte",
          "cpfUser":"111.111.111-11",
          "dataNasc":"01/11/2025",
          "updatedAt":"2025-02-28T22:07:05.855Z",
          "createdAt":"2025-02-28T22:07:05.855Z"
          }
      }
      </code>
    </pre>

  </div>
</div>



