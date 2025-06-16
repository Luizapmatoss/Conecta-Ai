document.addEventListener("DOMContentLoaded", function () {
    const nomeEl = document.getElementById("nome");
    const bioEl = document.getElementById("bio");
    const emailEl = document.getElementById("email");
    const cidadeEl = document.getElementById("cidade");
    const telefoneEl = document.getElementById("telefone");
    const botaoEditar = document.getElementById("editarPerfil");

    const dadosSalvos = JSON.parse(localStorage.getItem("perfilUsuario"));

    if (dadosSalvos) {
        nomeEl.textContent = dadosSalvos.nome;
        bioEl.textContent = dadosSalvos.bio;
        emailEl.textContent = dadosSalvos.email;
        cidadeEl.textContent = dadosSalvos.cidade;
        telefoneEl.textContent = dadosSalvos.telefone;
    }

    botaoEditar.addEventListener("click", () => {
        const novoNome = prompt("Digite seu nome:", nomeEl.textContent);
        const novaBio = prompt("Digite sua bio:", bioEl.textContent);
        const novoEmail = prompt("Digite seu email:", emailEl.textContent);
        const novaCidade = prompt("Digite sua cidade:", cidadeEl.textContent);
        const novoTelefone = prompt("Digite seu telefone:", telefoneEl.textContent);

        if (novoNome) nomeEl.textContent = novoNome;
        if (novaBio) bioEl.textContent = novaBio;
        if (novoEmail) emailEl.textContent = novoEmail;
        if (novaCidade) cidadeEl.textContent = novaCidade;
        if (novoTelefone) telefoneEl.textContent = novoTelefone;

        // Salvar no localStorage
        const dadosAtualizados = {
            nome: nomeEl.textContent,
            bio: bioEl.textContent,
            email: emailEl.textContent,
            cidade: cidadeEl.textContent,
            telefone: telefoneEl.textContent,
        };

        localStorage.setItem("perfilUsuario", JSON.stringify(dadosAtualizados));
    });
});

const fotoInput = document.getElementById('fotoInput');
const fotoPreview = document.getElementById('fotoPreview');

fotoInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            fotoPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

const modal = document.getElementById("editModal");
const abrirModalBtn = document.getElementById("editarPerfilBtn");
const fecharModal = document.querySelector(".close");
const salvarBtn = document.getElementById("salvarBtn");

abrirModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

fecharModal.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
};

salvarBtn.addEventListener("click", () => {
    document.getElementById("nomeTexto").innerText = document.getElementById("nomeInput").value;
    document.getElementById("emailTexto").innerText = document.getElementById("emailInput").value;
    document.getElementById("cidadeTexto").innerText = document.getElementById("cidadeInput").value;
    document.getElementById("telefoneTexto").innerText = document.getElementById("telefoneInput").value;

    modal.style.display = "none";
});
