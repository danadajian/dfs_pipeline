import {GOALIE_WEBSITE_LINK} from "../constants";

import * as axios from 'axios'
import * as cheerio from 'cheerio'

interface Goalie {
    name: string,
    status: string
}

export const goalieScraperHandler = async (): Promise<Goalie[]> => {
    return axios.get(GOALIE_WEBSITE_LINK)
        .then(response => {
            const $ = cheerio.load(response.data);
            let goalieList: Goalie[] = [];
            $('table.starter').each((i: number, elem: CheerioElement) => {
                const name = elem.children[1].children[0].children[3].children[0].children[1].children[0].children[0]
                    .children[0].children[0].children[0].data;
                let status: string;
                try {
                    status = elem.children[1].children[1].next.children[1].children[0].children[0].data;
                } catch (e) {
                    status = 'Projected'
                }
                goalieList[i] = {
                    name,
                    status
                }
            });
            return goalieList
        })
};
