package com.jobagent.backend.controller;

import com.jobagent.backend.ResumeAnalyzer; // Import your interface
import com.jobagent.backend.UserProfile;    // Import your record
import org.apache.tika.Tika;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:5174")
public class ResumeController {

    private final Tika tika = new Tika();
    private final ResumeAnalyzer resumeAnalyzer; // Declare the AI Service

    // Constructor Injection (Best Practice)
    public ResumeController(ResumeAnalyzer resumeAnalyzer) {
        this.resumeAnalyzer = resumeAnalyzer;
    }

    @PostMapping("/upload")
    public ResponseEntity<UserProfile> uploadResume(@RequestParam("file") MultipartFile file) {
        try {
            // 1. Extract Text
            String parsedText = tika.parseToString(file.getInputStream());

            // 2. Ask AI to analyze it
            System.out.println("Sending to OpenAI...");
            UserProfile profile = resumeAnalyzer.analyzeResume(parsedText);

            // 3. Return the structured JSON to the frontend
            return ResponseEntity.ok(profile);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}