# ✉️ Email & Spreadsheet Integration Guide

This guide will walk you through setting up two crucial pieces of infrastructure for the Vartex Architects website:
1. **Resend**: A modern, reliable email delivery service (free tier gives 3,000 emails/month).
2. **Google Sheets Webhook**: A free and secure way to log all form submissions directly into a spreadsheet.

By using these modern tools, we bypass the need for Google Cloud Console billing and avoid residential network blocks for SMTP email.

---

## Part 1: Setting up Resend (For Email Delivery)

*Note to Developer: The client should ideally create this account so they own the billing/domain relationship. However, if they prefer, you can create it on their behalf using their email address.*

### Step 1: Create an Account
1. Go to [resend.com](https://resend.com/) and click **Sign up**.
2. Create a free account.

### Step 2: Add Your Domain
1. Once logged in, go to the **Domains** section on the left sidebar.
2. Click **Add Domain**.
3. Enter your domain: `vartexarchitects.com` and select the region (us-east-1 is usually fine).
4. Click **Add**.

### Step 3: Verify Your Domain (DNS Records)
1. Resend will provide you with a list of DNS records (TXT and MX records).
2. Log into the platform where you purchased your domain name (e.g., GoDaddy, Namecheap, Route53, etc.).
3. Navigate to the **DNS Settings** or **DNS Management** for `vartexarchitects.com`.
4. Copy and paste each record exactly as Resend shows it into your DNS settings.
5. Back in Resend, click **Verify DNS Records**. It may take a few minutes to complete. Once verified, the status will turn green.

### Step 4: Generate the API Key
1. In Resend, go to the **API Keys** section on the left sidebar.
2. Click **Create API Key**.
3. Name it "Vartex Website" (or similar). Give it "Full access".
4. **Copy the API Key** provided (it will start with `re_...`). This key is only shown once.
5. Provide this key securely to the developer to add to the website's environment variables.

---

## Part 2: Setting up Google Sheets Webhook (For Form Logging)

### Step 1: Open Your Google Sheet
1. Open the Google Spreadsheet you want to use for logging the website forms. Ensure it has two tabs named exactly: `Contact` (or Sheet1) and `Newsletter`.
2. In the top menu, click on **Extensions** > **Apps Script**. This will open a new tab with a code editor.

### Step 2: Add the Custom Script
1. Delete any existing code in the editor.
2. Copy and paste the following code exactly:

```javascript
// Webhook for Vartex Form Submissions
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]; // Uses the first tab for Contact inquiries
    const data = JSON.parse(e.postData.contents);
    
    // Contact Form Logging
    if (data.formType === 'contact') {
      sheet.appendRow([
        data.submittedAt || new Date(),
        data.refNumber,
        data.name,
        data.email,
        data.phone,
        data.type,
        data.location,
        data.brief
      ]);
    } 

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **Save** icon (floppy disk) at the top. Name the project `Vartex Website Webhook`.

### Step 3: Deploy as a Web App (Getting Your URL)
1. In the top right corner, click the blue **Deploy** button.
2. Select **New deployment**.
3. Click the gear icon next to "Select type" and choose **Web app**.
4. Configure exactly as follows:
   - **Description**: `Version 1`
   - **Execute as**: `Me` (your Google account)
   - **Who has access**: `Anyone` *(Crucial so the website can send data without authentication)*.
5. Click **Deploy**.
6. Google will ask for authorization. Click **Authorize access**, select your Google account, and click **Allow**. *(If warned it's unverified, click **Advanced** -> **Go to Vartex Website Webhook (unsafe)**)*.
7. You will be provided with a **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`).
8. **Copy this URL**.

### Final Step
Provide both the **Resend API Key** and the **Google Sheets Web app URL** securely to your developer so they can update the live website environment variables.
