const { DataTypes } = require('sequelize');
/**
 * Data Types
 * https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
 * 
 */
module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
     
    },
    {
      //tableName: 'Category', //Nếu không khai báo thì tên table = tên Model (thêm s số nhiều)
      timestamps: true, //https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
    }
  );

  return Category;
};
