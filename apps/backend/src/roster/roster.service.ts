import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { User } from '../user/user.entity';
import { Article } from '../article/article.entity';
import { RosterDto } from './dto/roster.dto';

@Injectable()
export class RosterService {
  constructor(private readonly em: EntityManager) {}

  async getRoster(): Promise<RosterDto[]> {
    const userRepository: EntityRepository<User> = this.em.getRepository(User);
    const articleRepository: EntityRepository<Article> = this.em.getRepository(Article);

    const users = await userRepository.findAll();
    const roster = await Promise.all(
      users.map(async (user) => {
        const articles = await articleRepository.find({ author: user });
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
