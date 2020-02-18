# Express & ArangoDB REST API boilerplate

Basic Express boilerplate setup for REST API using ArangoDB

## Features
- JWT Authentication using [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
- Password encryption using [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
- Environment variables using [dotenv](https://github.com/motdotla/dotenv#dotenv)
- Route validation using [validate.js](https://validatejs.org/)
- [Helmet](https://helmetjs.github.io/) integration for setting up HTTP headers
- [ESLint](https://eslint.org/) / [Prettier](https://prettier.io/) for code formatting
- [Nodemon](https://nodemon.io/) for automatic server reload on save

## Usage
Install dependencies
```bash
yarn install
# OR
npm install
```
Start Server
```bash
yarn dev
# OR
npm run dev
```

Create a `.env` file (see `.env.example`)
```
# ARANGODB
DB_ROOT_PASSWORD=1234 #Used for docker-compose.yml
DB_NAME=example
DB_USERNAME=root
DB_PASSWORD=1234

# JWT
JWT_SECRET=my_secret_key
```

## Directory Structure

```
src/
    config/         Server and database configurations
    helpers/        Helper methods for repeated procedures
    middlewares/    Middleware routes
    models/         App models
    resolvers/      Database queries etc.
    routes/         Create your routes and param validations here
