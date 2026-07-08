import express from 'express';
import Contact from '../models/contactModel.js';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all contact submissions
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update contact status
router.put('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      contact.status = req.body.status || contact.status;
      const updatedContact = await contact.save();
      res.json(updatedContact);
    } else {
      res.status(404);
      throw new Error('Contact submission not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 