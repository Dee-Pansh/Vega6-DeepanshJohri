const mongoose = require("mongoose");
require("dotenv").config();
const databaseConnection = async () => {
    await mongoose.connect(process.env.DB_URL);
}
module.exports = databaseConnection;