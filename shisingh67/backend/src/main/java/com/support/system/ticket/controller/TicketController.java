package com.support.system.ticket.controller;

import com.support.system.ticket.model.Ticket;
import com.support.system.ticket.model.TicketStatus;
import com.support.system.ticket.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket, Authentication authentication) {
        return ResponseEntity.ok(ticketService.createTicket(ticket, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    @GetMapping("/my")
    public ResponseEntity<List<Ticket>> getMyTickets(Authentication authentication) {
        return ResponseEntity.ok(ticketService.getMyTickets(authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicket(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.getTicketById(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Ticket> updateStatus(@PathVariable Long id, @RequestParam TicketStatus status) {
        return ResponseEntity.ok(ticketService.updateStatus(id, status));
    }
}
