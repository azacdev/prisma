import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Get Users
app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  return res.json(users);
});

// Create User
app.post("/", async (req: Request, res: Response) => {
  //   const { firstName, lastName, age } = req.body;
  const user = await prisma.user.create({
    data: req.body,
  });

  return res.json(user);
});

// Update User
app.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  //   const { firstName, lastName, age } = req.body;
  const user = await prisma.user.update({
    where: { id },
    data: req.body,
  });

  return res.json(user);
});

// Delete User
app.delete("/:id", async (req: Request, res: Response) => {
  let { id } = req.params;

  const user = await prisma.user.delete({
    where: { id },
  });

  return res.json(user);
});

// Get Houses
app.get("/house", async (req: Request, res: Response) => {
  const users = await prisma.house.findMany({
    include: {
      owner: true,
      builder: true,
    },
  });
  return res.json(users);
});

// Create House
app.post("/house", async (req: Request, res: Response) => {
  const { address, state, ownerId } = req.body;
  const house = await prisma.house.create({
    data: {
      address,
      state,
      owner: {
        connect: {
          id: ownerId,
        },
      },
      builder: {
        connect: {
          id: ownerId,
        },
      },
    },
  });

  return res.json(house);
});

// Update House
app.put("/house/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { address, state, ownerId, builderId } = req.body;
  const house = await prisma.house.update({
    where: { id },
    data: {
      address,
      state,
      owner: {
        connect: {
          id: ownerId,
        },
      },
      builder: {
        connect: {
          id: builderId,
        },
      },
    },
  });

  return res.json(house);
});

// Find House
app.get("/house/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const house = await prisma.house.findUnique({
    where: { id },
    include: {
      owner: true,
    },
  });

  return res.json(house);
});

// Filter House

app.get("/house/filter", async (req: Request, res: Response) => {
  const users = await prisma.house.findMany({
    where: {
      state: {
        not: null,
      },
      owner: {
        age: {
          gte: 20,
        },
      },
    },
    orderBy: [
      {
        owner: { firstName: "desc", createdAt: "asc" },
      },
    ],
    include: {
      owner: true,
      builder: true,
    },
  });
  return res.json(users);
});

app.listen(5000, () => {
  console.log(`Server is listening on port 5000`);
});
