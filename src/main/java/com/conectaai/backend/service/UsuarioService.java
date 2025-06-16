package com.conectaai.backend.service;

import com.conectaai.backend.dto.UsuarioDTO;
import com.conectaai.backend.model.Usuario;
import com.conectaai.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Listar todos os usuários
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    // Buscar usuário por ID
    public Optional<Usuario> buscarPorId(Integer id) {
        return usuarioRepository.findById(id);
    }

    // Criar novo usuário
    public Usuario criar(Usuario usuario) {
        usuario.setCriadoEm(LocalDateTime.now());
        usuario.setAtualizadoEm(LocalDateTime.now());
        return usuarioRepository.save(usuario);
    }

    // Atualizar usuário existente
    public Optional<Usuario> atualizar(Integer id, UsuarioDTO dto) {
        Optional<Usuario> optionalExistente = usuarioRepository.findById(id);

        if (optionalExistente.isEmpty()) {
            return Optional.empty(); // Usuário não encontrado
        }

        Usuario existente = optionalExistente.get();

        // Verificar e-mail duplicado, exceto se for o próprio usuário
        if (dto.getEmail() != null && !dto.getEmail().isEmpty() && !existente.getEmail().equalsIgnoreCase(dto.getEmail())) {
            Optional<Usuario> emailExistente = usuarioRepository.findByEmail(dto.getEmail());
            if (emailExistente.isPresent() && !emailExistente.get().getId().equals(existente.getId())) {
                throw new RuntimeException("Este e-mail já está em uso por outro usuário.");
            }
        }

        // Atualizar os campos do usuário existente usando os dados do DTO
        if (dto.getNome() != null && !dto.getNome().isEmpty()) {
            existente.setNome(dto.getNome());
        }
        if (dto.getEmail() != null && !dto.getEmail().isEmpty()) {
            existente.setEmail(dto.getEmail());
        }
        if (dto.getTelefone() != null && !dto.getTelefone().isEmpty()) {
            existente.setTelefone(dto.getTelefone());
        }

        if (dto.getSenha() != null && !dto.getSenha().isEmpty()) {
            existente.setSenha(dto.getSenha());
        }
        if (dto.getGenero() != null && !dto.getGenero().isEmpty()) {
            existente.setGenero(dto.getGenero());
        }
        if (dto.getCep() != null && !dto.getCep().isEmpty()) {
            existente.setCep(dto.getCep());
        }

        if (dto.getEndereco() != null && !dto.getEndereco().isEmpty()) {
            if (!dto.getEndereco().equals(existente.getEndereco())) {
                existente.setEndereco(dto.getEndereco());
            }
        } else {

        }


        // Conversão e atualização da Data de Nascimento
        if (dto.getDataNascimento() != null && !dto.getDataNascimento().isEmpty()) {
            try {
                existente.setDataNascimento(LocalDate.parse(dto.getDataNascimento()));
            } catch (java.time.format.DateTimeParseException e) {
                throw new RuntimeException("Formato de data de nascimento inválido. Use 'yyyy-MM-dd'.", e);
            }
        } else {

        }

        if (dto.getFoto() != null && !dto.getFoto().isEmpty()) {
            String fotoBase64Pura = dto.getFoto();

            if (fotoBase64Pura.startsWith("data:image/")) {
                int commaIndex = fotoBase64Pura.indexOf(',');
                if (commaIndex != -1) {
                    fotoBase64Pura = fotoBase64Pura.substring(commaIndex + 1);
                }
            }
            existente.setFoto(fotoBase64Pura);
        } else {

        }

        existente.setAtualizadoEm(LocalDateTime.now());

        return Optional.of(usuarioRepository.save(existente));
    }

    // Deletar usuário
    public void deletar(Integer id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado com o id: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    // Buscar por e-mail
    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public Optional<Usuario> autenticar(String email, String senha) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);

        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            if (usuario.getSenha() != null && usuario.getSenha().equals(senha)) {
                return Optional.of(usuario);
            }
        }

        return Optional.empty();
    }

    public Usuario salvar(Usuario usuario) {
        return usuario;
    }
}