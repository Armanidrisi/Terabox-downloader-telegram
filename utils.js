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
    const data = await getDownloadLink(item);

    if (data.ok) {
      try{
        await ctx.replyWithDocument(data.downloadLink)
      }catch(e){
ctx.replyWithMarkdown(`${e.message}\n\nTry manually downloading from [here](${data.downloadLink})`);
      }
        
    }
};

module.exports = {
    parseList,
    sendFile
};
