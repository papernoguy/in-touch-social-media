//https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
const {connect, connection} = require("mongoose");

const connectToDatabase = () => {
    connect(
        `mongodb+srv://papernoguy:0XA9k12Y3iWI1hJa@clusterintouch.hdpgzhz.mongodb.net/?retryWrites=true&w=majority`,
        {

            useNewUrlParser: true,
            //useFindAndModify: false,
            useUnifiedTopology: true
        }
    );
    const db = connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("DB Connected successfully");
    });
}


module.exports = connectToDatabase;

