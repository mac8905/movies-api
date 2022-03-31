import type { PrismaClient, Prisma } from '@prisma/client';
import { isEmail, isValidPassword, generateToken } from '../util';

export const Mutation = {
  register: async (
    _: unknown,
    args: { input: Prisma.UserCreateInput },
    context: { orm: PrismaClient },
  ) => {
    const { email, password } = args.input;

    await validateEmail(email, context);

    if (!isValidPassword(password)) {
      throw new Error(
        'Password must contain at least 10 characters, one lowercase letter, one uppercase letter, and one of the following characters: !, @, #, ? or ]',
      );
    }

    // TODO: hash password with bcrypt
    return context.orm.user.create({ data: args.input });
  },

  login: async (
    _: unknown,
    args: { input: Prisma.UserCreateInput },
    context: { orm: PrismaClient },
  ) => {
    const { email, password } = args.input;
    const user = await getUserByEmail(context, email);
    const message = 'Invalid email or password';

    if (!user) {
      throw new Error(message);
    }

    // TODO: compare password with bcrypt
    if (password !== user.password) {
      throw new Error(message);
    }

    return {
      userId: user.id,
      token: generateToken(user.id),
    };
  },

  createMovie: (
    _: unknown,
    args: { input: Prisma.MovieCreateInput },
    context: { orm: PrismaClient; userId: string },
  ) => {
    if (!context.userId) {
      throw new Error('You are not authenticated');
    }

    return context.orm.movie.create({
      data: {
        ...args.input,
      },
    });
  },

  updateMovie: (
    _: unknown,
    args: { id: string; input: Prisma.MovieUpdateInput },
    context: { orm: PrismaClient; userId: string },
  ) => {
    if (!context.userId) {
      throw new Error('You are not authenticated');
    }

    return context.orm.movie.update({
      where: { id: args.id },
      data: {
        ...args.input,
      },
    });
  },

  deleteMovie: (
    _: unknown,
    args: { id: string },
    context: { orm: PrismaClient; userId: string },
  ) => {
    if (!context.userId) {
      throw new Error('You are not authenticated');
    }

    return context.orm.movie.delete({
      where: { id: args.id },
    });
  },
};

async function validateEmail(email: string, context: { orm: PrismaClient }) {
  if (!isEmail(email)) {
    throw new Error('Invalid email address');
  }

  if (await getUserByEmail(context, email)) {
    throw new Error('Email address already in use');
  }
}

async function getUserByEmail(context: { orm: PrismaClient }, email: string) {
  return await context.orm.user.findUnique({ where: { email } });
}
