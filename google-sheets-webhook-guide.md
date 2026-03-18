# Guide: Setting Up Google Sheets Webhook for Form Submissions

This guide explains how to connect your Vartex Architects website directly to a Google Sheet using a free Google Apps Script Webhook. This bypasses the need for complex Google Cloud Console setups and avoids any billing issues or blocked SMTP ports.

## Step 1: Open Your Google Sheet
1. Open the Google Spreadsheet you want to use for the website forms.
2. In the top menu, click on **Extensions** > **Apps Script**. This will open a new tab with a code editor.

## Step 2: Add the Script
1. Delete any code in the editor (e.g., `function myFunction() { }`).
2. Copy and paste the following code exactly as it is written below:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Customize these headers based on what your form sends
    // For Vartex Contact Form:
    if (data.type === 'contact') {
        sheet.appendRow([
            data.submittedAt || new Date(),
            data.refNumber,
            data.name,
            data.email,
            data.phone,
            data.projectType,
            data.location,
            data.brief
        ]);
    } 
    // For Vartex Newsletter:
    else if (data.type === 'newsletter') {
       sheet.appendRow([
            new Date(),
            data.email,
            "Newsletter Signup"
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

3. Click the **Save** icon (floppy disk) at the top. Name the project something like `Vartex Website Webhook`.

## Step 3: Deploy as a Web App (Getting Your Webhook URL)
1. In the top right corner, click the blue **Deploy** button.
2. Select **New deployment**.
3. Click the gear icon next to "Select type" and choose **Web app**.
4. Fill out the configuration exactly as follows:
   - **Description**: `Version 1` (or anything you like)
   - **Execute as**: `Me` (your Google account)
   - **Who has access**: `Anyone` (This is critical so the website can send data to it without logging in).
5. Click **Deploy**.
6. Google will ask for authorization. Click **Authorize access**, select your Google account, and click **Allow**. *(If you see a "Google hasn't verified this app" warning, click **Advanced** at the bottom, and then click **Go to [Project Name] (unsafe)** to proceed).*
7. You will be provided with a **Web app URL** that looks like this: `https://script.google.com/macros/s/AKfycb.../exec`.
8. **Copy this URL**.

## Step 4: Add the URL to Your Website Environment
1. Securely send this **Web app URL** to the developer. 
2. The developer will add this URL to the website's environment variables (e.g., `GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/...`) and update the form submission actions to point to this webhook instead of the standard Google Sheets API.

That's it! Your forms will now automatically log data straight into your spreadsheet for free.
