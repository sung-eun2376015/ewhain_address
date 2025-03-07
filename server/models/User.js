import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  num: { type: String },
  team: { type: String },
  phoneNum: { type: String },
  address: { type: String },
  email: { type: String },
});

const User = mongoose.model('User', userSchema);

export default User;
