import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your email
      pass: process.env.SMTP_PASS, // Your email password or app password
    },
  });
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, projectType, timeline, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, and phone are required' 
      });
    }

    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: `"RR Designs Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVING_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22333B;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
            <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
          </div>
          ${message ? `
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #22333B;">
              <h3 style="color: #22333B; margin-top: 0;">Message:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          ` : ''}
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from the RR Designs contact form.
          </p>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Project Type: ${projectType || 'Not specified'}
        Timeline: ${timeline || 'Not specified'}
        
        ${message ? `Message:\n${message}` : ''}
        
        ---
        This email was sent from the RR Designs contact form.
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email. Please try again later.' 
    });
  }
});

// Pricing form endpoint
app.post('/api/pricing', async (req, res) => {
  try {
    const { name, email, phone, projectType, message, squareFeet, tier, estimatedQuote } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, and phone are required' 
      });
    }

    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: `"RR Designs Quote Request" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVING_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Quote Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22333B;">New Quote Request</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #22333B; margin: 20px 0;">
            <h3 style="color: #22333B; margin-top: 0;">Quote Details:</h3>
            <p><strong>Square Feet:</strong> ${squareFeet || 'N/A'}</p>
            <p><strong>Design Tier:</strong> ${tier || 'N/A'}</p>
            <p><strong>Estimated Quote:</strong> ${estimatedQuote || 'N/A'}</p>
          </div>
          ${message ? `
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #22333B;">
              <h3 style="color: #22333B; margin-top: 0;">Project Details:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          ` : ''}
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from the RR Designs pricing form.
          </p>
        </div>
      `,
      text: `
        New Quote Request
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Project Type: ${projectType || 'Not specified'}
        
        Quote Details:
        Square Feet: ${squareFeet || 'N/A'}
        Design Tier: ${tier || 'N/A'}
        Estimated Quote: ${estimatedQuote || 'N/A'}
        
        ${message ? `Project Details:\n${message}` : ''}
        
        ---
        This email was sent from the RR Designs pricing form.
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email. Please try again later.' 
    });
  }
});

// Service request endpoint
app.post('/api/service-request', async (req, res) => {
  try {
    const { name, email, phone, serviceType, projectDetails, timeline, budget } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !projectDetails) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, phone, and project details are required' 
      });
    }

    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: `"RR Designs Service Request" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVING_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Service Request: ${serviceType || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22333B;">New Service Request</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service Type:</strong> ${serviceType || 'Not specified'}</p>
            <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
            <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #22333B;">
            <h3 style="color: #22333B; margin-top: 0;">Project Details:</h3>
            <p style="white-space: pre-wrap;">${projectDetails}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from the RR Designs service request form.
          </p>
        </div>
      `,
      text: `
        New Service Request
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Service Type: ${serviceType || 'Not specified'}
        Timeline: ${timeline || 'Not specified'}
        Budget Range: ${budget || 'Not specified'}
        
        Project Details:
        ${projectDetails}
        
        ---
        This email was sent from the RR Designs service request form.
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






