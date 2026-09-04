import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@lawfirm.com';
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error('Error: ADMIN_PASSWORD environment variable is not defined.');
    console.log('Skipping seed or please define ADMIN_PASSWORD in your backend/.env file.');
    process.exit(1);
  }

  console.log(`Starting seeding for admin user: ${email}...`);

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log(`Admin user ${email} already exists. Skipping creation.`);
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const admin = await prisma.adminUser.create({
    data: {
      name: 'Advocate Admin',
      email,
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log(`Admin user created successfully with ID: ${admin.id}`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
