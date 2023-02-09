import type { APIRoute } from "astro";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const get: APIRoute = async function get({ request }) {
  let info = await prisma.info.findFirst({});
  if (!info) {
    info = await prisma.info.create({
      data: {
        visits: 0,
      },
    });
  }
  const visits = info.visits + 1;
  await prisma.info.update({
    where: { id: info.id },
    data: {
      visits: visits,
    },
  });

  return {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ visits }),
  };
};
