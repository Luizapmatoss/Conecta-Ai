package com.conectaai.backend.service;

import com.conectaai.backend.model.Feedback;
import com.conectaai.backend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> listarTodos() {
        return feedbackRepository.findAll();
    }

    public Optional<Feedback> buscarPorId(Integer id) {
        return feedbackRepository.findById(id);
    }

    public Feedback criar(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Feedback atualizar(Integer id, Feedback dadosAtualizados) {
        Feedback existente = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback não encontrado!"));

        existente.setNome(dadosAtualizados.getNome());
        existente.setAvaliacao(dadosAtualizados.getAvaliacao());
        existente.setDescricao(dadosAtualizados.getDescricao());
        existente.setDataFeedback(dadosAtualizados.getDataFeedback());

        return feedbackRepository.save(existente);
    }

    public void deletar(Integer id) {
        if (!feedbackRepository.existsById(id)) {
            throw new RuntimeException("Feedback com ID " + id + " não encontrado.");
        }
        feedbackRepository.deleteById(id);
    }
}
