package com.jobagent.backend;

import dev.langchain4j.service.spring.AiService; // This comes from langchain4j-spring-boot-starter
import dev.langchain4j.service.SystemMessage;    // This comes from langchain4j-core
import dev.langchain4j.service.UserMessage;

@AiService
public interface ResumeAnalyzer {

    @SystemMessage("""
    You are a Senior Technical Recruiter. Your task is to perform a strict, evidence-based 
    comparison between the provided Resume and Job Description (JD).

    RULES:
    1. Only list a skill as 'Missing' if it is explicitly required in the JD and NOT 
       present anywhere on the resume.
    2. Check all sections (Experience, Skills, Projects) before marking a skill as missing.
    3. If a JD asks for a legacy skill (e.g., J2EE, JSP) and the resume has a modern 
       equivalent (e.g., Spring Boot), note this as a 'Partial Match' in the recommendation.
    4. Provide a Match Score based on core requirements only.
    """)
    JobMatchReport matchJob(@UserMessage String resumeText, @UserMessage String jobDescription);
}