package com.conectaai.backend.repository;

import com.conectaai.backend.model.Chamado;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface ChamadoRepository extends JpaRepository<Chamado, Integer> {
    List<Chamado> findByTitulo(String titulo);
    List<Chamado> findByDescricao(String descricao);
}
