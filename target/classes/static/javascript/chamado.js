const API_URL = "http://localhost:8081/api/chamados";

// Carrega os chamados ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
    listarChamados();
});

// Listar todos os chamados
async function listarChamados() {
    try {
        const response = await fetch(API_URL);
        let chamados = await response.json();

        renderizarChamados(chamados);
    } catch (err) {
        console.error("Erro ao listar chamados:", err);
    }
}

// Renderiza os chamados na tela
function renderizarChamados(chamados) {
    const container = document.querySelector(".container");
    const antigos = document.querySelectorAll(".card");
    antigos.forEach(card => card.remove());

    chamados.forEach(chamado => {
        const card = document.createElement("div");
		const statusFormatado = chamado.status?.toLowerCase().replace(/\s+/g, "-"); 
        const statusExibido = chamado.status?.toUpperCase() || "ABERTO";

        card.classList.add("card");
        card.dataset.status = statusFormatado;
        card.onclick = () => abrirModalChamado(chamado);

        card.innerHTML = `
            <span class="status ${statusFormatado}">${statusExibido}</span>
            <div class="conteudo">
                <p class="titulo">${chamado.titulo}</p>
                <p class="tempo">${formatarData(chamado.dataAbertura)}</p>
                <span class="id">#${chamado.id}</span>
            </div>
        `;

        container.appendChild(card);
    });
}

// Formata a data (ex: "2025-06-06" → "06/06/2025")
function formatarData(dataStr) {
    const data = new Date(dataStr);
    return data.toLocaleDateString("pt-BR");
}

// Envia o form de novo chamado
async function criarChamado(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const data = document.getElementById("data").value;
    const descricao = document.getElementById("descricao").value;

    const chamadoData = {
        titulo,
        dataAbertura: data,
        descricao,
        status: "aberto"
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(chamadoData)
        });

        if (!response.ok) throw new Error("Erro ao criar chamado");

        const novoChamado = await response.json();
        fecharModalForm();
        listarChamados();
        exibirAlerta("Chamado criado com sucesso!", "sucesso");
    } catch (err) {
        console.error(err);
        exibirAlerta("Erro ao criar chamado", "erro");
    }
}

// Mostra o modal com detalhes do chamado
function abrirModalChamado(chamado) {
    document.getElementById("modal-titulo").textContent = chamado.titulo;
    document.getElementById("modal-id").textContent = chamado.id;
    document.getElementById("modal-status").textContent = chamado.status;
    document.getElementById("modal-tempo").textContent = formatarData(chamado.dataAbertura);
    document.getElementById("modal-descricao").textContent = chamado.descricao;

    document.getElementById("modal").classList.remove("hidden");
}

// Fecha o modal de detalhes
function fecharModal() {
    document.getElementById("modal").classList.add("hidden");
}

// Abre o form de novo chamado
document.querySelector(".novo-chamado").addEventListener("click", () => {
    document.getElementById("modal-form").style.display = "block";
});

// Fecha o form
function fecharModalForm() {
    document.getElementById("modal-form").style.display = "none";
    document.querySelector("form").reset();
}

// Exibe alerta
function exibirAlerta(msg, tipo) {
    const alerta = document.getElementById("alerta");
    alerta.textContent = msg;
    alerta.className = `alerta ${tipo}`;
    alerta.style.display = "block";
    setTimeout(() => alerta.style.display = "none", 3000);
}

// Filtros de pesquisa
function filtrarChamados(filtro) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const status = card.getAttribute('data-status');
        if (filtro === 'todos' || status === filtro) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}