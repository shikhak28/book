'use strict';
const { Model} = require('sequelize');
const db = require('./index'); 

module.exports = (sequelize ,DataTypes) =>{
  class Library extends Model {

    static associate(models) {
      // define association here
   
      // db.Books.belongsTo(db.Library, { foreignKey: 'libraryId' });
     Library.hasMany(models.Books, { foreignKey: 'libraryId' });
     //Library.belongsToMany(models.Books, { through: "BookLibrary", foreignKey: "libraryId" });

    }
  
  };
  Library.init({
    libraryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },{
    sequelize,
    modelName:'Library',
    tableName:'libraries'
  });

    /* const Library = sequelize.define("library", {
      libraryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }); */
    // Library.associate = (models) => {
    //   Library.belongsToMany(models.Book, { through: "BookLibrary", foreignKey: "libraryId" });
    //   Library.hasMany(models.Book, { foreignKey: 'libraryId' });

    // };
    return Library;
};