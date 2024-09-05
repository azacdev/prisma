import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // create user
    const user = await prisma.user.create({
      data: {
        name: "Azacdev",
        email: "azacdev@gmail.com",
      },
    });
    console.log(user);
  // get user
  const AllUsers = await prisma.user.findMany({
    include: {
      articles: true,
    },
  });
  console.log(AllUsers);
  // create article
  const article = await prisma.article.create({
    data: {
      title: "Monarch Secong Blog",
      body: "Wubba Lubba Dub Dub",
      authorId: 2,
    },
  });
  const article = await prisma.article.create({
    data: {
      title: "Monarch Blog",
      body: "Monarchs description or body",
      author: {
        connect: {
          id: 1,
        },
      },
    },
  });
  console.log(article);
  // get article
  // const articles = await prisma.article.findMany();
  const articles = await prisma.article.findMany({
    include: {
      author: true,
    },
  });
  console.log(articles);
  // create user and article
  const user = await prisma.user.create({
    data: {
      name: "Monarch",
      email: "monarch@gmail.com",
      articles: {
        create: {
          title: "Monarchs Blog",
          body: "Relationships are not as hard as i thought",
        },
      },
    },
  });
  console.log(user);

  // Loop over users articles

  AllUsers.forEach((user) => {
    console.log(`Name: ${user.name}  Email: ${user.email}`);
    console.log("Articles:");
    user.articles.forEach((article) => {
      console.log(`- Title: ${article.title}, Body: ${article.body}`);
    });

    console.log("\n");
  });
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
