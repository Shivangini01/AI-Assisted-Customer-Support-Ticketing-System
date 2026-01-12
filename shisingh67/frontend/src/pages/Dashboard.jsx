import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Plus, Check, RefreshCw, AlertCircle } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newTicket, setNewTicket] = useState({
        title: '',
        description: '',
        category: 'GENERAL_INQUIRY',
        priority: 'MEDIUM'
    });

    const isAdmin = user?.roles?.some(r => r.name === 'ROLE_ADMIN');

    const fetchTickets = async () => {
        try {
            const endpoint = isAdmin ? '/tickets' : '/tickets/my';
            const res = await api.get(endpoint);
            setTickets(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user) {
            fetchTickets();
        }
    }, [user]);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tickets', newTicket);
            setShowCreate(false);
            setNewTicket({
                title: '',
                description: '',
                category: 'GENERAL_INQUIRY',
                priority: 'MEDIUM'
            });
            fetchTickets(); // Refresh list
        } catch (err) {
            alert('Failed to create ticket');
        }
    };

    const handleStatusChange = async (ticketId, newStatus) => {
        // Optimistic Update: Update UI immediately
        const previousTickets = [...tickets];
        setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));

        try {
            await api.patch(`/tickets/${ticketId}/status`, null, { params: { status: newStatus } });
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Failed to update status");
            setTickets(previousTickets); // Revert on failure
        }
    };

    const getPriorityColor = (p) => {
        switch (p) {
            case 'HIGH': return 'red';
            case 'CRITICAL': return 'darkred';
            case 'MEDIUM': return 'orange';
            default: return 'green';
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1>{isAdmin ? 'All Tickets (Admin View)' : 'My Tickets'}</h1>
                {!isAdmin && (
                    <button onClick={() => setShowCreate(!showCreate)} style={styles.createBtn}>
                        <Plus size={16} style={{ marginRight: '5px' }} /> New Ticket
                    </button>
                )}
            </div>

            {showCreate && (
                <div style={styles.modal}>
                    <h3>Create New Ticket</h3>
                    <form onSubmit={handleCreate} style={styles.form}>
                        <input
                            placeholder="Title"
                            value={newTicket.title}
                            onChange={e => setNewTicket({ ...newTicket, title: e.target.value })}
                            style={styles.input} required
                        />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <select
                                value={newTicket.category}
                                onChange={e => setNewTicket({ ...newTicket, category: e.target.value })}
                                style={styles.select}
                            >
                                <option value="BILLING">Billing</option>
                                <option value="TECHNICAL">Technical</option>
                                <option value="FEATURE_REQUEST">Feature Request</option>
                                <option value="GENERAL_INQUIRY">General Inquiry</option>
                                <option value="OTHER">Other</option>
                            </select>
                            <select
                                value={newTicket.priority}
                                onChange={e => setNewTicket({ ...newTicket, priority: e.target.value })}
                                style={styles.select}
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                                <option value="CRITICAL">Critical</option>
                            </select>
                        </div>
                        <textarea
                            placeholder="Description"
                            rows="4"
                            value={newTicket.description}
                            onChange={e => setNewTicket({ ...newTicket, description: e.target.value })}
                            style={styles.input} required
                        />
                        <button type="submit" style={styles.submitBtn}>Submit Ticket</button>
                    </form>
                </div>
            )}

            <div style={styles.grid}>
                {tickets.map(ticket => (
                    <div key={ticket.id} style={styles.card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <strong style={{ fontSize: '1.1rem' }}>{ticket.title}</strong>
                            <span style={{ ...styles.badge, backgroundColor: getPriorityColor(ticket.priority) }}>{ticket.priority}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666' }}>
                            <span>#{ticket.id} • {ticket.category}</span>
                            {isAdmin && <span style={{ fontWeight: 'bold', color: '#007bff' }}>By: {ticket.createdBy}</span>}
                        </div>
                        <p style={{ color: '#555', margin: '10px 0' }}>{ticket.description.substring(0, 100)}...</p>
                        <div style={styles.meta}>
                            {isAdmin ? (
                                <select
                                    value={ticket.status}
                                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                                    style={styles.statusSelect}
                                >
                                    <option value="OPEN">OPEN</option>
                                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                                    <option value="RESOLVED">RESOLVED</option>
                                    <option value="CLOSED">CLOSED</option>
                                    <option value="ESCALATED">ESCALATED</option>
                                </select>
                            ) : (
                                <span style={{ fontWeight: 'bold', color: '#333' }}>{ticket.status}</span>
                            )}

                            <div style={{ display: 'flex', gap: '5px' }}>
                                {ticket.slaDueDate && (
                                    <span style={styles.slaBadge}>
                                        Due: {new Date(ticket.slaDueDate).toLocaleString()}
                                    </span>
                                )}
                                {ticket.aiSuggestedCategory && (
                                    <span style={styles.aiBadge}>AI: {ticket.aiSuggestedCategory}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    statusSelect: { padding: '5px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.85rem' },
    createBtn: { background: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'background 0.3s' },
    modal: { background: '#fff', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    input: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', width: '100%', boxSizing: 'border-box' },
    select: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', flex: 1, backgroundColor: 'white' },
    submitBtn: { background: '#28a745', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' },
    card: { padding: '1.5rem', border: '1px solid #eee', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', background: 'white', transition: 'transform 0.2s' },
    badge: { padding: '4px 10px', borderRadius: '20px', color: 'white', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' },
    meta: { marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f0f0f0', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    aiBadge: { background: '#e3f2fd', color: '#1565c0', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' },
    slaBadge: { background: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', border: '1px solid #ffeeba' },
    statusSelect: { padding: '5px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.85rem' }
};

export default Dashboard;
