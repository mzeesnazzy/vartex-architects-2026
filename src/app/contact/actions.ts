"use server";

import { z } from "zod";
import { sendClientNotification, sendVisitorConfirmation } from "@/lib/email";
import { logContactSubmission } from "@/lib/sheets";

const inquirySchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(6, "Phone number is required"),
    type: z.string(),
    location: z.string().min(2, "Location is required"),
    brief: z.string().optional(),
});

export type FormState = {
    message: string;
    errors?: Record<string, string[]>;
    success: boolean;
};

function generateRefNumber(): string {
    return "REF-" + Math.floor(100000 + Math.random() * 900000).toString();
}

function formatSubmittedAt(): string {
    return new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export async function contactInquiryAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = inquirySchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        type: formData.get("type"),
        location: formData.get("location"),
        brief: formData.get("brief"),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Please check the form for errors.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, phone, type, location, brief } = validatedFields.data;
    const refNumber = generateRefNumber();
    const submittedAt = formatSubmittedAt();

    const inquiryData = {
        name,
        email,
        phone,
        type,
        location,
        brief: brief || "",
        refNumber,
        submittedAt,
    };

    // Log for debugging
    console.log("NEW INQUIRY RECEIVED:", inquiryData);

    // Send emails only if credentials are configured
    if (process.env.RESEND_API_KEY) {
        try {
            await Promise.all([
                sendClientNotification(inquiryData),
                sendVisitorConfirmation(inquiryData),
            ]);
            console.log("✅ Both emails sent successfully via Resend");
        } catch (error) {
            console.error("❌ Email sending failed:", error);
            // Still return success — the inquiry was received, even if email fails
        }
    } else {
        console.log("⚠️ Resend API Key not configured — skipping email send");
    }

    // Log to Google Sheets
    try {
        await logContactSubmission(inquiryData);
        console.log("✅ Contact inquiry logged to Google Sheets");
    } catch (error) {
        console.error("❌ Failed to log to Google Sheets:", error);
    }

    return {
        success: true,
        message: "Thank you. Your inquiry has been received.",
    };
}
