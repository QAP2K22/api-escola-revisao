const mongoose = require("mongoose")
require('dotenv/config');

async function main() {
    try {
        console.log("[DB STATUS]: INICIANDO")
        const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}${process.env.MONGO_DB_ADRESS}`;
        await mongoose.connect(uri);
        console.log("[DB STATUS]: CONECTADO E INICIADO")

    } catch (error) {
        console.log(`[DB STATUS]: ${error}`)
    }
}

module.exports = main