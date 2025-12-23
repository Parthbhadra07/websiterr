# Nodemailer Setup Guide

This project uses Nodemailer with Express.js to send form submissions via email. Follow these steps to configure it:

## Step 1: Create Environment File

1. Copy `env.example` to `.env` in the root directory:
   ```bash
   cp env.example .env
   ```

2. Open `.env` and fill in your email configuration

## Step 2: Configure Gmail (Recommended)

### Option A: Gmail App Password (Recommended)

1. Go to your Google Account settings
2. Enable **2-Step Verification** if not already enabled
3. Go to **Security** → **App passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password
6. Use this password in `SMTP_PASS` in your `.env` file

### Option B: Other Email Providers

**Outlook/Hotmail:**
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

**Yahoo:**
```
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

**Custom SMTP:**
Use your email provider's SMTP settings

## Step 3: Update .env File

Edit `.env` with your credentials:

```env
PORT=3001

# Your email credentials
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password-here

# Where to receive form submissions
RECEIVING_EMAIL=hello@rrdesigns.studio

# Frontend API URL (optional)
VITE_API_URL=http://localhost:3001
```

## Step 4: Install Concurrently (Optional)

If you want to run both frontend and backend together:

```bash
npm install --save-dev concurrently
```

Then use:
```bash
npm run dev:all
```

## Step 5: Run the Application

### Option 1: Run Separately (Recommended for Development)

**Terminal 1 - Backend Server:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 2: Run Together

```bash
npm run dev:all
```

## Step 6: Test the Forms

1. Make sure both servers are running
2. Open your browser to `http://localhost:5173` (or your Vite port)
3. Fill out the Contact form and submit
4. Check your email inbox (the one set in `RECEIVING_EMAIL`)
5. Test the Pricing form as well

## Production Deployment

### For Production:

1. Update `VITE_API_URL` in your frontend build to point to your production API
2. Set environment variables on your hosting platform (Vercel, Netlify, Heroku, etc.)
3. Deploy the backend server separately (Railway, Render, Heroku, etc.)

### Example Production .env:

```env
PORT=3001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-production-email@gmail.com
SMTP_PASS=your-app-password
RECEIVING_EMAIL=hello@rrdesigns.studio
```

## Troubleshooting

### "Connection timeout" or "Authentication failed"
- Verify your SMTP credentials are correct
- For Gmail, make sure you're using an App Password, not your regular password
- Check if 2-Step Verification is enabled

### "Network error" in frontend
- Make sure the backend server is running on port 3001
- Check that `VITE_API_URL` matches your backend URL
- Check browser console for CORS errors

### Emails not sending
- Check server console for error messages
- Verify `.env` file exists and has correct values
- Test SMTP connection with a simple email client first

### CORS errors
- The server is configured with CORS enabled
- If issues persist, check the `cors` configuration in `server.js`

## Security Notes

- **Never commit `.env` file to git** (it's already in `.gitignore`)
- Use App Passwords instead of regular passwords
- Consider using environment variables on your hosting platform
- For production, use a dedicated email service account

## Alternative: Use Email Service Providers

You can also configure nodemailer to work with:
- **SendGrid**: `smtp.sendgrid.net`
- **Mailgun**: `smtp.mailgun.org`
- **Amazon SES**: `email-smtp.region.amazonaws.com`

Just update the `SMTP_HOST` and credentials accordingly.











