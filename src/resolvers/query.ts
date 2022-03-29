import type { PrismaClient } from '@prisma/client';

export const Query = {
  movies: (
    _parent: unknown,
    _args: unknown,
    context: { orm: PrismaClient },
  ) => {
    return context.orm.movie.findMany();
  },

  movie: (
    _parent: unknown,
    args: { id: string },
    context: { orm: PrismaClient },
  ) => {
    return context.orm.movie.findFirst({
      where: { id: args.id },
    });
  },
};
