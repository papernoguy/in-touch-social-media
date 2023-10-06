//https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
//const {connect, connection} = require("mongoose");
const mongoose = require('mongoose').default;


const connectToDatabase = () => {
    mongoose.connect(
        `mongodb+srv://papernoguy:0XA9k12Y3iWI1hJa@clusterintouch.hdpgzhz.mongodb.net/?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(r => console.log("DB Connected successfully"));

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {

    });
}
const disconnectFromDatabase = async () => {
    try {
        await mongoose.disconnect();
        console.log("DB Disconnected successfully");
    } catch (error) {
        console.error("Error disconnecting from the database:", error);
    }
};


module.exports = { connectToDatabase, disconnectFromDatabase };

