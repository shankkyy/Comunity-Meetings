import transition from '../../transition';
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Split the attendees string into an array
        const attendeesArray = eventData.attendees.split(',').map(attendee => attendee.trim());
        const dataToSubmit = { ...eventData, attendees: attendeesArray };

        axios.post('http://localhost:8000/api/events/add', dataToSubmit)
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
            })
            .catch(error => {
                console.error("There was an error creating the event!", error);
            });
    };

    return (
        <Container style={{ marginTop: '20px' }}>
            <h3>Create New Event</h3>
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
                <Button type="submit" color="primary">Create Event</Button>
            </Form>
        </Container>
    );
}

export default transition(CreateEvent);
