const express = require('express');
const router = express.Router();
const Event = require('./eventModel');

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
