import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface InquiryData {
    name: string;
    email: string;
    phone: string;
    type: string;
    location: string;
    brief: string;
    refNumber: string;
    submittedAt: string;
}

// Brand color from client's existing email template
const BRAND = "#8B3A2F";
const BRAND_LIGHT = "#A0453A";
const BG_WARM = "#FAF6F3";

/**
 * Send notification email to VARTEX (the client)
 */
export async function sendClientNotification(data: InquiryData) {
    const sheetUrl = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
        ? `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEETS_SPREADSHEET_ID}/edit`
        : "#";

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0; padding:0; background-color:#f0ebe7; font-family: Georgia, 'Times New Roman', serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe7; padding:40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:4px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">

                        <!-- Header -->
                        <tr>
                            <td style="background:${BRAND}; padding:28px 40px; text-align:center;">
                                <h1 style="color:#ffffff; font-size:14px; letter-spacing:6px; margin:0; font-weight:400; font-family: Georgia, serif;">VARTEX ARCHITECTS</h1>
                                <p style="color:rgba(255,255,255,0.6); font-size:9px; letter-spacing:2px; margin:8px 0 0 0; font-family: Arial, sans-serif;">Creating Functional, Timeless and Sustainable design solutions</p>
                            </td>
                        </tr>

                        <!-- Alert Banner -->
                        <tr>
                            <td style="background:#742F25; padding:14px 40px; text-align:center;">
                                <p style="color:#ffffff; font-size:10px; letter-spacing:3px; margin:0; text-transform:uppercase; font-family: Arial, sans-serif;">🔔 New Project Inquiry Received</p>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding:40px;">
                                <p style="font-size:15px; color:#333333; line-height:1.6; margin:0 0 8px 0; font-family: Arial, sans-serif;">
                                    A new project inquiry has been submitted through the website.
                                </p>
                                <p style="font-size:12px; color:#999999; margin:0 0 32px 0; letter-spacing:1px; font-family: Arial, sans-serif;">
                                    Reference: <span style="color:${BRAND}; font-weight:600;">${data.refNumber}</span> • ${data.submittedAt}
                                </p>

                                <!-- Inquiry Details -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eeeeee; border-radius:4px;">
                                    <tr>
                                        <td style="padding:16px 20px; border-bottom:1px solid #eeeeee; background:${BG_WARM};">
                                            <p style="font-size:9px; letter-spacing:3px; color:#999999; text-transform:uppercase; margin:0 0 4px 0; font-family: Arial, sans-serif;">Client Name</p>
                                            <p style="font-size:15px; color:#1a1a1a; margin:0; font-weight:600;">${data.name}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:16px 20px; border-bottom:1px solid #eeeeee;">
                                            <p style="font-size:9px; letter-spacing:3px; color:#999999; text-transform:uppercase; margin:0 0 4px 0; font-family: Arial, sans-serif;">Email Address</p>
                                            <p style="font-size:15px; color:${BRAND}; margin:0;">
                                                <a href="mailto:${data.email}" style="color:${BRAND}; text-decoration:none;">${data.email}</a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:16px 20px; border-bottom:1px solid #eeeeee; background:${BG_WARM};">
                                            <p style="font-size:9px; letter-spacing:3px; color:#999999; text-transform:uppercase; margin:0 0 4px 0; font-family: Arial, sans-serif;">Phone Number</p>
                                            <p style="font-size:15px; color:#1a1a1a; margin:0;">
                                                <a href="tel:${data.phone}" style="color:#1a1a1a; text-decoration:none;">${data.phone}</a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:16px 20px; border-bottom:1px solid #eeeeee;">
                                            <p style="font-size:9px; letter-spacing:3px; color:#999999; text-transform:uppercase; margin:0 0 4px 0; font-family: Arial, sans-serif;">Project Type</p>
                                            <p style="font-size:15px; color:#1a1a1a; margin:0;">${data.type}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:16px 20px; border-bottom:1px solid #eeeeee; background:${BG_WARM};">
                                            <p style="font-size:9px; letter-spacing:3px; color:#999999; text-transform:uppercase; margin:0 0 4px 0; font-family: Arial, sans-serif;">Site Location</p>
                                            <p style="font-size:15px; color:#1a1a1a; margin:0;">${data.location}</p>
                                        </td>
                                    </tr>
                                    ${data.brief ? `
                                    <tr>
                                        <td style="padding:16px 20px;">
                                            <p style="font-size:9px; letter-spacing:3px; color:#999999; text-transform:uppercase; margin:0 0 4px 0; font-family: Arial, sans-serif;">Project Brief</p>
                                            <p style="font-size:14px; color:#333333; margin:0; line-height:1.6; font-family: Arial, sans-serif;">${data.brief}</p>
                                        </td>
                                    </tr>
                                    ` : ''}
                                </table>

                                <!-- CTA -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                                    <tr>
                                        <td align="center">
                                            <a href="mailto:${data.email}?subject=RE: Project Inquiry ${data.refNumber}" style="display:inline-block; background:${BRAND}; color:#ffffff; padding:14px 32px; font-size:10px; letter-spacing:3px; text-transform:uppercase; text-decoration:none; border-radius:4px; font-family: Arial, sans-serif;">
                                                ✉️ Reply to Client
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding-top:12px;">
                                            <a href="${sheetUrl}" style="display:inline-block; background:${BRAND_LIGHT}; color:#ffffff; padding:14px 32px; font-size:10px; letter-spacing:3px; text-transform:uppercase; text-decoration:none; border-radius:4px; font-family: Arial, sans-serif;">
                                                📊 View in Spreadsheet
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background:${BG_WARM}; padding:24px 40px; border-top:1px solid #eeeeee; text-align:center;">
                                <p style="font-size:10px; color:#999999; margin:0; letter-spacing:1px; font-family: Arial, sans-serif;">
                                    Vartex Architects • <a href="https://vartexarchitects.com" style="color:${BRAND}; text-decoration:none;">vartexarchitects.com</a> • © 2026
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    await resend.emails.send({
        from: 'Vartex Architects <info@vartexarchitects.com>',
        to: ['info@vartexarchitects.com'],
        subject: `🔔 New Project Inquiry — ${data.name} (${data.type})`,
        html,
    });
}

