package com.jobagent.backend;

import dev.langchain4j.service.spring.AiService; // This comes from langchain4j-spring-boot-starter
import dev.langchain4j.service.SystemMessage;    // This comes from langchain4j-core
import dev.langchain4j.service.UserMessage;

@AiService
public interface ResumeAnalyzer {

    @SystemMessage("You are a professional technical recruiter. Analyze the resume text and extract the structured data.")
    UserProfile analyzeResume(@UserMessage String resumeText);
}