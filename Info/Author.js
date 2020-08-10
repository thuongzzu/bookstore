const { Text, Relationship } = require("@keystonejs/fields");

const Author = {
 
  fields: {
    name: { type: Text, isRequired: true },
    books: { type: Relationship, ref: "Book.author", many: true },
  },
};

module.exports = {
  Author,
};