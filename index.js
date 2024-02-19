async function main() {
  const { Telegraf, Markup } = require("telegraf");
  const { getDetails } = require("./api");
  const { parseList, sendFile } = require("./utils");
  const express = require("express");

  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.start(async (ctx) => {
    ctx.reply(
      `Hi ${ctx.message.from.first_name},\n\nI can Download Files from Terabox.\n\nMade with ❤️ by @Mohd_arman_idrisi01\n\nSend any terabox link to download.`,
      Markup.inlineKeyboard([
        Markup.button.url(" Channel", "https://t.me/botcodes123"),
        Markup.button.url("Report bug", "https://t.me/Armanidrisi_bot"),
      ]),
    );
  });

  bot.on("message", async (ctx) => {
    const messageText = ctx.message.text;
    if (
      messageText.includes("terabox.com") ||
      messageText.includes("teraboxapp.com")
    ) {
      //const parts = messageText.split("/");
      //const linkID = parts[parts.length - 1];

      // ctx.reply(linkID)

      const details = await getDetails(messageText);
      if (details.link) {
        ctx.reply(`Sending Files Please Wait.!!`);
    sendFile (details.direct_link, ctx)
      } else {
        ctx.reply(details.detail);
      }
      console.log(`${details}`);
    } else {
      ctx.reply("Please send a valid Terabox link.");
    }
  });

  const app = express();
  // Set the bot API endpoint
  app.use(await bot.createWebhook({ domain: process.env.WEBHOOK_URL }));

  app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
}

main();
