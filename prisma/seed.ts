import prisma from "../src/lib/prisma"

async function main() {
  const defaultCategories = [
    // Income
    { name: 'Sueldo', type: 'income', icon: '💰', isDefault: true },
    { name: 'Freelance / Independiente', type: 'income', icon: '💻', isDefault: true },
    { name: 'Inversiones', type: 'income', icon: '📈', isDefault: true },
    { name: 'Arriendos', type: 'income', icon: '🏠', isDefault: true },
    { name: 'Bonos', type: 'income', icon: '🎁', isDefault: true },
    { name: 'Otros Ingresos', type: 'income', icon: '💵', isDefault: true },
    // Expense
    { name: 'Vivienda (Arriendo/Dividendo)', type: 'expense', icon: '🏠', isDefault: true },
    { name: 'Cuentas Básicas (Luz, Agua, Gas)', type: 'expense', icon: '💡', isDefault: true },
    { name: 'Supermercado', type: 'expense', icon: '🛒', isDefault: true },
    { name: 'Transporte (Bencina/Bip)', type: 'expense', icon: '🚌', isDefault: true },
    { name: 'Salud y Farmacia', type: 'expense', icon: '💊', isDefault: true },
    { name: 'Educación', type: 'expense', icon: '📚', isDefault: true },
    { name: 'Entretenimiento y Restaurantes', type: 'expense', icon: '🍽️', isDefault: true },
    { name: 'Ropa y Calzado', type: 'expense', icon: '👕', isDefault: true },
    { name: 'Cuidado Personal', type: 'expense', icon: '💅', isDefault: true },
    { name: 'Mascotas', type: 'expense', icon: '🐾', isDefault: true },
    { name: 'Seguros', type: 'expense', icon: '🛡️', isDefault: true },
    { name: 'Pago de Deudas', type: 'expense', icon: '💳', isDefault: true },
    { name: 'Ahorro / Inversión', type: 'expense', icon: '🏦', isDefault: true },
    { name: 'Regalos y Donaciones', type: 'expense', icon: '🎁', isDefault: true },
    { name: 'Otros Gastos', type: 'expense', icon: '💸', isDefault: true }
  ]

  console.log('Seeding default categories...')
  for (const cat of defaultCategories) {
    await prisma.category.upsert({
      where: {
        userId_name_type: {
          userId: 'system', // Use a dummy system string, but our schema allows null. 
          // Wait, Prisma unique constraint on [userId, name, type] when userId is null 
          // can be tricky in Postgres. It's better to omit it from upsert and just use findFirst, 
          // or just deleteMany { isDefault: true } and createMany.
        }
      },
      update: {},
      create: cat
    })
  }
}
// Replacing upsert with deleteMany and createMany for simplicity
async function seed() {
  const defaultCategories = [
    // Income
    { name: 'Sueldo', type: 'income', icon: '💰', isDefault: true },
    { name: 'Freelance / Independiente', type: 'income', icon: '💻', isDefault: true },
    { name: 'Inversiones', type: 'income', icon: '📈', isDefault: true },
    { name: 'Arriendos', type: 'income', icon: '🏠', isDefault: true },
    { name: 'Bonos', type: 'income', icon: '🎁', isDefault: true },
    { name: 'Otros Ingresos', type: 'income', icon: '💵', isDefault: true },
    // Expense
    { name: 'Vivienda (Arriendo/Dividendo)', type: 'expense', icon: '🏠', isDefault: true },
    { name: 'Cuentas Básicas (Luz, Agua, Gas)', type: 'expense', icon: '💡', isDefault: true },
    { name: 'Supermercado', type: 'expense', icon: '🛒', isDefault: true },
    { name: 'Transporte (Bencina/Bip)', type: 'expense', icon: '🚌', isDefault: true },
    { name: 'Salud y Farmacia', type: 'expense', icon: '💊', isDefault: true },
    { name: 'Educación', type: 'expense', icon: '📚', isDefault: true },
    { name: 'Entretenimiento y Restaurantes', type: 'expense', icon: '🍽️', isDefault: true },
    { name: 'Ropa y Calzado', type: 'expense', icon: '👕', isDefault: true },
    { name: 'Cuidado Personal', type: 'expense', icon: '💅', isDefault: true },
    { name: 'Mascotas', type: 'expense', icon: '🐾', isDefault: true },
    { name: 'Seguros', type: 'expense', icon: '🛡️', isDefault: true },
    { name: 'Pago de Deudas', type: 'expense', icon: '💳', isDefault: true },
    { name: 'Ahorro / Inversión', type: 'expense', icon: '🏦', isDefault: true },
    { name: 'Regalos y Donaciones', type: 'expense', icon: '🎁', isDefault: true },
    { name: 'Otros Gastos', type: 'expense', icon: '💸', isDefault: true }
  ]

  console.log('Seeding default categories...')
  
  // Clean up existing defaults to avoid duplicates if run multiple times
  await prisma.category.deleteMany({
    where: { isDefault: true, userId: null }
  })

  await prisma.category.createMany({
    data: defaultCategories
  })
  
  console.log('Done!')
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
