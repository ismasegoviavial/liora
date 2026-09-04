import { PrismaClient } from "@prisma/client"

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:/tmp/dev.db"
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

let prisma: PrismaClient

if (globalForPrisma.prisma) {
  prisma = globalForPrisma.prisma
} else {
  prisma = new PrismaClient()
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export { prisma }
export default prisma
