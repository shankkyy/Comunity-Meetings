import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Card } from 'reactstrap';
import transition from '../../Transition';

function CreateEvent() {
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        organizer: '',
        attendees: ''
    });

    const [latestEvent, setLatestEvent] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const attendeesArray = eventData.attendees.split(',').map(attendee => attendee.trim());
        const dataToSubmit = { ...eventData, attendees: attendeesArray };

        axios.post('https://comunity-meetings-3.onrender.com/api/events/add', dataToSubmit)
            .then(response => {
                console.log(response.data);
                setEventData({
                    title: '',
                    description: '',
                    date: '',
                    time: '',
                    location: '',
                    organizer: '',
                    attendees: ''
                });
                fetchLatestEvent();  // Fetch the latest event after creating a new one
            })
            .catch(error => {
                console.error("There was an error creating the event!", error);
            });
    };

    const fetchLatestEvent = () => {
        axios.get('https://comunity-meetings-3.onrender.com/api/events/latest')
            .then(response => {
                setLatestEvent(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the latest event!", error);
            });
    };

    useEffect(() => {
        fetchLatestEvent();
    }, []);

    return (
        <div style={styles.outerCard}>
            <Card style={styles.cardContent}>
                <h3 className="text-center">Create New Event</h3>
                {latestEvent && (
                    <div style={styles.latestEvent}>
                        <h4>Latest Event</h4>
                        <p><strong>Title:</strong> {latestEvent.title}</p>
                        <p><strong>Description:</strong> {latestEvent.description}</p>
                        <p><strong>Date:</strong> {latestEvent.date}</p>
                        <p><strong>Time:</strong> {latestEvent.time}</p>
                        <p><strong>Location:</strong> {latestEvent.location}</p>
                        <p><strong>Organizer:</strong> {latestEvent.organizer}</p>
                        <p><strong>Attendees:</strong> {latestEvent.attendees.join(', ')}</p>
                    </div>
                )}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            value={eventData.title}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                            type="textarea"
                            name="description"
                            id="description"
                            value={eventData.description}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="date">Date</Label>
                        <Input
                            type="date"
                            name="date"
                            id="date"
                            value={eventData.date}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="time">Time</Label>
                        <Input
                            type="time"
                            name="time"
                            id="time"
                            value={eventData.time}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="location">Location</Label>
                        <Input
                            type="text"
                            name="location"
                            id="location"
                            value={eventData.location}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="organizer">Organizer</Label>
                        <Input
                            type="text"
                            name="organizer"
                            id="organizer"
                            value={eventData.organizer}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="attendees">Attendees</Label>
                        <Input
                            type="text"
                            name="attendees"
                            id="attendees"
                            value={eventData.attendees}
                            onChange={handleChange}
                            placeholder="Enter attendees separated by commas"
                        />
                    </FormGroup>
                    <Button type="submit" color="primary" block>Create Event</Button>
                </Form>
            </Card>
        </div>
    );
}

const styles = {
    outerCard: {
        margin: 0,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    cardContent: {
        width: '100%',
        maxWidth: '600px',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        background: '#f9f9f9',
    },
    latestEvent: {
        marginBottom: '20px',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        background: '#fff',
    }
};

export default transition(CreateEvent);
