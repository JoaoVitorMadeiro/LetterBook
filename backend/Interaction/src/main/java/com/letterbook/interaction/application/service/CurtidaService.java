package com.letterbook.interaction.application.service;

import com.letterbook.interaction.domain.model.CurtidaEntity;
import com.letterbook.interaction.domain.repository.CurtidaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class CurtidaService {

    private final CurtidaRepository curtidaRepository;

    public CurtidaService(CurtidaRepository curtidaRepository) {
        this.curtidaRepository = curtidaRepository;
    }

    @Transactional
    public boolean curtirOuDescurtir(UUID usuarioId, UUID avaliacaoId) {
        Optional<CurtidaEntity> curtidaExistente = curtidaRepository
            .findByUsuarioIdAndAvaliacaoId(usuarioId, avaliacaoId);

        if (curtidaExistente.isPresent()) {
            // Descurtir
            curtidaRepository.delete(curtidaExistente.get());
            return false;
        } else {
            // Curtir
            CurtidaEntity curtida = new CurtidaEntity();
            curtida.setUsuarioId(usuarioId);
            curtida.setAvaliacaoId(avaliacaoId);
            curtidaRepository.save(curtida);
            return true;
        }
    }

    public boolean verificarSeCurtiu(UUID usuarioId, UUID avaliacaoId) {
        return curtidaRepository.existsByUsuarioIdAndAvaliacaoId(usuarioId, avaliacaoId);
    }

    public Long contarCurtidas(UUID avaliacaoId) {
        return curtidaRepository.countByAvaliacaoId(avaliacaoId);
    }
}
