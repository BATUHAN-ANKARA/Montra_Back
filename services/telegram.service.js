const telegram = require("node-telegram-bot-api");
const utils = require("../utils/index");

const dotenv = require("dotenv");
dotenv.config();

const bot = new telegram(process.env.TELEGRAM_TOKEN, {
  polling: true,
});

const initialMessage = async () => {
  const chatId = process.env.CHAT_ID;
  const ip = await utils.helper.getHost();
  await bot.sendMessage(
    chatId,
    `Uygulama başlatıldı. Uygulama adresi: ${ip}\n Türkiye saati ile ${new Date().toLocaleString()}`
  );
};

const registerMessage = async (name, surname, email) => {
  const chatId = process.env.CHAT_ID;
  await bot.sendMessage(
    chatId,
    `Tebrikler uygulamaya yeni bir kullanıcı kaydoldu. Kullanıcı adı: ${name} ${surname}, email: ${email}`
  );
};

const deleteMessage = async (name, surname, email) => {
  const chatId = process.env.CHAT_ID;
  await bot.sendMessage(
    chatId,
    `Uygulamadan bir kullanıcı ayrıldı. Kullanıcı adı: ${name} ${surname}, email: ${email}`
  );
};

module.exports = {
  registerMessage,
  deleteMessage,
  initialMessage,
};
