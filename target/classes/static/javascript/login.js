http://localhost:8081/api/usuarios/login

function login() {
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Validação simples pra não enviar campos vazios
    if (!email || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    fetch('http://localhost:8081/api/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 401) {
            throw new Error('Email ou senha incorretos');
        } else {
            throw new Error('Erro no servidor');
        }
    })
    .then(data => {
        console.log('Login bem-sucedido:', data);

        // Salvando dados do usuário logado no localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify(data));

        // Redireciona pro menu
        window.location.href = 'menu.html';
    })
    .catch(error => {
        console.error('Erro:', error);
        alert(error.message);
    });
}
