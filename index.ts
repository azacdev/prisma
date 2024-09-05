import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
    },
  });

  return res.json(users);
});

app.get("/profile", async (req: Request, res: Response) => {
  const profiles = await prisma.profile.findMany({});

  return res.json(profiles);
});

app.get("/order", async (req: Request, res: Response) => {
  const profiles = await prisma.order.findMany({
    include: {
      user: true,
      product: true,
    },
  });

  return res.json(profiles);
});

app.get("/category", async (req: Request, res: Response) => {
  const category = await prisma.category.findMany();

  return res.json(category);
});

app.get("/product", async (req: Request, res: Response) => {
  const profiles = await prisma.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return res.json(profiles);
});

app.post("/", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      profile: {
        create: {
          name,
        },
      },
    },
  });

  return res.json(createdUser);
});

app.post("/profile/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const createdProfile = await prisma.profile.create({
    data: {
      name,
      user: {
        connect: {
          id,
        },
      },
    },
  });

  return res.json(createdProfile);
});

app.post("/category", async (req: Request, res: Response) => {
  const { name } = req.body;
  const createdUser = await prisma.category.create({
    data: {
      name,
    },
  });

  return res.json(createdUser);
});

app.post("/product", async (req: Request, res: Response) => {
  const { name, description, price, categoryId, orderId } = req.body;

  const createdProducts = await prisma.product.create({
    data: {
      name,
      description,
      price,
      category: {
        connect: {
          id: categoryId,
        },
      },
      // order: {
      //   connect: {
      //     id: orderId,
      //   },
      // },
    },
  });

  return res.json(createdProducts);
});

app.post("/order/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { productId } = req.body;

  const createdProfile = await prisma.order.create({
    data: {
      user: {
        connect: {
          id,
        },
      },
      product: {
        connect: {
          id: productId,
        },
      },
    },
  });

  return res.json(createdProfile);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
