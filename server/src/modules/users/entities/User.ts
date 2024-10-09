import { Prisma } from "@prisma/client";

export type PrismaUser = Prisma.UserGetPayload<{}>;

export type PrismaUserSelect = Partial<PrismaUser>;

export type HasSufficientBalance = Record<"hasSufficientBalance", boolean>;

export type NewBalance = Record<"balance", number>;
