import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { RosterDto } from './dto/roster.dto';

@Injectable()
export class RosterService {
  constructor(private readonly em: EntityManager) {}

  async getRoster(): Promise<RosterDto[]> {
    const users = await this.em.getRepository('User').findAll();
    const roster = await Promise.all(
      users.map(async (user) => {
        const articles = await this.em.getRepository('Article').find({ author: user });
        const articlesCount = articles.length;
        const favoritesReceived = articles.reduce((sum, article) => sum + article.favoritesCount, 0);
        const firstArticleDate = articles.length > 0 ? articles[0].createdAt : null;

        return {
          username: user.username,
          articlesCount,
          favoritesReceived,
          firstArticleDate,
        };
      }),
    );
    return roster;
  }
}
