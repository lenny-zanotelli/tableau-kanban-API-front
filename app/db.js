const { Sequelize } = require('sequelize');

const PG_URL = process.env.PG_URL || "postgres://okanban:okanban@localhost:5432/okanban";

const defineAttributes = {
    define: {
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
}

const sequelize = new Sequelize(PG_URL, defineAttributes) // Example for postgres

module.exports = sequelize;