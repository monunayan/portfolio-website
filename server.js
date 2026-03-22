
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());

const MONGO = process.env.MONGO_URI;
mongoose.connect(MONGO, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>console.log(err));

const Contact = mongoose.model('Contact', new mongoose.Schema({
  name:String, email:String, phone:String, subject:String, message:String,
  createdAt:{ type:Date, default:Date.now }
}));

const nodemailer = require('nodemailer');

async function sendNotificationEmail(contactDoc) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("Email skipped: SMTP_USER or SMTP_PASS not set in .env");
    return;
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Simplest way to use Gmail
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS // Should be a 16-character App Password, not normal password
    }
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
    subject: `New contact from ${contactDoc.name}`,
    text: `Name: ${contactDoc.name}\nEmail: ${contactDoc.email}\nPhone: ${contactDoc.phone}\nSubject: ${contactDoc.subject}\n\nMessage:\n${contactDoc.message}`
  });
}

app.post('/api/contact', async (req,res)=>{
  const {name,email,message} = req.body;
  if(!name||!email||!message) return res.status(400).json({error:"required fields missing"});
  try {
    const newContact = await Contact.create(req.body);
    await sendNotificationEmail(req.body).catch(err => console.error("Email error:", err));
    res.json({success: true, message: "Saved"});
  } catch(error) {
    res.status(500).json({error: "Server Error"});
  }
});

app.use(express.static(path.join(__dirname,"public")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log("Server running on", PORT));
