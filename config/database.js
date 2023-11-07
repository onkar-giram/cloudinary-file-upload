const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Database up and running"))
    .catch((err) => {
      console.error(`Error while database connection: ${err}`);
      process.exit(1);
    });
};

module.exports = connectDB;
