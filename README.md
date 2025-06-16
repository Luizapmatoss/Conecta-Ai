<h1>
  Conecta Aí
</h1>
<p>
  O Conecta Aí, da Conecta Aí Tech, é uma plataforma que conecta profissionais de TI a clientes em todo o Brasil, facilitando o contato e ampliando o alcance da empresa.<br>
</p>
<h2>
  1. DESCRIÇÃO DETALHADA E PRINCIPAIS RECURSOS
</h2>
<p>
  O Conecta Aí resolve o desafio de encontrar o profissional de TI ideal e localizado geograficamente perto do cliente. 
  Ele elimina a perda de tempo que ocorre ao contatar especialistas que não atendem às necessidades específicas, garantindo que o cliente encontre rapidamente quem pode realmente ajudar.<br>
</p>
<h3>
  Grupos de Usuários
</h3>
<p>
  • <strong>Clientes (Pessoas Físicas e Jurídicas):</strong> Aqueles que buscam serviços de TI e precisam de uma
  maneira eficiente para encontrar profissionais qualificados e próximos.
</p>
<h3>
  Principais Funcionalidades
</h3>
<p>
  <strong>1. Sistema de busca avançada:</strong> Permite aos clientes buscar profissionais de TI utilizando filtros
  como especialidade (redes, hardware, software etc)<br>
  <strong>2. Perfis detalhados:</strong> Cada profissional possui um perfil completo com uma pequana descrição, especialidade,
  experiência, endereço e opção de contato<br>
  <strong>3. Conexão direta e eficiente:</strong> Facilita o contato imediato entre clientes e profissionais via WhatsApp,
  agilizando o processo de comunicação e contratação.<br>
  <strong>4. Abrir chamados na plataforma:</strong> Os clientes podem abrir um chamado dentro da plataforma, assim eles não precisam 
  entrar em contato direto com algum profissional, pois algum deles irá atender seu chamado.<br>
  <strong>5. Sistema de avaliação e feedback:</strong> Os clientes podem adicionar avaliações dentro da plataforma,
  para que assim tenha-se um feedback acerca dos profissionais e da plataforma em si.<br>
</p>
<h2>
  2. TECNOLOGIAS UTILIZADAS
</h2>
<p>
  O Conecta Aí foi contruído utilizando as seguintes tecnologias:
</p>
<h3>
  Frontend ¬
</h3>
<p>
  <strong>• HTML:</strong> Para a estruturação e o conteúdo das páginas web<br>
  <strong>• CSS:</strong> Para a estilização e o design responsivo da interface do usuário<br>
  <strong>• JavaScript</strong>: Para a interatividade e a dinâmica das funcionalides do lado do cliente
</p>
<h3>
  Backend ¬
</h3>
<p>
  <strong>• Java:</strong> A linguagem de programação principal para a lógica de negócio e o processamento no servidor.<br>
  <strong>• SpringBoot:</strong> Um framework robusto que simplifica o desenvolvimento de aplicações Java, provendo uma base sólido
  para a API do Conecta Aí.
</p>
<h3>
  Banco de Dados ¬
</h3>
<p>
  <strong>• MySQL (SQL):</strong> Um sistema de gerenciamento de banco de dados relacional utilizado para armazenar todas as 
  informações da plataforma, como abertura de chamados e dados dos clientes.
</p>
<h1>
  3. PRÉ-REQUISITOS (PARA AVALIADORES/DESENVOLVEDORES)
</h1>
<p>
  Para que o Conecta Aí possa ser executado em seu ambiente local, você precirsará ter os seguintes softwares instalos:<br>
  <strong>• Java Development Kit (JDK)</strong>: Versão 17 ou superior.<br>
  <strong>• Maven ou Grandle:</strong> Ferramentas de automação de construção para o projeto Java.<br>
  <strong>• MySQL Server:</strong> Para configurar o banco de dados localmente.<br>
  <strong>• Node.js:</strong> Necessário para instalar e executar o http-server para o frontend.
</p>
<h2>
  4. COMO RODAR A APLICAÇÃO LOCALMENTE (PARA AVALIADORES/DESENVOLVEDORES)
