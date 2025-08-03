import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // إنشاء مستخدم تجريبي
  const user = await prisma.user.create({
    data: {
      name: 'مستخدم تجريبي',
      email: 'test@hajzify.com',
      password: 'password123',
      desk360AccountId: 'test-account-id',
      desk360ApiKey: 'test-api-key',
      desk360Phone: '+966500000000'
    }
  });

  // إنشاء موعد تجريبي
  await prisma.appointment.create({
    data: {
      date: new Date(),
      userId: user.id
    }
  });

  console.log('تم إنشاء البيانات التجريبية بنجاح');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