/**
 * Send confirmation email to the visitor
 */
export async function sendVisitorConfirmation(data: InquiryData) {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0; padding:0; background-color:#f0ebe7; font-family: Georgia, 'Times New Roman', serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe7; padding:40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:4px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">

                        <!-- Header -->
                        <tr>
                            <td style="background:${BRAND}; padding:28px 40px; text-align:center;">
                                <h1 style="color:#ffffff; font-size:14px; letter-spacing:6px; margin:0; font-weight:400; font-family: Georgia, serif;">VARTEX ARCHITECTS</h1>
                                <p style="color:rgba(255,255,255,0.6); font-size:9px; letter-spacing:2px; margin:8px 0 0 0; font-family: Arial, sans-serif;">Creating Functional, Timeless and Sustainable design solutions</p>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding:40px;">
                                <h2 style="font-size:22px; color:#333333; margin:0 0 24px 0; font-weight:300; font-family: Georgia, serif;">
                                    Welcome — We've Received Your Message
                                </h2>

                                <p style="font-size:15px; color:#333333; line-height:1.7; margin:0 0 8px 0; font-family: Arial, sans-serif;">
                                    Dear <strong>${data.name}</strong>,
                                </p>
                                <p style="font-size:15px; color:#333333; line-height:1.7; margin:0 0 24px 0; font-family: Arial, sans-serif;">
                                    Thank you for reaching out to Vartex Architects.
                                </p>
                                <p style="font-size:15px; color:#333333; line-height:1.7; margin:0 0 32px 0; font-family: Arial, sans-serif;">
                                    We've received your message and appreciate your interest in our work. A member of our team will review your inquiry and get back to you shortly.
                                </p>

                                <!-- Reference Box -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_WARM}; border-left:4px solid ${BRAND}; border-radius:4px; margin-bottom:32px;">
                                    <tr>
                                        <td style="padding:20px 24px;">
                                            <p style="font-size:12px; color:#666666; margin:0 0 4px 0; font-family: Arial, sans-serif;">
                                                📋 <strong>Inquiry Reference:</strong> <span style="color:${BRAND}; font-weight:600;">${data.refNumber}</span>
                                            </p>
                                            <p style="font-size:12px; color:#666666; margin:0; font-family: Arial, sans-serif;">
                                                <strong>Submitted:</strong> ${data.submittedAt}
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                                <p style="font-size:14px; color:${BRAND}; line-height:1.6; margin:0 0 32px 0; font-family: Arial, sans-serif;">
                                    In the meantime, feel free to explore our projects and insights on our website.
                                </p>

                                <!-- CTA -->
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td align="center">
                                            <a href="https://vartexarchitects.com" style="display:inline-block; background:${BRAND}; color:#ffffff; padding:14px 32px; font-size:10px; letter-spacing:3px; text-transform:uppercase; text-decoration:none; border-radius:4px; font-family: Arial, sans-serif;">
                                                Visit Our Website
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Sign off -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px; border-top:1px solid #eeeeee; padding-top:24px;">
                                    <tr>
                                        <td>
                                            <p style="font-size:14px; color:${BRAND}; margin:0 0 4px 0; font-family: Georgia, serif;">Warm regards,</p>
                                            <p style="font-size:14px; color:#1a1a1a; margin:0; font-weight:600;">Michael Mbah</p>
                                            <p style="font-size:12px; color:#999999; margin:0;">Vartex Architects</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Disclaimer -->
                        <tr>
                            <td style="padding:16px 40px; background:${BG_WARM}; border-top:1px solid #eeeeee;">
                                <p style="font-size:10px; color:#bbbbbb; margin:0; text-align:center; line-height:1.5; font-family: Arial, sans-serif;">
                                    This is an automated confirmation. A team member will contact you personally soon.
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background:${BRAND}; padding:20px 40px; text-align:center;">
                                <p style="font-size:10px; color:rgba(255,255,255,0.5); margin:0; letter-spacing:1px; font-family: Arial, sans-serif;">
                                    Vartex Architects • <a href="https://vartexarchitects.com" style="color:rgba(255,255,255,0.7); text-decoration:none;">vartexarchitects.com</a> • © 2026
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    await resend.emails.send({
        from: 'Vartex Architects <info@vartexarchitects.com>',
        to: [data.email],
        subject: "Welcome — We've Received Your Message",
        html,
    });
}
