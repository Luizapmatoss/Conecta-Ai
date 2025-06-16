package com.conectaai.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.conectaai.backend.model.Usuario;
import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
    Optional<Usuario> findByEmail(String email);
    List<Usuario> findByNome(String nome);
}