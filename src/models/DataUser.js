import { Schema, model } from "mongoose";

const dataUserSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    document: {type: String, required: true, unique: true},
    phone: { type: String, required: true },
});

const DataUser = model("DataUser", dataUserSchema);
export default DataUser;