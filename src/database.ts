import mongoose from "mongoose"

export async function database(): Promise<typeof mongoose> {
  console.log("connecting to database");
  return mongoose.connect("mongodb://root:pass@localhost:27017/?authMechanism=DEFAULT");
}