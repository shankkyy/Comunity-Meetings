import transition from '../../transition';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, CardFooter, Container, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './EventList.css';

function EventList() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://comunity-meetings-3.onrender.com/api/events/')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://comunity-meetings-3.onrender.com/api/events/delete/${id}`)
            .then(response => {
                setEvents(events.filter(event => event._id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleUpdate = (id) => {
        navigate(`update/${id}`);
    };

    return (
        <div>
            <div className="page-background"></div>
            <div className="overlay"></div>
            <Container className="container-content" style={{ marginTop: '20px' }}>
                <h2>Upcoming Events</h2>
                <div className="row">
                    {events.map(event => (
                        <div className="col-md-4" key={event._id} style={{ marginBottom: '20px' }}>
                            <Card className="card">
                                <CardBody>
                                    <CardTitle tag="h5">{event.title}</CardTitle>
                                    <CardText>{event.description}</CardText>
                                    <CardText><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</CardText>
                                    <CardText><strong>Time:</strong> {event.time}</CardText>
                                    <CardText><strong>Location:</strong> {event.location}</CardText>
                                    <CardText><strong>Organizer:</strong> {event.organizer}</CardText>
                                </CardBody>
                                <CardFooter>
                                    <CardText><strong>Attendees:</strong> {event.attendees.join(', ')}</CardText>
                                    <>
                                        <Button color="warning" onClick={() => handleUpdate(event._id)}>Update</Button>
                                        <Button color="danger" onClick={() => handleDelete(event._id)} style={{ marginLeft: '10px' }}>Delete</Button>
                                    </>
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default transition(EventList);
