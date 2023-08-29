const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    firstName: {
      type: 'varchar',
    },
    lastName: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    phoneNumber: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
  },
});

module.exports = User;