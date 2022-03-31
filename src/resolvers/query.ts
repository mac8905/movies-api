import { PrismaClient, Visibility } from '@prisma/client';

export const Query = {
  movies: (
    _: unknown,
    args: { skip?: number; take?: number },
    context: { orm: PrismaClient; userId: string },
  ) => {
    if (!context.userId) {
      throw new Error('You are not authenticated');
    }

    return context.orm.movie.findMany({
      ...args,
      where: {
        OR: [
          {
            visibility: {
              equals: Visibility.PUBLIC,
            },
          },
          {
            visibility: {
              equals: Visibility.PRIVATE,
            },
            addedBy: {
              equals: context.userId,
            },
          },
        ],
      },
    });
  },

  movie: (
    _: unknown,
    args: { id: string },
    context: { orm: PrismaClient; userId: string },
  ) => {
    if (!context.userId) {
      throw new Error('You are not authenticated');
    }

    return context.orm.movie.findFirst({
      where: { ...args, visibility: Visibility.PUBLIC },
    });
  },
};
