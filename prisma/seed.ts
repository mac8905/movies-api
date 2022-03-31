import { PrismaClient } from '@prisma/client';
import data from './data';
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.user.deleteMany();
    await prisma.movie.deleteMany();
    await prisma.user.createMany({
      data: data.users,
    });
    await prisma.movie.createMany({
      data: data.movies,
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
