package com.jobagent.backend;

import java.util.List;

public record JobMatchReport(
        int matchPercentage,
        List<String> matchingSkills,
        List<String> missingSkills,
        String recommendation
) {}