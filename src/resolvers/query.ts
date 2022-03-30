import { PrismaClient, Visibility } from '@prisma/client';

export const Query = {
  movies: (
    _parent: unknown,
    args: { skip?: number; take?: number },
    context: { orm: PrismaClient },
  ) => {
    return context.orm.movie.findMany({
      ...args,
      where: {
        visibility: Visibility.PUBLIC,
      },
    });
  },

  movie: (
    _parent: unknown,
    args: { id: string },
    context: { orm: PrismaClient },
  ) => {
    return context.orm.movie.findFirst({
      where: { ...args, visibility: Visibility.PUBLIC },
    });
  },
};
