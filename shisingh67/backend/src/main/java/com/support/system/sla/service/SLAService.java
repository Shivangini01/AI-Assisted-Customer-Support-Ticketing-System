package com.support.system.sla.service;

import com.support.system.ticket.model.TicketPriority;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SLAService {

    public LocalDateTime calculateSLA(TicketPriority priority) {
        LocalDateTime now = LocalDateTime.now();
        switch (priority) {
            case CRITICAL:
                return now.plusHours(1);
            case HIGH:
                return now.plusHours(4);
            case MEDIUM:
                return now.plusHours(24);
            case LOW:
            default:
                return now.plusHours(48);
        }
    }
}
