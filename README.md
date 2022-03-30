# movies-api

HTTP server api for performing CRUD operations on movies.

## Model

![movies-class-diagram](class-diagram.svg)

## How to start the api

1. Install dependencies `yarn`
2. Run docker db container `docker-compose up -d`
3. Run migration `yarn migrate:dev`
4. Seed db `yarn migrate:seed`
5. Start server `yarn dev`
