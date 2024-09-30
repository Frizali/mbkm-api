const columnRepo = require('../repository/column.repository');
const menuRepo = require("../repository/menu.repository");

async function getColumnSetup(type,accessId) {
    accessId = parseInt(accessId);
    let access = await menuRepo.getAccessByID(accessId);
    if (!access) throw new Error('Sorry, you dont have access');

    const column = await columnRepo.getColumnSetup(type, accessId);
    const visibility = column.reduce((acc, item) => {
        acc[item.field] = item.visibility === 1;
        return acc;
    }, {});

    return {column, visibility};
}

async function updateWidthColumn(column) {
    return await columnRepo.updateWidthColumn(column.id,column.width);
}

module.exports = {
    getColumnSetup,
    updateWidthColumn
}