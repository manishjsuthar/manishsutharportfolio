const { connect } = require("mongoose");

const connectDb = async () => {
  try {
    await connect(
      "mongodb+srv://suthar123:suthar123@cluster0.hviqt.mongodb.net/Portfolio?retryWrites=true&w=majority"
    );
    console.log("Mongodb connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDb };
