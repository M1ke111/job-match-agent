package com.jobagent.backend;

import java.util.List;

public record UserProfile(
        String fullName,
        String currentRole,
        int yearsOfExperience,
        List<String> technicalSkills,
        List<String> softSkills
) {}