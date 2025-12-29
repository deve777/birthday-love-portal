import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { wish } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gamingandfun50@gmail.com",
      pass: "jzgn sugx cauk damv",
    },
  });

  await transporter.sendMail({
    from: "Birthday Wish ⭐",
    to: "kapoormohit4103@gmail.com",
    subject: "A birthday wish from her 💖",
    text: wish,
  });

  res.status(200).json({ success: true });
}
