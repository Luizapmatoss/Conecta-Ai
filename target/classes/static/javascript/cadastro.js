document.addEventListener('DOMContentLoaded', function () {
    const btnCadastro = document.getElementById('btncadastroc');

    btnCadastro.addEventListener('click', function () {
        // Pega os valores dos inputs
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const senha = document.getElementById('senha').value;

        // Validação simples (se quiser depois faço uma completa pra ti)
        if (!nome || !email || !telefone || !senha) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        // Monta o objeto que o back espera (igual ao seu model Usuario)
        const usuario = {
            nome: nome,
            email: email,
            telefone: telefone,
            senha: senha
        };

        // Envia pro backend
        fetch("http://localhost:8081/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao cadastrar usuário.");
                }
                return response.json();
            })
            .then(data => {
                alert("Usuário cadastrado com sucesso!");
                console.log(data);
                window.location.href = "login.html"; // leva pro login (se tiver)
            })
            .catch(error => {
                console.error("Erro:", error);
                alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
            });
    });
});
