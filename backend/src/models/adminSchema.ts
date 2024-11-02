import mongoose, { Document, Schema } from "mongoose";

interface Admin extends Document {
  username: string;
  senha: string;
  role: string; // Geralmente será "admin"
}

const AdminSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' }, // Define o role como 'admin'
});

const AdminModel = mongoose.model<Admin>("Admin", AdminSchema);

export default AdminModel;
export type { Admin };
