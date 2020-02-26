const axios = require('axios');
const cheerio = require('cheerio');

const handler = async () => {
    return axios.get('https://goaliepost.com/')
        .then(response => {
            let $ = cheerio.load(response.data);
            let playerList = [];
            $('table.starter').each((i, elem) => {
                playerList[i] = {
                    name: $(this).find('tr:nth-child(1) table tr:nth-child(1) td').find('span.starterName').find('a').text()
                }
            });
            return playerList
        })
};


handler().then(t => console.log(t));
