const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Event = require('./eventModel');

const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'nishankv24@gmail.com',
        pass: 'nohcvthimyxvjwbh'
    }
};
const transporter = nodemailer.createTransport(smtpConfig);

// Get all events
router.get('/', (req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Create a new event
router.post('/add', (req, res) => {
    const newEvent = new Event(req.body);
    newEvent.save()
        .then(newEvent => {
            const { title, date, time, location, attendees,organizer } = newEvent; 
            
            const mailOptions = {
                from: 'nishankv24@gmail.com',
                to: attendees,
                subject: `You got invited to the event: ${title}`,
                html: `
                <p>Hello!</p>
                
                <p>We are thrilled to invite you to our upcoming event: <strong>${title}</strong>.</p>
                
                <p>Here are the details:</p>
                <ul>
                    <li><strong>Date:</strong> ${date}</li>
                    <li><strong>Time:</strong> ${time}</li>
                    <li><strong>Location:</strong> ${location}</li>
                </ul>
                
                <p>Join us for an enriching experience filled with insightful discussions, networking opportunities, and a chance to connect with like-minded individuals. This event, organized by ${organizer}, promises to be an exciting occasion you won't want to miss.</p>
                
                <p>We look forward to seeing you there and sharing this wonderful experience with you!</p>
                
                <p>Best regards,<br>
                Team Community Scheduler</p>
                `
                
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).send(error.toString());
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json({ success: true, message: 'Event created and emails sent successfully', event: newEvent });
                }
            });
        })
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
