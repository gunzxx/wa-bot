const { Client, LocalAuth } = require("whatsapp-web.js");
const fs = require("fs");
const qrcode = require("qrcode-terminal");

// Inisialisasi client dengan LocalAuth agar sesi tersimpan
const client = new Client({
  authStrategy: new LocalAuth(),
});

// Generate QR Code untuk login pertama kali
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Konfirmasi jika bot siap
client.on("ready", () => {
  console.log("Bot WhatsApp sudah siap!");
});

// Balasan jika pesan sesuai
client.on("message", async (message) => {
  console.log(message.body);
  const contact = await message.getContact();
  const nama = contact.pushname || "{Undefined}";
  const nomor = contact.number;
  const pesan = message.body;

  // Membuat timestamp format DD-MM-YYYY HH:MM:SS
  const now = new Date();
  const timestamp = now
    .toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(/\./g, ":");

  let log = ``;
  if (message.from.includes("@g.us")) {
    // Jika pesan dari grup
    const chat = await message.getChat();
    const namaGrup = chat.name;
    log = `[${timestamp}] [${namaGrup}] (${nama}:${nomor}) : ${pesan}\n`;
  } else {
    // Jika pesan personal
    log = `[${timestamp}] (${nama}:${nomor}) : ${pesan}\n`;
  }
  fs.appendFileSync("sent_messages.log", log);

  if (
    !message.from.includes("@g.us") &&
    message.body.toLowerCase().startsWith("halo kak, saya ingin order skripsi")
  ) {
    message.reply(
      `Halo 👋

        Terima kasih sudah menghubungi kami terkait order skripsi.
        Silakan kirim detail berikut agar kami dapat memproses:
        Nama:
        Judul skripsi:
        Jumlah halaman:
        Deadline:

        Kami akan segera memproses permintaan Anda 🙏`
    );
  } else if (
    !message.from.includes("@g.us") &&
    message.body.toLowerCase().startsWith("halo kak, saya ingin order website")
  ) {
    message.reply(
      `Halo 👋

        Terima kasih sudah menghubungi kami terkait order skripsi.
        Silakan kirim detail berikut agar kami dapat memproses:
        Nama:
        Judul skripsi:
        Jumlah halaman:
        Deadline:

        Kami akan segera memproses permintaan Anda 🙏`
    );
  } else if (
    !message.from.includes("@g.us") &&
    message.body.toLowerCase().startsWith("viki poke")
  ) {
    message.reply(`Emang`);
  }
  if (!message.from.includes("@g.us") && message.body.toLowerCase() == "tes") {
    message.reply(`halo`);
  }
});

// Jalankan bot
client.initialize();
