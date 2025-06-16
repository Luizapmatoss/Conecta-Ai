package com.conectaai.backend.controller;

import com.conectaai.backend.model.Feedback;
import com.conectaai.backend.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedbacks")
@CrossOrigin(origins = "*") 
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping
    public List<Feedback> listarFeedbacks() {
        return feedbackService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Feedback> buscarPorId(@PathVariable Integer id) {
        return feedbackService.buscarPorId(id);
    }

    @PostMapping
    public Feedback criarFeedback(@RequestBody Feedback feedback) {
        return feedbackService.criar(feedback);
    }

    @PutMapping("/{id}")
    public Feedback atualizarFeedback(@PathVariable Integer id, @RequestBody Feedback feedback) {
        return feedbackService.atualizar(id, feedback);
    }

    @DeleteMapping("/{id}")
    public void deletarFeedback(@PathVariable Integer id) {
        feedbackService.deletar(id);
    }
}
