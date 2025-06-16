const API_URL = "http://192.168.100.70:8081/api/feedbacks";

// Carrega os feedbacks ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
    listarFeedbacks();
});

// Abre a tela do formulário
document.querySelector('.novo-feedback').addEventListener('click', () => {
    document.getElementById('modal-form').style.display = 'block';
});

// Fecha a tela do formulário
function fecharModalForm() {
    document.getElementById('modal-form').style.display = 'none';
    document.querySelector('form').reset();
}

// Lista os feedbacks do backend
async function listarFeedbacks() {
    try {
        const container = document.querySelector('#lista-feedbacks');
        container.innerHTML = "";

        const response = await fetch(API_URL);
        const feedbacks = await response.json();

        feedbacks.forEach(feedback => {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-descricao', feedback.descricao);
            card.onclick = () => abrirModal(card);

            card.innerHTML = `
                <div class="avaliacao">
                    <span class="estrelas">${'★'.repeat(feedback.avaliacao)}${'☆'.repeat(5 - feedback.avaliacao)}</span>
                </div>
                <div class="conteudo">
                    <p class="titulo">${feedback.nome}</p>
                    <p class="tempo">${formatarData(feedback.dataFeedback)}</p>
                    <p class="descricao">"${feedback.descricao}"</p>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (err) {
        console.error("Erro ao carregar feedbacks:", err);
        alert("Erro ao carregar feedbacks.");
    }
}

// Cria um novo feedback
function criarFeedback(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const descricao = document.getElementById('descricao').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value || "0";

    const feedbackData = {
        nome,
        descricao,
        avaliacao: parseInt(rating),
        dataFeedback: data,
        usuario: {
            id: 1 // ✅ Troque isso para o ID correto do usuário logado
        }
    };

    console.log("Enviando feedback:", feedbackData); // 🛠️ Ajuda a debugar no console

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData)
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao enviar feedback");
        return response.json();
    })
    .then(data => {
        console.log("Feedback enviado com sucesso:", data);
        fecharModalForm();
        listarFeedbacks();
        mostrarMensagemSucesso();
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao enviar o feedback. Verifique o console.");
    });
}

// Mostra o alerta de sucesso
function mostrarMensagemSucesso() {
    const msg = document.getElementById('mensagem-sucesso');
    msg.classList.remove('hidden');

    setTimeout(() => {
        msg.classList.add('hidden');
    }, 3000);
}

// Formata a data para "Hoje", "Ontem" ou "dd/mm/aaaa"
function formatarData(dataStr) {
    const data = new Date(dataStr);
    const hoje = new Date();
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);

    if (data.toDateString() === hoje.toDateString()) return "Hoje";
    if (data.toDateString() === ontem.toDateString()) return "Ontem";

    return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
}

// Abre o modal com os detalhes do feedback
function abrirModal(card) {
    const titulo = card.querySelector('.titulo')?.innerText || "Sem título";
    const tempo = card.querySelector('.tempo')?.innerText || "Sem data";
    const descricao = card.getAttribute('data-descricao') || 'Sem descrição';

    document.getElementById('modal-titulo').innerText = titulo;
    document.getElementById('modal-tempo').innerText = tempo;
    document.getElementById('modal-descricao').innerText = descricao;

    document.getElementById('modal').classList.remove('hidden');
}