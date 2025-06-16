const profissionais = [
    { nome: "Ana Costa", especialidade: "Redes", estado: "São Paulo - SP", experiencia: "4 anos", 
        descricao: "Especialista em configuração de redes corporativas e suporte a infraestrutura de rede em empresas de médio porte.", 
        imagem: "foto1.jpg" },
    { nome: "Carlos Souza", especialidade: "Hardware", estado: "Rio de Janeiro - RJ", experiencia: "6 anos", 
        descricao: "Técnico de hardware com amplo conhecimento em manutenção preventiva e corretiva de desktops e notebooks.", 
        imagem: "foto2.jpg" },
    { nome: "Julia Dias", especialidade: "Software", estado: "Belo Horizonte - MG", experiencia: "3 anos", 
        descricao: "Desenvolvedora full stack apaixonada por soluções criativas. Atua com web apps e sistemas de gestão.", 
        imagem: "foto3.jpg" },
    { nome: "Lucas Silva", especialidade: "Redes", estado: "Curitiba - PR", experiencia: "5 anos", 
        descricao: "Profissional certificado em redes com experiência em cabeamento estruturado e configuração de roteadores.", 
        imagem: "foto4.jpg" },
    { nome: "João Mendes", especialidade: "Seguranca", estado: "Salvador - BA", experiencia: "7 anos", 
        descricao: "Especialista em segurança da informação, com foco em proteção de dados, firewalls e políticas de segurança.", 
        imagem: "foto5.jpg" },
    { nome: "Pedro Lima", especialidade: "Impressora", estado: "Recife - PE", experiencia: "4 anos", 
        descricao: "Técnico em manutenção de impressoras, atuando com modelos jato de tinta, laser e multifuncionais.", 
        imagem: "foto6.jpg" },
    { nome: "Mariana Carneiro", especialidade: "Hardware", estado: "Florianópolis - SC", experiencia: "2 anos", 
        descricao: "Técnica dedicada à montagem e upgrades de computadores, com foco em atendimento ao cliente doméstico.", 
        imagem: "foto7.jpg" },
    { nome: "Felipe Luiz", especialidade: "Hardware", estado: "Porto Alegre - RS", experiencia: "5 anos", 
        descricao: "Profissional experiente em diagnóstico de hardware e instalação de componentes em ambiente corporativo.", 
        imagem: "foto8.jpg" },
];

const container = document.getElementById('profissionais');
const searchInput = document.getElementById('searchInput');
const especialidadeSelect = document.getElementById('especialidadeSelect');

function renderizarCards(filtroNome = "", filtroEspecialidade = "") {
    container.innerHTML = "";

    const filtrados = profissionais.filter(prof => {
        const nomeCond = prof.nome.toLowerCase().includes(filtroNome.toLowerCase());
        const espCond = !filtroEspecialidade || prof.especialidade === filtroEspecialidade;
        return nomeCond && espCond;
    });

    filtrados.forEach(prof => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="src/${prof.imagem}" alt="Foto de ${prof.nome}" class="card-img"/>
            <h3>${prof.nome}</h3>
            <p>${prof.especialidade}</p>
        `;

        card.addEventListener('click', () => {
            abrirModal(prof);
        });

        container.appendChild(card);
    });
}

searchInput.addEventListener('input', () => {
    renderizarCards(searchInput.value, especialidadeSelect.value);
});

especialidadeSelect.addEventListener('change', () => {
    renderizarCards(searchInput.value, especialidadeSelect.value);
});

renderizarCards();

function abrirModal(prof) {
    document.getElementById('modal-nome').textContent = prof.nome;
    document.getElementById('modal-especialidade').textContent = prof.especialidade;
    document.getElementById('modal-estado').textContent = prof.estado || "Não informado";
    document.getElementById('modal-experiencia').textContent = prof.experiencia || "Não informado";
    document.getElementById('modal-descricao').textContent = prof.descricao || "Sem descrição";
    document.getElementById('modal-foto').src = `src/${prof.imagem}`;
    document.getElementById('modal').classList.remove('hidden');
}

function fecharModal() {
    document.getElementById('modal').classList.add('hidden');
}
