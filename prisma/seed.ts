// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// async function main() {
//   const books = await prisma.category.upsert({
//     where: { id: 1 },
//     update: {},
//     create: {
//       name: 'Books',
//       products: {
//         create: {
//           name: clean('Lord of the mysteries'),
//           price: 100000,
//           stock: 10,
//         },
//       },
//     },
//   });
//   const movies = await prisma.category.upsert({
//     where: { id: 2 },
//     update: {},
//     create: {
//       name: 'Movies',
//       products: {
//         create: {
//           name: clean('Lord of the ring'),
//           price: 120000,
//           stock: 5,
//         },
//       },
//     },
//   });
//   console.log(books, movies);
// }

// function clean(input: string) {
//   return input.replace(/\0/g, ''); // hapus karakter null byte
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          published: true,
        },
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: true,
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            published: true,
          },
        ],
      },
    },
  });
  const books = await prisma.category.upsert({
    where: { name: 'Books' },
    update: {},
    create: {
      name: 'Books',
      products: {
        create: {
          name: 'Lord of the mysteries',
          price: 100000,
          stock: 10,
        },
      },
    },
  });
  const movies = await prisma.category.upsert({
    where: { name: 'Books' },
    update: {},
    create: {
      name: 'Movies',
      products: {
        create: {
          name: 'Lord of the ring',
          price: 120000,
          stock: 5,
        },
      },
    },
  });
  console.log({ alice, bob });
  console.log({ books, movies });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
