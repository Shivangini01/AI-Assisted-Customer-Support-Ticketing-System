package com.support.system.ai.service;

import com.support.system.ticket.model.Ticket;
import com.support.system.ticket.repository.TicketRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.concurrent.CompletableFuture;

@Service
public class AIService {

    private final TicketRepository ticketRepository;

    public AIService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Async
    public CompletableFuture<Void> analyzeTicket(Long ticketId, String text) {
        try {
            // Simulate LLM latency
            Thread.sleep(2000);
            
            Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
            if (ticket != null) {
                // Mock AI Logic
                String suggestion = "GENERAL_INQUIRY";
                String priority = "LOW";
                String sentiment = "NEUTRAL";
                
                if (text.toLowerCase().contains("urgent") || text.toLowerCase().contains("fail") || text.toLowerCase().contains("error")) {
                    priority = "HIGH";
                    suggestion = "TECHNICAL";
                    sentiment = "NEGATIVE";
                } else if (text.toLowerCase().contains("invoice") || text.toLowerCase().contains("bill")) {
                    suggestion = "BILLING";
                }

                ticket.setAiSuggestedCategory(suggestion);
                ticket.setAiSuggestedPriority(priority);
                ticket.setAiSentiment(sentiment);
                
                ticketRepository.save(ticket);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        return CompletableFuture.completedFuture(null);
    }
}
