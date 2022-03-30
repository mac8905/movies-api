import faker from '@faker-js/faker';
import { Genre, Visibility } from '@prisma/client';

const Genres = [
  Genre.ACTION,
  Genre.COMEDY,
  Genre.DRAMA,
  Genre.FANTASY,
  Genre.HORROR,
];
const Visibilities = [Visibility.PUBLIC, Visibility.PRIVATE];
const Languages = ['ENGLISH', 'FRENCH', 'SPANISH', 'ITALIAN'];
const users = [];
const movies = [];

for (let i = 0; i < 5; i++) {
  users.push({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
}

for (let i = 0; i < 20; i++) {
  movies.push({
    id: faker.datatype.uuid(),
    title: faker.name.title(),
    genres: faker.random.arrayElements(Genres),
    language: faker.random.arrayElement(Languages),
    year: faker.datatype.number({ min: 1900, max: 2022 }),
    visibility: faker.random.arrayElement(Visibilities),
    addedBy: faker.random.arrayElement(users).id,
  });
}

export default {
  users,
  movies,
};
