const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hashSync } = require("bcrypt");

async function main() {
  const account = await prisma.user.createMany({
    data: [
      //   {
      //     name: "Admin",
      //     role: "ADMIN",
      //     email: "admin@gmail.com",
      //     password: hashSync("123456", 10),
      //   },
      {
        name: "Customer",
        role: "CUSTOMER",
        email: "customer@gmail.com",
        password: hashSync("123456", 10),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
