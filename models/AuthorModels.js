'use strict';
const { Model} = require('sequelize');
//  const {Book,Author,Library} = require('../models/index');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) {
      // define association here
       Author.hasMany(models.Books,{foreignKey : "authorId"});
    }
    
  };
  Author.init({
      authorId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },{
      sequelize,
      modelName:'Author',
      tableName:'authors'
    });
   

    // const Author = sequelize.define("authors", {
    //   authorId: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey:true,
    //   },
    //   name: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //   },
    //   bio: {
    //     type: DataTypes.TEXT,
    //     allowNull: true,
    //   },
    // });

    
    return Author;
};