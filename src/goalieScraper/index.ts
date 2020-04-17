import {GOALIE_WEBSITE_LINK} from "../constants";

const axios = require('axios');
const cheerio = require('cheerio');

export const goalieScraperHandler = async () => {
    return axios.get(GOALIE_WEBSITE_LINK)
        .then(response => {
            const $ = cheerio.load(response.data);
            let playerList = [];
            $('table.starter').each((i, elem) => {
                const name = elem.children[1].children[0].children[3].children[0].children[1].children[0].children[0]
                    .children[0].children[0].children[0].data;
                let status;
                try {
                    status = elem.children[1].children[1].next.children[1].children[0].children[0].data;
                } catch (e) {
                    status = 'Projected'
                }
                playerList[i] = {name, status}
            });
            return playerList
        })
};
