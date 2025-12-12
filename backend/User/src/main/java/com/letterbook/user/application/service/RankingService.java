package com.letterbook.user.application.service;

import com.letterbook.user.api.dto.UserRankingResponse;
import com.letterbook.user.domain.model.UserEntity;
import com.letterbook.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final UserRepository userRepository;
    // In a real scenario, you'd inject services/repositories from other modules
    // to fetch data like books read, reviews count, etc.
    // private final LivroService livroService; (from catalogo module)
    // private final AvaliacaoService avaliacaoService; (from interaction module)


    @Transactional(readOnly = true)
    public Page<UserRankingResponse> getGlobalUserRanking(Pageable pageable) {
        // This is a simplified example.
        // In a real application, this would involve complex queries
        // across multiple services/databases to aggregate user activity data.

        // For demonstration, let's just get all users and assign some dummy scores.
        List<UserEntity> allUsers = userRepository.findAll();

        List<UserRankingResponse> rankingList = allUsers.stream()
            .map(user -> {
                // Simulate activity data
                long booksRead = user.getId().toString().length() * 10L; // Dummy logic
                long reviewsCount = user.getId().toString().length() * 2L; // Dummy logic
                long totalScore = (booksRead * 5) + (reviewsCount * 10); // Dummy score calculation

                return UserRankingResponse.builder()
                    .userId(user.getId())
                    .userName(user.getNome())
                    .avatarUrl(user.getFotoUrl())
                    .booksRead(booksRead)
                    .reviewsCount(reviewsCount)
                    .totalScore(totalScore)
                    .build();
            })
            .sorted(Comparator.comparing(UserRankingResponse::getTotalScore).reversed()) // Sort by score
            .collect(Collectors.toList());

        // Manual pagination
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), rankingList.size());
        List<UserRankingResponse> paginatedRanking = rankingList.subList(start, end);

        return new PageImpl<>(paginatedRanking, pageable, rankingList.size());
    }
}
