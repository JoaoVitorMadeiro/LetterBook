package com.letterbook.user.api.dto;

import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class UserRankingResponse {
    UUID userId;
    String userName;
    String avatarUrl;
    Long booksRead;
    Long reviewsCount;
    Long totalScore; // A combined score based on various activities
}
