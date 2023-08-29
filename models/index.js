const {Sequelize ,DataTypes} = require("sequelize");

const env = require("dotenv").config();
//instance defining database connection
const sequelize = new Sequelize(process.env.DB_name, process.env.DB_USER,process.env.DB_PASSWORD, {
    host:process.env.DB_HOST,
    dialect:"mysql",
    logging: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
})

//authenticating connection
    sequelize
    .authenticate()
    .then(() => {
        console.log(`connected.. to.${process.env.DB_name}`);
    })
    .catch((err) => {
        console.log("Error" + err);
    });
  //  console.log('starting');

 const Books = require("./BookModels")(sequelize, DataTypes);
 const Authors = require("./AuthorModels")(sequelize,DataTypes);
 const Library = require("./LibraryModels")(sequelize, DataTypes);
 const School = require("./SchoolModels")(sequelize, DataTypes); 
 const users = require("./usermodel")(sequelize, DataTypes);


 //defining models
 const models = {
    Books,Authors,Library,School,users
 };

const db ={...models,
};
    db.sequelize = sequelize;   

//defineing models
    /* 
db.users = require("./usermodel")(sequelize, DataTypes);
db.Books = require("./BookModels")(sequelize, DataTypes);
db.Authors = require("./AuthorModels")(sequelize,DataTypes);
db.Library = require("./LibraryModels")(sequelize, DataTypes);
db.School = require("./SchoolModels")(sequelize, DataTypes); */




// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

   
// db.Books.belongsTo(db.Authors,{foreignKey : "authorId"});
// db.Books.belongsTo(db.Library,{foreignKey : "libraryId"});

// db.Books.belongsToMany(db.Library, { through: "BookLibrary", foreignKey: "bookId" });
// db.Library.belongsToMany(db.Books, { through: "BookLibrary", foreignKey: "libraryId" });

// db.Books.belongsTo(db.Library, { foreignKey: 'libraryId' });
// db.Library.hasMany(db.Books, { foreignKey: 'libraryId' });


db.sequelize.sync({ force: false }).then(() => {
    console.log("yes re-sync done!");
    
  }); 

module.exports = db;
