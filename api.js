const axios = require("axios");

async function getDetails(id) {
    try {
        const response = await axios.get(
            `https://afca-174-138-88-233.ngrok-free.app/get?url=${id}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    getDetails,
    
};
