'use strict';
const { Model} = require('sequelize');
const db = require('./index');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
    //  console.log(models);
      // define association here
      Book.belongsTo(models.Authors,{foreignKey : "authorId"});
      Book.belongsTo(models.Library,{foreignKey : "libraryId"});

    }
  };
  Book.init({
    bookId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    sequelize,
    modelName:'Book',
    tableName:'books'
  });

    // const Book = sequelize.define("books", {
    //   bookId: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey:true,
    //   },
    //   title: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //   },
      
    // });
    return Book;
};