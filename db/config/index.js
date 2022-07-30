const { connect } = require("mongoose");

const connectDb = async () => {
  try {
    await connect(
      process.env.NEXT_PUBLIC_MONGODB_URI
    );
    console.log("Mongodb connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDb };
