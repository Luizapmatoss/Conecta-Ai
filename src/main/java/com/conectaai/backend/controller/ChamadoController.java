package com.conectaai.backend.controller;

import com.conectaai.backend.model.Chamado;
import com.conectaai.backend.service.ChamadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/chamados")
public class ChamadoController {

    @Autowired
    private ChamadoService chamadoService;
    
    @GetMapping
    public List<Chamado> listarTodos() {
        return chamadoService.listarTodos();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Chamado> buscarPorId(@PathVariable Integer id) {
        return chamadoService.buscarPorId(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Chamado criar(@RequestBody Chamado chamado) {
        return chamadoService.criar(chamado);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Chamado> atualizar(@PathVariable Integer id, @RequestBody Chamado dadosAtualizados) {
        return chamadoService.atualizar(id, dadosAtualizados)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        boolean deletado = chamadoService.deletar(id);
        return deletado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
