import type { PrismaClient, Prisma } from '@prisma/client';

export const Mutation = {
  register: (
    _parent: unknown,
    args: { input: Prisma.UserCreateInput },
    context: { orm: PrismaClient },
  ) => {
    return context.orm.user.create({
      data: {
        ...args.input,
      },
    });
  },

  createMovie: (
    _parent: unknown,
    args: { input: Prisma.MovieCreateInput },
    context: { orm: PrismaClient },
  ) => {
    return context.orm.movie.create({
      data: {
        ...args.input,
      },
    });
  },

  updateMovie: (
    _parent: unknown,
    args: { id: string; input: Prisma.MovieUpdateInput },
    context: { orm: PrismaClient },
  ) => {
    return context.orm.movie.update({
      where: { id: args.id },
      data: {
        ...args.input,
      },
    });
  },

  deleteMovie: (
    _parent: unknown,
    args: { id: string },
    context: { orm: PrismaClient },
  ) => {
    return context.orm.movie.delete({
      where: { id: args.id },
    });
  },
};
