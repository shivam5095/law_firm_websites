"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRecruitmentNotification = sendRecruitmentNotification;
exports.sendApplicantConfirmation = sendApplicantConfirmation;
const resend_1 = require("resend");
const apiKey = process.env.RESEND_API_KEY;
let resend = null;
if (apiKey && apiKey !== 're_123456789') {
    resend = new resend_1.Resend(apiKey);
}
else {
    console.log('[Careers Email Service] Warning: RESEND_API_KEY is not defined or is placeholder. Emails will be logged to console.');
}
const careersEmail = process.env.CAREERS_EMAIL || 'anandkrmaurya13@gmail.com';
async function sendRecruitmentNotification(data) {
    const formattedDate = new Date(data.startDate).toLocaleDateString('en-IN', {
        dateStyle: 'medium',
    });
    const subject = `New Internship Application — ${data.fullName}`;
    const html = `
    <h2>New Internship Application Received</h2>
    <p><strong>Application ID:</strong> ${data.id}</p>
    <p><strong>Applicant Name:</strong> ${data.fullName}</p>
    <p><strong>Email Address:</strong> ${data.email}</p>
    <p><strong>Phone Number:</strong> ${data.phone}</p>
    <p><strong>Law School / University:</strong> ${data.lawSchool}</p>
    <p><strong>Current Course:</strong> ${data.course}</p>
    <p><strong>Current Year / Semester:</strong> ${data.currentYear}</p>
    <p><strong>Areas of Interest:</strong> ${data.areasOfInterest.join(', ')}</p>
    <p><strong>Preferred Duration:</strong> ${data.duration}</p>
    <p><strong>Preferred Start Date:</strong> ${formattedDate}</p>
    <p>---</p>
    <p>Log in to the <a href="${process.env.ADMIN_URL || 'http://localhost:3001'}/dashboard/careers/${data.id}">Admin Dashboard</a> to inspect and download applicant documents.</p>
  `;
    if (resend) {
        try {
            await resend.emails.send({
                from: 'Recruitment <onboarding@resend.dev>',
                to: careersEmail,
                subject,
                html,
            });
            console.log(`[Careers Email Service] Recruitment alert sent to ${careersEmail}`);
        }
        catch (error) {
            console.error('[Careers Email Service] Failed to send recruitment notification:', error);
        }
    }
    else {
        console.log('\n--- DEV RECRUITMENT EMAIL SIMULATION ---');
        console.log(`To: ${careersEmail}`);
        console.log(`Subject: ${subject}`);
        console.log(`HTML Body:\n${html}`);
        console.log('----------------------------------------\n');
    }
}
async function sendApplicantConfirmation(data) {
    const subject = 'Internship Application Received';
    const html = `
    <p>Dear ${data.fullName},</p>
    <p>Thank you for your interest in our internship programme. Your application has been received and will be reviewed based on the firm's requirements. Submission of an application does not guarantee an internship.</p>
    <p>We will contact you if your profile meets our requirements for an active slot.</p>
    <p>Kind regards,<br/>Recruitment Committee<br/>Maurya Law Chambers</p>
  `;
    if (resend) {
        try {
            await resend.emails.send({
                from: 'Recruitment Committee <onboarding@resend.dev>',
                to: data.email,
                subject,
                html,
            });
            console.log(`[Careers Email Service] Applicant confirmation sent to ${data.email}`);
        }
        catch (error) {
            console.error('[Careers Email Service] Failed to send applicant confirmation:', error);
        }
    }
    else {
        console.log('\n--- DEV APPLICANT EMAIL SIMULATION ---');
        console.log(`To: ${data.email}`);
        console.log(`Subject: ${subject}`);
        console.log(`HTML Body:\n${html}`);
        console.log('--------------------------------------\n');
    }
}
