'use server'

import nodemailer from 'nodemailer';
import path from 'path';


  export async function sendEmail(formData) {

    const name = formData.get('name')
    const email = formData.get('email')
    const subject = formData.get('subject')
    const message = formData.get('message')

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      secure: process.env.NODE_ENV !== 'development',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
      tls: {
          rejectUnauthorized: false
      }
    });

    try {
        await transporter.sendMail({
          from: email,
          to: process.env.EMAIL_USER,
          subject: subject,
          html: `
        <h1>YAHALAWA: Nouveau message de ${name}</h1>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
        });

        //Accusé de reception à l'expediteur
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'الإقرار بالاستلام',
          html: `
        <div dir:"rtl" style="text-align: center; font-size: 18px;">
          <img src="cid:logo" />
          <h2>${name} ,شكراً لك على رسالتك</h2>
          <p>تم استلام رسالتك بنجاح, سنعود إليك في أقرب وقت ممكن. شكراً لتواصلك معنا</p>
          <hr>
          <p><strong>ملخص رسالتك </strong></p>
          <p>${subject}<strong> :الموضوع</strong></p>
          <p>${message}</p>
          <hr>
          <p>مع خالص التقدير</p>
          <p>فريق يا حلاوة</p>
        </div>
      `,
      attachments: [
        {
          filename: 'logo.svg',
          path: path.join(process.cwd(), 'public', 'logo.svg'),
          cid: 'logo',
        },
      ],
      
        });
  
        return{ success: true };
      } catch (error) {
        console.error('Erreur d\'envoi d\'email:', error);
        return { error: `Erreur d'envoi d'email : ${error.message}` };
      }
    };

  