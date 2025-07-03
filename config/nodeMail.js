import nodemailer from "nodemailer";

 const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "propratham4@gmail.com",
    pass: process.env.MAIL_APP_PASSWORD,
  },
});
export {transporter}