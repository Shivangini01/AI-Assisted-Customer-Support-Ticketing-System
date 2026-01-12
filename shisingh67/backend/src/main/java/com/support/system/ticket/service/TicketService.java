package com.support.system.ticket.service;

import com.support.system.ticket.model.Ticket;
import com.support.system.ticket.model.TicketStatus;
import com.support.system.ticket.repository.TicketRepository;
import com.support.system.ai.service.AIService;
import org.springframework.stereotype.Service;

import java.util.List;

import com.support.system.sla.service.SLAService;
// ... imports

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final AIService aiService;
    private final SLAService slaService;

    public TicketService(TicketRepository ticketRepository, AIService aiService, SLAService slaService) {
        this.ticketRepository = ticketRepository;
        this.aiService = aiService;
        this.slaService = slaService;
    }

    public Ticket createTicket(Ticket ticket, String username) {
        ticket.setCreatedBy(username);
        ticket.setStatus(TicketStatus.OPEN);
        ticket.setSlaDueDate(slaService.calculateSLA(ticket.getPriority()));
        
        Ticket savedTicket = ticketRepository.save(ticket);
        
        // Trigger Async AI Analysis
        aiService.analyzeTicket(savedTicket.getId(), savedTicket.getDescription());
        
        return savedTicket;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<Ticket> getMyTickets(String username) {
        return ticketRepository.findByCreatedBy(username);
    }

    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
    }

    public Ticket updateStatus(Long id, TicketStatus status) {
        Ticket ticket = getTicketById(id);
        ticket.setStatus(status);
        return ticketRepository.save(ticket);
    }
}
