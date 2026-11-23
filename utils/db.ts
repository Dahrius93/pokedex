import { PrismaClient } from '@/lib/generated/prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const createClient = () => {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
  return new PrismaClient({ adapter })
}

// In sviluppo Next ricarica i moduli a ogni modifica: senza questo
// trucco creeresti un nuovo pool di connessioni a ogni salvataggio
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

const db = globalForPrisma.prisma ?? createClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export default db
