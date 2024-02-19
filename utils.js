const { getDownloadLink } = require("./api");

const parseList = list => {
    const output = [];
    list.forEach(item => {
        output.push(item);
        if (item.is_dir == "1") {
            parseList(item.children);
        }
    });
    return output;
};

const sendFile = async (item, ctx) => {
    

    if (item) {
      try{
        await ctx.replyWithDocument(item)
      }catch(e){
ctx.replyWithMarkdown(`⚠️ ${e.message}\n\n👉 Try manually downloading from [here](${item})\n\n👉 *Maybe This File Is Too Large Or Cannot Accessible From Terabox*`);
      }
        
    }
};

module.exports = {
    parseList,
    sendFile
};
