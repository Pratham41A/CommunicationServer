import { transporter } from "../config/nodeMail";

export async function sendOtp(context, otp, to) {
  const mailOptions = {
    from: "propratham4@gmail.com",
    to,
    subject: `Otp For ${context}`,
    text: `Otp For ${context} Is ${otp}.Expiring In 5 Minutes.`,
    html: `
  <html>
  <body >
<p>
Communication
</p>
       
            <p>
            Otp For ${context} Is ${otp}.Expires In 5 Minutes.
            </p>
         
          <p>
            If You Did Not Request This Mail, Kindly Ignore This Mail.
          </p>
       
     
  </body>
  </html>
  `,
  };

 await transporter
    .sendMail(mailOptions)

      
  
 
 
}
