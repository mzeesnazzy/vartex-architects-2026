# ✉️ Lead Management & Email Integration Guide

This guide will walk you through setting up the core infrastructure for the Vartex Architects website:
1. **Sanity Lead Dashboard (Primary)**: The most reliable way to capture and manage client inquiries directly within your website's admin panel.
2. **Resend**: A modern email delivery service to send automated confirmations to you and your visitors.
3. **Google Sheets (Backup)**: An optional way to log form submissions into a spreadsheet.

---

## Part 1: Setting up Sanity Lead Dashboard (Primary)

This is the recommended way to manage leads. It stores inquiries directly in your website's database.

### Step 1: Generate a Sanity API Token
1. Go to [sanity.io/manage](https://www.sanity.io/manage) and log in.
2. Select your project (Vartex Architects).
3. Go to **Settings** > **API Tokens**.
4. Click **Add New Token**.
5. **Name**: `Website Contact Form`
6. **Permissions**: Select **Editor**.
7. Click **Save** and **Copy the token immediately**. 

### Step 2: Accessing the Dashboard
Once the token is added to the website settings (by your developer), you can view all leads by:
1. Logging into your Sanity Studio (usually `/admin` or `/studio` on your domain).
2. Clicking the **"Inquiries & Leads"** tab in the sidebar.

---

## Part 2: Setting up Resend (For Email Delivery)

### Step 1: Create an Account
1. Go to [resend.com](https://resend.com/) and sign up for a free account.

### Step 2: Add & Verify Your Domain
1. Go to the **Domains** section and click **Add Domain**.
2. Enter `vartexarchitects.com`.
3. Resend will provide DNS records (TXT/MX). Add these to your domain provider (e.g., Godaddy, Namecheap).
4. Click **Verify** in Resend once added.

### Step 3: Generate the API Key
1. Go to **API Keys** > **Create API Key**.
2. Name it "Vartex Website" and give it "Full access".
3. **Copy the API Key** (starts with `re_...`).

### Step 4: Configure Sender Emails (Optional but Recommended)
By default, the website sends from `info@vartexarchitects.com`. If you need to change this, provide the following environment variables to your developer:
- `EMAIL_FROM`: The address that sends the emails (e.g., `info@vartexarchitects.com`).
- `EMAIL_TO`: The address where you receive notifications (e.g., `info@vartexarchitects.com`).

---

## Part 3: Google Sheets Webhook (Optional Backup)

If you still wish to have a spreadsheet copy, follow these steps:

### Step 1: Apps Script Setup
1. Open your Google Sheet > **Extensions** > **Apps Script**.
2. Paste the following code:
```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const data = JSON.parse(e.postData.contents);
    if (data.formType === 'contact') {
      sheet.appendRow([new Date(), data.refNumber, data.name, data.email, data.phone, data.type, data.location, data.brief]);
    }
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
```
3. Click **Deploy** > **New Deployment** > **Web App**.
4. Set **Execute as**: `Me`, **Who has access**: `Anyone`.
5. **Copy the Web app URL**.

---

## Final Step
Provide the **Sanity API Token**, **Resend API Key**, and (optionally) the **Google Sheets URL** to your developer to finalize the setup.

## 🛠 Troubleshooting Email Issues

If emails are not arriving:
1. **Verify Domain**: In Resend, your domain must show as **"Verified"**. If it says "Pending", your DNS records are not set up correctly.
2. **Redeploy**: If you added the `RESEND_API_KEY` to Vercel, you **must** trigger a "Redeploy" for it to take effect.
3. **Check Logs**: Check your Vercel project logs for any "Email sending failed" errors.
4. **Spam**: Check your spam folder for emails from `info@vartexarchitects.com`.
