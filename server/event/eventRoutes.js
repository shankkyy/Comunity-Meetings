const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();
const Event = require('./eventModel'); // Make sure the eventModel is correctly defined and exported

// Create a Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "shivv2403@gmail.com",
        pass: 223344,
    }
});

const sendEmails = (eventData) => {
    const { title, description, date, time, location, organizer, attendees } = eventData;
    const mailOptions = {
        from: "nishankverma24@gmail.com",
        to: attendees.join(', '),
        subject: `New Event: ${title}`,
        text: `Hello,

You have been invited to an event organized by ${organizer}.

Event Details:
Title: ${title}
Description: ${description}
Date: ${date}
Time: ${time}
Location: ${location}

We hope to see you there!

Best regards,
Event Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Get all events
router.get('/', (req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Create a new event
router.post('/add', (req, res) => {
    const newEvent = new Event(req.body);

    newEvent.save()
        .then(event => {
            sendEmails(event);
            res.json({ message: 'Event added!', event });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update an event using PUT
router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    Event.findByIdAndUpdate(id, updatedData, { new: true })
        .then(updatedEvent => {
            if (!updatedEvent) return res.status(404).json({ error: 'Event not found' });
            res.json(updatedEvent);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Delete an event
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    Event.findByIdAndDelete(id)
        .then(event => {
            if (!event) return res.status(404).json({ message: 'Event not found' });
            res.json({ message: 'Event successfully deleted' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
