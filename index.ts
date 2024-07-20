import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create user
  //   const user = await prisma.user.create({
  //     data: {
  //       name: "azacdev",
  //       email: "azacdev@gmail.com",
  //     },
  //   });
  //   console.log(user);
  // Get all users
  const users = await prisma.user.findMany({
    include: {
      articles: true,
    },
  });

  // console.log(users);
  // Create article and associate it with user
  //   const article = await prisma.article.create({
  //     data: {
  //       title: "Azacdev First Article",
  //       body: "This is johns azacdev first article",
  //       author: {
  //         connect: {
  //           id: 1,
  //         },
  //       },
  //     },
  //   });
    // console.log(article);
  // Get all articles
  const articles = await prisma.article.findMany();
  console.log(articles);
  // Create user and article and associate them
  // const user = await prisma.user.create({
  //   data: {
  //     name: "azacdev",
  //     email: "zac@gmail.com",
  //     articles: {
  //       create: {
  //         title: "Wubba lubba dub dub",
  //         body: "Wadda dog doing",
  //       },
  //     },
  //   },
  // });

  // console.log(user);

  // Loop over azacdev articles

  // users.forEach((user) => {
  //   console.log(`User: ${user.name}, Email: ${user.email}`);
  //   user.articles.forEach((article) => {
  //     console.log(`- Title: ${article.title}, Body: ${article.body}`);
  //   });
  //   console.log("\n");
  // });

  // Update data

  // const user = await prisma.user.update({
  //   where: {
  //     id: 1,
  //   },
  //   data: {
  //     name: "Monarch",
  //   },
  // });

  // console.log(user);

  // Remove data
  // const article = await prisma.article.delete({
  //   where: {
  //     id: 2,
  //   },
  // });
  // console.log(article);
  
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
