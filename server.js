// server.js (copy this file into your project root)
require('dotenv').config();               // LOAD .env (must be first)
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());

// --- MONGODB CONNECT ---
const MONGO = process.env.MONGO_URI;
if (!MONGO) {
  console.error('FATAL: MONGO_URI is not set in .env');
  process.exit(1);
}

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('Mongo connect error:', err);
    process.exit(1); // stop process if DB is not connectable
  });

// --- MONGOOSE MODEL ---
const Contact = mongoose.model('Contact', new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
}));

// --- EMAIL HELPER ---
// Supports either SMTP_* (preferred) or fallback to EMAIL_USER/EMAIL_PASS (Gmail app password)
async function sendNotificationEmail(contactDoc) {
  const smtpHost = process.env.SMTP_HOST || null;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : null;
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const notifyTo = process.env.NOTIFY_EMAIL || smtpUser;

  if (!smtpUser || !smtpPass) {
    console.warn('sendNotificationEmail: SMTP credentials missing - skipping email');
    return false;
  }

  let transporterConfig;
  if (smtpHost && smtpPort) {
    transporterConfig = {
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for 587/others
      auth: { user: smtpUser, pass: smtpPass }
    };
  } else {
    // fallback to Gmail service (works with App Password)
    transporterConfig = {
      service: 'gmail',
      auth: { user: smtpUser, pass: smtpPass }
    };
  }

  try {
    const transporter = nodemailer.createTransport(transporterConfig);

    const mailOptions = {
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: notifyTo,
      subject: `New contact from ${contactDoc.name || 'Website'}`,
      text:
        `You have a new message from your portfolio contact form.\n\n` +
        `Name: ${contactDoc.name || ''}\n` +
        `Email: ${contactDoc.email || ''}\n` +
        `Phone: ${contactDoc.phone || ''}\n` +
        `Subject: ${contactDoc.subject || ''}\n\n` +
        `Message:\n${contactDoc.message || ''}\n`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId || info.response || '(no id)');
    return true;
  } catch (err) {
    console.error('sendNotificationEmail error:', err && err.message ? err.message : err);
    return false;
  }
}

// --- API: contact submit ---
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body || {};

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    }

    // Save to DB
    const contactDoc = new Contact({ name, email, phone, subject, message });
    await contactDoc.save();
    console.log('New contact saved:', contactDoc._id);

    // Attempt to send email notification (non-fatal)
    const emailOk = await sendNotificationEmail(contactDoc);

    if (emailOk) {
      return res.json({ success: true, message: 'Saved & email sent' });
    } else {
      // saved but email failed
      return res.status(200).json({ success: true, message: 'Saved but email failed (check logs)' });
    }
  } catch (err) {
    console.error('POST /api/contact error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// --- Serve frontend static files (your public folder) ---
app.use(express.static(path.join(__dirname, 'public')));

// Fallback for SPA (optional) - uncomment if you want index.html for all routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// --- Start server ---
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log('Server running on', PORT);
});

/*
  .env expected variables (examples):
  MONGO_URI=...                  // required
  PORT=5000                      // optional
  EMAIL_USER=youremail@gmail.com // or SMTP_USER
  EMAIL_PASS=your_app_password   // or SMTP_PASS
  NOTIFY_EMAIL=youremail@gmail.com

  Optional custom SMTP:
  SMTP_HOST=smtp.example.com
  SMTP_PORT=587
  SMTP_USER=...
  SMTP_PASS=...
*/
