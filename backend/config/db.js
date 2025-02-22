import mongoose from "mongoose";

const connectToDB = async () => {
  await mongoose
    .connect(process.env.ATLAS)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log("Error in connecting DB", err.message);
    });
};

export default connectToDB;
