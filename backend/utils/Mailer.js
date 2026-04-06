const nodemailer = require("nodemailer");
const dns = require("dns");

// 🔥 FORCE IPv4 (IMPORTANT FIX)
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP ERROR:", error);
  } else {
    console.log("✅ SMTP READY");
  }
});

async function sendOTPEmail(toEmail, otp) {
  try {
    console.log("📧 EMAIL_USER:", process.env.EMAIL_USER);
    console.log(
      "📧 EMAIL_PASS:",
      process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌"
    );

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    console.log("✅ Mail sent:", info.response);
    return true;

  } catch (err) {
    console.error("❌ Error sending OTP email:", err.message);
    return false;
  }
}

module.exports = { sendOTPEmail };