const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async () => {
    return axios.get('https://goaliepost.com/')
        .then(response => {
            let $ = cheerio.load(response.data);
            let playerList = [];
            $('table.starter').each((i, elem) => {
                const name = elem.children[1].children[0].children[3].children[0].children[1].children[0].children[0]
                    .children[0].children[0].children[0].data;
                let status;
                try {
                    status = elem.children[1].children[1].next.children[1].children[0].children[0].data;
                } catch (e) {
                    status = 'Unconfirmed'
                }
                playerList[i] = {name, status}
            });
            return playerList
        })
};
