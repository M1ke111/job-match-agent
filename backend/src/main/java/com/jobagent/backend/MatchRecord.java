package com.jobagent.backend;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "match_history")
@Data
public class MatchRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private int matchPercentage;

    @Column(columnDefinition = "TEXT")
    private String recommendation;

    private LocalDateTime createdAt = LocalDateTime.now();
}