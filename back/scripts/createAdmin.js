const prisma = require('../prisma/client');
const { hashPassword } = require('../utils/hash');

async function main() {
  const email = 'm.kherraz@gmail.com'; // change this
  const password = 'test12345';  // change this
  const name = 'maroua kherraz';                  // change this

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log('Un admin avec cet email existe déjà.');
    return;
  }

  const passwordHash = await hashPassword(password);
  const admin = await prisma.admin.create({
    data: { email, passwordHash, name },
  });

  console.log('Admin créé avec succès:', admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());