import type { PrismaClient, Prisma } from '@prisma/client';

export const Mutation = {
  register: (
    _parent: unknown,
    args: { input: Prisma.UserCreateInput },
    context: { orm: PrismaClient },
  ) => {
    return context.orm.user.create({
      data: {
        name: args.input.name,
        email: args.input.email,
        password: args.input.password,
      },
    });
  },
};
