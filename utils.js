const sendFile = async (item, ctx) => {
  if (item) {
    try {
      await ctx.replyWithDocument(item);
    } catch (e) {
      ctx.replyWithMarkdown(
        `⚠️ ${e.message}\n\n👉 Try manually downloading from [here](${item})\n\n👉 *Maybe This File Is Too Large Or Cannot Accessible From Terabox*`,
      );
    }
  }
};

module.exports = {
  sendFile,
};
