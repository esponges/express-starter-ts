// import { Schema, model } from 'mongoose';
// import bcrypt from 'bcryptjs';
// import { IUser } from '../types/user.types';
// import { config } from '../config';

// const userSchema = new Schema<IUser>(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     firstName: {
//       type: String,
//       trim: true,
//     },
//     lastName: {
//       type: String,
//       trim: true,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       transform: (_, ret) => {
//         delete ret.password;
//         return ret;
//       },
//     },
//   }
// );

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt(config.saltRounds);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error as Error);
//   }
// });

// // Method to compare password
// userSchema.methods.comparePassword = async function (
//   candidatePassword: string
// ): Promise<boolean> {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// export const User = model<IUser>('User', userSchema);
