const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const protect = require('../middleware/auth');

// ── POST /api/leads ── (Public — contact form submission)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, source, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const lead = await Lead.create({ name, email, phone, source, service, message });
    res.status(201).json({ message: 'Lead submitted successfully.', lead });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// ── GET /api/leads ── (Protected — dashboard)
router.get('/', protect, async (req, res) => {
  try {
    const { status, search } = req.query;
    let filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name:  { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// ── GET /api/leads/analytics ── (Protected — analytics cards)
router.get('/analytics', protect, async (req, res) => {
  try {
    const total     = await Lead.countDocuments();
    const newLeads  = await Lead.countDocuments({ status: 'new' });
    const contacted = await Lead.countDocuments({ status: 'contacted' });
    const converted = await Lead.countDocuments({ status: 'converted' });
    const rate      = total > 0 ? ((converted / total) * 100).toFixed(1) : 0;

    res.json({ total, new: newLeads, contacted, converted, conversionRate: rate });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// ── GET /api/leads/:id ── (Protected — single lead)
router.get('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// ── PATCH /api/leads/:id/status ── (Protected — update status)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'contacted', 'converted'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!lead) return res.status(404).json({ message: 'Lead not found.' });
    res.json({ message: 'Status updated.', lead });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// ── POST /api/leads/:id/notes ── (Protected — add follow-up note)
router.post('/:id/notes', protect, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Note text is required.' });

    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });

    lead.notes.push({ text });
    await lead.save();

    res.status(201).json({ message: 'Note added.', notes: lead.notes });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// ── DELETE /api/leads/:id ── (Protected — delete lead)
router.delete('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });
    res.json({ message: 'Lead deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

module.exports = router;
