import prisma from "./prisma";

export const getStoresByUserId = async (userId: string) => {
  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  });

  return stores;
};