</h2>
<p>
  Para que o Conecta Aí possa ser executado em seu ambiente local, siga os passos abaixo. 
  Certifique-se de ter todos os pré-requisitos instalados.<br>
  <strong>1. Clone o Repositório</strong>: Primeiro, faça um clone do repositório do projeto para o seu computador. 
  Abra o terminal ou prompt de comando e execute: git clone https://github.com/Luizapmatoss/Conecta-Ai.git<br>
  Navegue até a paz raiz do projeto: cd backend<br>
  <strong>2. Configurar o Banco de Dados MySQL:</strong><br>
    • Crir um banco de dados MySQL com o nome que sua aplicação esperar (conecta_ai)<br>
    • Verifique o arquivo de configuração do Spring Boot (application.properties ou application.yml em src/main/resources do módulo backend) 
  para as credenciais do banco de dados (usuário, senha, nome do banco) e ajuste-as conforme sua configuração local do MySQL.<br>
  <strong>3. Rodar o Backend(Spring Boot):</strong><br>
    • Navegue até o diretório backend do projeto<br>
    • Compilte e execute a aplicação Spring Boot usando Maven ou Grandle:<br>
      <strong>• Com maven:</strong> mvn clean install mvn spring-boot:run<br>
      <strong>• Com grandle:</strong> grandle build grandle bootRun<br>
      • O backend estará disponível, por padrão, em http://localhost:8080 (ou a porta configurada no seu aplication.properties).<br>
  <strong>4. Rodar o Frontend (HTML/CSS/JavaScript)</strong>:<br>
    • Certifique-se de ter o http-server instalado globalmente. Se não tiver, instale-o via npm (geralmente incluído com o Node.js):
  npm install -g http-server<br>
    • Navegue até a pasta que contém os arquivos do seu frontend (HTML, CSS, JavaScript). Esta pasta pode ser frontend, src/main/resources/static,
  se estiver empacotado com o Spring Boot. cd [caminho/para/sua/pasta/frontend].<br>
    • Inicia o servidor HTTP com o comando: http-server -c-1 --cors.<br>
    • Este comando iniciará um servidor HTTP local e exibirá (s) URL(s) de acesso no seu terminal (ex: http://127.0.0.1:8080). A opção --cors é
  essencial para permitir a comunicação correta com o backend.<br>
  <strong>5. Acessar a aplicação:</strong><br>
    • Com o backend e o frontend rodando, abra o seu navegador e acesse a URL forncedida pelo http-server no terminal
</p>
<h2>
  5. COMO USAR A APLICAÇÃO
</h2>
<p>
  O Conecta Aí foi desenvolvido pensando na simplicidade e facilidade de uso para você, cliente, encontrar o profissional de TI ideal sem complicação.
</p>
<h3>
  Acesso e Início:
</h3>
<p>
  1. Você pode acesssar o Conecta Aí através da URL fornecida pelo http-sever ao rodar a aplicação localmente<br>
  2. Para começar a utilizar a plataforma, você precisará fazer login ou realizar seu cadastro caso ainda não tenha uma conta
</p>
<h3>
  Encontrando o profissional ideal:
</h3>
<p>
  Após o login, siga estes passo para encontrar o profissional que você precisa:<br>
  1. Navegue até a página "Procurar Profissional".<br>
  2. Você será direcionado a uma página que exibe os profissionais disponíveis. Aqui, você encontrará uma barra de pesquisa e um sitema de filtragem
  por especialidade para refinar sua busca.<br>
  3. Utilize o campo de busca e os filtros para encontrar os profissioanis que correspondem aos seus critérios<br>
  4. Para obter mais detalhes sobre um profissional específico, clique na foto dele. Isso abrirá um perfil detalhado com suas qualificações, portfólio, 
  experiência e informações de contato.<br>
  5. A partir do perfil do profissional, você poderá entrar em contato diretamente via WhatsApp, facilitando a comunicação imediata.
</p>
<h2>
  8. CONTRIBUIÇÃO
</h2>
<p>
  O Conecta Aí é um projeto desenvolvido e mantido pela Conecta Aí Tech. Atualmente, não aceitamos contribuições externas para o código-fonte. 
  Agradecemos o interesse!
</p>
<h2>
  7. CONTATO
</h2>
<p>
  Para quaisquer dúvidas ou feedback sobre o Conecta Aí, por favor, entre em contato com a equipe da Conecta Aí Tech.<br>
    <strong>• Email:</strong> contatoluizamatos@gmail.com
</p>
