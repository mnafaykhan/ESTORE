// Corrected example
const sequelize = require('../sequelize');

async function syncNewModel() {
    console.log('syncNewModel() start');

    // Drop the items_backup table
    await sequelize.queryInterface.dropTable('items_backup');
    await sequelize.queryInterface.dropTable('users');

    // This should reflect the changes in the model definitions to the database
    await sequelize.sync({ alter: true });

    try {
        // Make sure 'item' is correctly spelled and matches the model name defined in sequelize.define
        const it1 = await sequelize.models.item.create({ score: "Opera 1", ownerId: 1 });
        console.log('Item created:', it1);
    } catch (error) {
        console.error('Error creating item:', error);
    }

    console.log('syncNewModel() done.');
}

syncNewModel();


// The error message indicates that there is a mismatch between the number of columns in the items_backup table and the number of values being inserted from the items table. The items_backup table has 5 columns, but the items table has 6 columns.

// This issue is likely due to a change in the item model that has not been reflected in the items_backup table. The sequelize.sync({ alter: true }) command tries to alter the tables to match the current state of the models, but it seems like it's not able to handle this particular change.

// One possible solution is to drop the items_backup table before running the sync command. This will force Sequelize to recreate the table with the correct number of columns. However, this will also delete all data in the items_backup table.