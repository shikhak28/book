module.exports = (sequelize ,DataTypes) => {
    const User = sequelize.define("users",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey:true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },

        }
    );
      
  
    return User;

}

