const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { Book } = require("./Info/Book")
const { Category } = require("./Info/Category")
const { Author } = require("./Info/Author")
const { User } = require("./Info/User")

const PROJECT_NAME = 'bookstore';
const adapterConfig = { mongoUri: 'mongodb://localhost:27017/bookstore' };


/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
});
console.log(Book);
keystone.createList("Book", Book);
keystone.createList("Author", Author);
keystone.createList("Category", Category);
keystone.createList("User", User);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: {
    identityField: "username",
    secretField: "password",
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({ name: PROJECT_NAME, enableDefaultRoute: true, authStrategy}) 
    
  ],
};
