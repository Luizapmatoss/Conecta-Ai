package com.conectaai.backend.controller;

import com.conectaai.backend.dto.UsuarioDTO;
import com.conectaai.backend.dto.LoginRequest;
import com.conectaai.backend.model.Usuario;
import com.conectaai.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Lista todos os usuários
    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    // Busca um usuário por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Integer id) {
        Optional<Usuario> usuario = usuarioService.buscarPorId(id);
        return usuario.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Cria um novo usuário
    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody UsuarioDTO dto) {
        try {
            Usuario usuario = new Usuario();
            usuario.setNome(dto.getNome());
            usuario.setEmail(dto.getEmail());
            usuario.setTelefone(dto.getTelefone());
            usuario.setSenha(dto.getSenha());
            usuario.setGenero(dto.getGenero());
            usuario.setEndereco(dto.getEndereco());
            usuario.setCep(dto.getCep());

            if (dto.getDataNascimento() != null && !dto.getDataNascimento().isEmpty()) {
                usuario.setDataNascimento(LocalDate.parse(dto.getDataNascimento()));
            }

            usuario.setCriadoEm(LocalDateTime.now());
            usuario.setAtualizadoEm(LocalDateTime.now());

            if (dto.getFoto() != null && !dto.getFoto().isEmpty()) {
                usuario.setFoto(dto.getFoto());
            }

            Usuario salvo = usuarioService.criar(usuario);
            return ResponseEntity.ok(salvo);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Atualiza um usuário por ID
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Integer id, @RequestBody UsuarioDTO dto) {
        try {
            Optional<Usuario> atualizado = usuarioService.atualizar(id, dto);

            return atualizado.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Deleta um usuário por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        try {
            usuarioService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Optional<Usuario> usuarioOptional = usuarioService.autenticar(loginRequest.getEmail(), loginRequest.getSenha());

            if (usuarioOptional.isPresent()) {
                Usuario usuarioAutenticado = usuarioOptional.get();
                usuarioAutenticado.setSenha(null);
                return ResponseEntity.ok(usuarioAutenticado); // Login bem-sucedido
            } else {
                // Credenciais inválidas
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha incorretos");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno do servidor durante o login.");
        }
    }
}