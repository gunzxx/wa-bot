const { Client, LocalAuth } = require("whatsapp-web.js");
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
client.on("message", (message) => {
  console.log(message.body);
  if (
    !message.from.includes("@g.us") &&
    message.body.toLowerCase() == "halo kak, saya ingin order skripsi."
  ) {
    message.reply(`Halo 👋

Terima kasih sudah menghubungi kami terkait order skripsi.
Silakan kirim detail berikut agar kami dapat memproses:
Nama:
Judul skripsi:
Jumlah halaman:
Deadline:

Kami akan segera memproses permintaan Anda 🙏`);
  }
  if (
    !message.from.includes("@g.us") &&
    message.body.toLowerCase() == "viki poke"
  ) {
    message.reply(`Emang`);
  }
  if (!message.from.includes("@g.us") && message.body.toLowerCase() == "tes") {
    message.reply(`halo`);
  }
});

// Jalankan bot
client.initialize();
