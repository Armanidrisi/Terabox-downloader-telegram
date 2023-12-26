const axios = require("axios");

async function getDetails(id) {
    try {
        const response = await axios.get(
            `http://terabox-dl.qtcloud.workers.dev/api/get-info?shorturl=${id}&pwd=`
        );
      
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getDownloadLink(data) {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await axios.post(
            "https://terabox-dl.qtcloud.workers.dev/api/get-download",
            data,
            config
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getDetails,
    getDownloadLink
};
