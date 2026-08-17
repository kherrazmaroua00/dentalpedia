const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

async function sendResetEmail(to, resetUrl) {
  await transporter.sendMail({
    from: `"Dentalpedia" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Réinitialisation de votre mot de passe - Dentalpedia',
    html: `
      <p>Bonjour,</p>
      <p>Vous avez demandé la réinitialisation de votre mot de passe Dentalpedia.</p>
      <p><a href="${resetUrl}">Cliquez ici pour choisir un nouveau mot de passe</a></p>
      <p>Ce lien expire dans 1 heure. Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
    `,
  });
}

module.exports = { sendResetEmail };