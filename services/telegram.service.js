const telegram = require("node-telegram-bot-api");
const dotenv = require("dotenv");
dotenv.config();

const bot = new telegram(process.env.TELEGRAM_TOKEN, {
  polling: true,
});

const telegramResponse = async (name, surname, email) => {
  const chatId = process.env.CHAT_ID; 
  await bot.sendMessage(
    chatId,
    `Tebrikler uygulamaya yeni bir kullanıcı kaydoldu. Kullanıcı adı: ${name} ${surname}, email: ${email}`
  );
};

module.exports = {
  telegramResponse,
};
