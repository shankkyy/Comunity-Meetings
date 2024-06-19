import React, { useState, useEffect } from 'react';
import transition from '../../transition';
import axios from 'axios';
import { Container, Form, FormGroup, Label, Input, Button, Card, CardBody, CardImg, CardText } from 'reactstrap';
import './Experiences.css';

const Experiences = () => {
    const [experienceData, setExperienceData] = useState({
        description: '',
        images: []
    });
    const [experiences, setExperiences] = useState(() => {
        // Load experiences from local storage if available
        const savedExperiences = localStorage.getItem('experiences');
        return savedExperiences ? JSON.parse(savedExperiences) : [];
    });

    useEffect(() => {
        // Save experiences to local storage whenever it changes
        localStorage.setItem('experiences', JSON.stringify(experiences));
    }, [experiences]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExperienceData({ ...experienceData, [name]: value });
    };

    const handleFileChange = (e) => {
        setExperienceData({ ...experienceData, images: e.target.files });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('description', experienceData.description);
        for (let i = 0; i < experienceData.images.length; i++) {
            formData.append('images', experienceData.images[i]);
        }

        axios.post('http://localhost:8000/api/experiences/add', formData)
            .then(response => {
                setExperiences([...experiences, response.data]);
                setExperienceData({
                    description: '',
                    images: []
                });
            })
            .catch(error => {
                console.error("There was an error sharing the experience!", error);
            });
    };

    return (
        <Container className="experiences-container">
            <div className="row">
                <div className="col-md-8">
                    <h1>We Are Here to Listen to Your Experiences</h1>
                    <div className="experience-grid">
                        {experiences.map((experience, index) => (
                            <Card className="experience-card" key={index}>
                                {experience.images.map((image, idx) => (
                                    <CardImg top key={idx} src={`http://localhost:8000/${image}`} alt="Experience image" />
                                ))}
                                <CardBody>
                                    <CardText>{experience.description}</CardText>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="input-card">
                        <Form className="experience-form" onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    id="description"
                                    value={experienceData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="images">Upload Images</Label>
                                <Input
                                    type="file"
                                    name="images"
                                    id="images"
                                    multiple
                                    onChange={handleFileChange}
                                    required
                                />
                            </FormGroup>
                            <Button type="submit" color="primary">Share Experience</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default transition(Experiences);
