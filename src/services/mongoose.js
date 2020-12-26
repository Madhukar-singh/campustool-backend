const mongoose = require("mongoose");

mongoose.connection.on("connected", () => {
  console.log("MongoDB is connected");
});

mongoose.connection.on("error", (err) => {
  console.log(`Could not connect to MongoDB because of ${err}`);
  process.exit(-1);
});

if (process.environment === "dev") {
  mongoose.set("debug", true);
}

exports.connect = () => {
  var mongoURI = process.env.MONGO_URI;

  mongoose.connect(mongoURI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
};
