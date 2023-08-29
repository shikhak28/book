
module.exports = (sequelize ,DataTypes) =>{
    const School = sequelize.define("schools",{
        schoolId:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,
        },
        name:{
            type:DataTypes.STRING,
            allownull:false
        }
    });
    return School;
}