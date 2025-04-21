import axios from 'axios';
import cheerio from 'cheerio';
import { Article } from '../interfaces';
import { News } from '../models/newsModel';
import { VALID_NEWS_SOURCES, NEWS_SOURCES_INFO } from '../utils/newsResources';

export class NewsService {
    
    async fetchAndStoreNewsBySource(sources: string[]): Promise<Article[]> {
        const validSources = NEWS_SOURCES_INFO.filter(info => 
            sources.includes(info.name) && VALID_NEWS_SOURCES.includes(info.name)
        );

        if (validSources.length === 0) {
            throw new Error('No valid news sources provided');
        }

        let allArticles: Article[] = [];

        for (const source of validSources) {
            const response = await axios.get(source.address);
            const html = response.data;
            const $ = cheerio.load(html);

            $('a', html).each(async (_, element) => {
                const title = $(element).text().trim();
                const url = $(element).attr('href');
                
                if (url && title && (
                    title.toLowerCase().includes('football') || 
                    title.toLowerCase().includes('league') ||
                    title.toLowerCase().includes('soccer') ||
                    url.toLowerCase().includes('football')
                )) {
                    const article = {
                        title,
                        url: source.base ? source.base + url : url,
                        source: source.name,
                    };
                    allArticles.push(article);

                    await News.findOneAndUpdate(
                        { url: article.url },
                        article,
                        { upsert: true, new: true }
                    );
                }
            });
        }

        // Remove duplicates based on URL
        allArticles = allArticles.filter((article, index, self) =>
            index === self.findIndex((a) => a.url === article.url)
        );

        return allArticles;
    }
}
