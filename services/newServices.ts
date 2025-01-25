import axios from 'axios';
import cheerio from 'cheerio';
import { Article, Information } from '../interfaces';

export class NewsService {
  private articles: Article[] = [];

  private information: Information[] = [
    {
      name: 'BBC',
      address: 'https://www.bbc.com/sport/football',
    },
    {
      name: 'Gaurdian',
      address: 'https://www.theguardian.com/football',
    },
    {
      name: 'SkySports',
      address: 'https://www.skysports.com/football',
    },
  ];

  async fetchAllNews(): Promise<Article[]> {
    for (const info of this.information) {
      const response = await axios.get(info.address);
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("football")', html).each((_, element) => {
        const title = $(element).text();
        const url = $(element).attr('href');
        
        if (url) {
          this.articles.push({
            title,
            url,
            source: info.name,
          });
        }
      });
    }
    return this.articles;
  }

  async fetchNewsBySource(sourceId: string): Promise<Article[]> {
    const source = this.information.find(info => info.name === sourceId);
    if (!source) {
      throw new Error('News source not found');
    }

    const response = await axios.get(source.address);
    const html = response.data;
    const $ = cheerio.load(html);
    const specificArticles: Article[] = [];

    $('a:contains("football")', html).each((_, element) => {
      const title = $(element).text();
      const url = $(element).attr('href');
      
      if (url) {
        specificArticles.push({
          title,
          url: source.base ? source.base + url : url,
          source: sourceId,
        });
      }
    });

    return specificArticles;
  }
}
