const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async () => {
    return axios.get('https://www.dailyfaceoff.com/starting-goalies/')
        .then(response => {
            let $ = cheerio.load(response.data);
            let playerList = [];
            $('div[class="card-col-6 left away-goalie"]').each(function(i) {
                playerList[i] = {
                    name: $(this).find('.meta-row').find('h4').text().trim(),
                    status: $(this).find('.meta-row').find('h5').text().trim()
                }
            });
            let currentLength = playerList.length;
            $('div[class="card-col-6 right home-goalie border-left"]').each(function(i) {
                playerList[i + currentLength] = {
                    name: $(this).find('.meta-row').find('h4').text().trim(),
                    status: $(this).find('.meta-row').find('h5').text().trim()
                }
            });
            return playerList
        })
};

