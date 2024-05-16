# Sie Waka

### Requirements

- [NVM](https://github.com/nvm-sh/nvm) to set up the node version used by the app.
- [Yarn](https://yarnpkg.com/) to manage node dependencies.

### Setup

1. Install node dependencies.
   1. Run `nvm use` to configure the node version used by the app.
   2. Run `yarn install` to install all node dependencies.
2. Set up the database and run schema migrations.
   1. Bring up the PostgreSQL database.
   2. Run `npx prisma migrate deploy` to run all schema migrations. \*
   3. Run `npx prisma db seed` to seed the db.

### Run the app

1. Run `nvm use` to configure the node version used by the app.
2. Run `yarn dev` to start the app at http://localhost:3000.

- note: format for Db connection string is postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
