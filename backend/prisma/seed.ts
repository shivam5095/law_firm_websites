import '../src/config/loadEnv';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email) {
    throw new Error('ADMIN_EMAIL environment variable is required.');
  }

  if (!password) {
    throw new Error('ADMIN_PASSWORD environment variable is required.');
  }

  if (password.length < 12) {
    throw new Error('ADMIN_PASSWORD must be at least 12 characters long.');
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
