package com.jobagent.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchRepository extends JpaRepository<MatchRecord, Long> {
    // Spring Data JPA automatically provides save(), findAll(), delete(), etc.
}