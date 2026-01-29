package com.jobagent.backend.controller;

import com.jobagent.backend.*;
import org.apache.tika.Tika;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:5174")
public class ResumeController {

    private final Tika tika = new Tika();
    private final ResumeAnalyzer resumeAnalyzer;
    private final MatchRepository matchRepository;// Declare the AI Service

    // Constructor Injection (Best Practice)
    public ResumeController(ResumeAnalyzer resumeAnalyzer, MatchRepository matchRepository) {
        this.resumeAnalyzer = resumeAnalyzer;
        this.matchRepository = matchRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<JobMatchReport> uploadAndMatch(
            @RequestParam("file") MultipartFile file,
            @RequestParam("jd") String jd) { // Accepts the text area content
        try {
            // 1. Get Resume Text
            String resumeText = tika.parseToString(file.getInputStream());

            // 2. Ask AI to compare
            JobMatchReport report = resumeAnalyzer.matchJob(resumeText, jd);

            // 3. SAVE TO DATABASE
            MatchRecord record = new MatchRecord();
            record.setFileName(file.getOriginalFilename());
            record.setMatchPercentage(report.matchPercentage());
            record.setRecommendation(report.recommendation());

            matchRepository.save(record);

            return ResponseEntity.ok(report);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // This completes the path: /api/resume/history
    @GetMapping("/history")
    public ResponseEntity<List<MatchRecord>> getHistory() {
        try {
            // Fetch all records from the match_history table via JPA
            List<MatchRecord> history = matchRepository.findAll();
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            // Log the error so you can see it in the IntelliJ console
            System.err.println("Error fetching history: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/history/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable Long id) {
        try {
            matchRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}