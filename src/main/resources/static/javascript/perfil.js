// Verifica se o usuário está logado
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
  alert("Você precisa estar logado!");
  window.location.href = "login.html";
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nome").value = usuarioLogado.nome || '';
  document.getElementById("email").value = usuarioLogado.email || '';
  document.getElementById("telefone").value = usuarioLogado.telefone || '';
  document.getElementById("senha").value = usuarioLogado.senha || '';
  document.getElementById("dataNascimento").value = usuarioLogado.dataNascimento || '';
  document.getElementById("genero").value = usuarioLogado.genero || '';
  document.getElementById("endereco").value = usuarioLogado.endereco || '';
  document.getElementById("cep").value = usuarioLogado.cep || '';

  if (usuarioLogado.foto) {
    // Assumimos que a foto é JPEG. Se for outro tipo, você precisaria de uma forma de detectá-lo.
    document.getElementById("profile-image").src = `data:image/jpeg;base64,${usuarioLogado.foto}`;
  } else {
    // Opcional: Definir uma imagem padrão se não houver foto
    document.getElementById("profile-image").src = "caminho/para/imagem-padrao.png"; // Altere para um placeholder real
  }
});

// Seletores
const editBtn = document.getElementById('edit-profile');
const saveBtn = document.getElementById('save-changes');
const inputs = document.querySelectorAll('input, select, textarea');
const profileImage = document.getElementById('profile-image');
const photoUpload = document.getElementById('photo-upload');
const form = document.getElementById('perfil-form');

let novaFotoBase64 = null;

// Habilita edição
editBtn.addEventListener('click', () => {
  inputs.forEach(input => {
    input.disabled = false;
    input.classList.add('bg-blue-50');
  });

  editBtn.classList.add('hidden');
  saveBtn.classList.remove('hidden');
});

// Atualiza a variável com a foto em base64 quando seleciona nova imagem
photoUpload.addEventListener('change', e => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    if (file.size > 2 * 1024 * 1024) {
      alert("Imagem muito grande. Escolha uma com até 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = event => {
      novaFotoBase64 = event.target.result; // event.target.result JÁ É UM DATA URI (ex: data:image/jpeg;base64,...)
      profileImage.src = novaFotoBase64; // Exibe a nova foto temporariamente (com o prefixo)
    };
    reader.readAsDataURL(file);
  }
});

// Salva alterações
saveBtn.addEventListener('click', () => {
  inputs.forEach(input => {
    input.disabled = true;
    input.classList.remove('bg-blue-50');
  });

  saveBtn.classList.add('hidden');
  editBtn.classList.remove('hidden');

  const dataNascRaw = document.getElementById("dataNascimento").value;
  const dataNascimento = dataNascRaw ? new Date(dataNascRaw).toISOString().split('T')[0] : null;

  function limpaBase64(base64String) {
    if (!base64String) return null;
    const base64Index = base64String.indexOf('base64,');
    return base64Index >= 0 ? base64String.substring(base64Index + 7) : base64String;
  }

  const usuarioAtualizado = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    senha: document.getElementById("senha").value,
    dataNascimento: dataNascimento,
    genero: document.getElementById("genero").value,
    endereco: document.getElementById("endereco").value,
    cep: document.getElementById("cep").value,
    foto: limpaBase64(novaFotoBase64 || profileImage.src)
  };

  fetch(`http://192.168.100.70:8081/api/usuarios/${usuarioLogado.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuarioAtualizado)
  })
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => { throw new Error(`Erro ao atualizar usuário: ${text}`); });
        }
        return res.json();
      })
      .then(usuarioAtualizadoBackend => {
        alert("Alterações salvas com sucesso!");

        if (usuarioAtualizadoBackend.foto) {
          usuarioAtualizadoBackend.foto = usuarioAtualizadoBackend.foto;
          profileImage.src = `data:image/jpeg;base64,${usuarioAtualizadoBackend.foto}`; // Assumimos JPEG
        } else {
          profileImage.src = "caminho/para/imagem-padrao.png";
        }

        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizadoBackend));

        novaFotoBase64 = null;
      })
      .catch(err => {
        console.error(err);
        alert("Erro ao salvar as alterações: " + err.message);
      });
});

// Trocar foto
document.getElementById('change-photo').addEventListener('click', () => {
  photoUpload.click();
});

// Toggle visibilidade da senha
const senhaInput = document.getElementById('senha');
const senhaToggleBtn = senhaInput.nextElementSibling;

senhaToggleBtn.addEventListener('click', () => {
  if (senhaInput.type === 'password') {
    senhaInput.type = 'text';
    senhaToggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    senhaInput.type = 'password';
    senhaToggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
  }
});

// Menu mobile
const menuToggle = document.getElementById('menu-toggle');
const overlay = document.querySelector('.overlay');

if (menuToggle && overlay) {
  menuToggle.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('open');
    overlay.classList.toggle('open');
  });

  overlay.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.remove('open');
    overlay.classList.remove('open');
  });
}