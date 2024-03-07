const { DataTypes, Deferrable } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('item', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        score: {
            type: DataTypes.STRING,
            unique: 'compositeIndex' // Ensure this is the intended use, as 'compositeIndex' suggests part of a composite unique constraint.
        },
        ownerId: { // Use camelCase for consistency in JavaScript code. You can map this to a snake_case column in the database if needed.
            type: DataTypes.INTEGER,
            references: {
                model: 'users', // This should be the name of the table. Sequelize defaults to pluralized model names as table names.
                key: 'id',
            },
            // If you need to use deferrable constraints (specific to PostgreSQL):
            deferrable: Deferrable.INITIALLY_IMMEDIATE // Example usage, choose as needed.
        }
    }, {
        tableName: 'items', // Explicitly specify the table name if it doesn't match the pluralized model name.
        underscored: true, // If you prefer snake_case for your database columns, this option will automatically convert camelCased model fields to snake_case in the database.
    });
};


// DataTypes is a Sequelize module that encapsulates a variety of
//  data types that can be used to define the 
// attributes of your models in a Sequelize context. 
// These data types are necessary when defining your model schemas 
// because they specify the type of data each column should hold in the database.





// export model definer function 
// Each model definer function is expected to define a model (i.e., a table in 
// the database) by calling methods on the sequelize instance, such as define.




// 2. Sheet Music or Score
// In an orchestra, an item might represent a piece 
// of sheet music or a score that the orchestra has 
// in its library. Attributes could include the 
// title of the piece, composer, arrangement details, and which performances it has been used in.

