package com.conectaai.backend.service;

import com.conectaai.backend.model.Chamado;
import com.conectaai.backend.repository.ChamadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChamadoService {

    @Autowired
    private ChamadoRepository chamadoRepository;

    public List<Chamado> listarTodos() {
        return chamadoRepository.findAll();
    }

    public Optional<Chamado> buscarPorId(Integer id) {
        return chamadoRepository.findById(id);
    }

    public Chamado criar(Chamado chamado) {
        if (chamado.getDataAbertura() == null) {
            chamado.setDataAbertura(LocalDate.now());
        }

        if (chamado.getStatus() == null || chamado.getStatus().isBlank()) {
            chamado.setStatus("aberto");
        }

        chamado.setCriadoEm(LocalDateTime.now());
        chamado.setAtualizadoEm(LocalDateTime.now());

        return chamadoRepository.save(chamado);
    }


    public Optional<Chamado> atualizar(Integer id, Chamado dadosAtualizados) {
        return chamadoRepository.findById(id).map(chamado -> {
            chamado.setTitulo(dadosAtualizados.getTitulo());
            chamado.setDescricao(dadosAtualizados.getDescricao());
            chamado.setAtualizadoEm(LocalDateTime.now());
            return chamadoRepository.save(chamado);
        });
    }

    public boolean deletar(Integer id) {
        if (chamadoRepository.existsById(id)) {
            chamadoRepository.deleteById(id);
            return true;
        }
        return false;
    }
   
}
