const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();
const Event = require('./eventModel');

// Get all events
router.get('/', (req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Create a new event
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nishankverma24@gmail.com', // Your email
        pass: '23456' // l password
    }
});

const sendEmails = (eventData) => {
    const { title, description, date, time, location, organizer, attendees } = eventData;
    const mailOptions = {
        from: 'your-email@gmail.com',
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


router.post('/add', (req, res) => {
    const newEvent = new Event(req.body);
    const savedEvent = {
        ...newEvent,
        id: Date.now() // Mock event ID
    };

    // Send emails to attendees
    sendEmails(savedEvent);
    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update an event using PUT
router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    Event.findByIdAndUpdate(id, updatedData, { new: true })
        .then(updatedEvent => {
            if (!updatedEvent) return res.status(404).json('Event not found');
            res.json(updatedEvent);
        })
        .catch(err => res.status(500).json('Error: ' + err));
});

// Delete an event
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    Event.findByIdAndDelete(id)
        .then(event => {
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.json({ message: 'Event successfully deleted' });
        })
        .catch(err => res.status(500).json({ error: 'Error: ' + err }));
});

module.exports = router;
