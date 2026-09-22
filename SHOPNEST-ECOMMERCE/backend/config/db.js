const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB connected succefully");
    }).catch(err => {
        console.log("Error in connecting DB");
        process.exit(1);
    })
}

module.exports = connectDB;