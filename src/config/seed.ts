import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/users.js';
import { UserRole } from '../modules/auth/auth.roles.js';
import "dotenv/config";

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI!);

  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD!;
  const adminName = process.env.ADMIN_NAME!

  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL or ADMIN_PASSWORD not set');
  }

  const exists = await UserModel.findOne({ name: adminName });

  if (exists) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await UserModel.create({
    name: adminName,
    email: adminEmail,
    password: hashedPassword,
    role: UserRole.SEED_ADMIN || "Admin",
    age: 20
  });

  console.log('Admin created successfully');
  process.exit(0);
}

seedAdmin().catch(err => {
  console.error(err);
  process.exit(1);
});