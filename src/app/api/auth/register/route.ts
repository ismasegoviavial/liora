import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

export async function POST(req: Request) {
  try {
    const { name, email, password, accountType } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 })
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    })

    if (existingUser) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 400 })
    }

    // Crear el usuario real en la base de datos
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
        currency: "CLP",
        isPremium: false,
      }
    })

    // Crear la contraseña en la tabla Account
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")
    await prisma.account.create({
      data: {
        accountId: user.id,
        providerId: "credential",
        userId: user.id,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // Crear la sesión activa real
    const sessionToken = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días

    await prisma.session.create({
      data: {
        token: sessionToken,
        userId: user.id,
        expiresAt,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })

    // Guardar la cookie de sesión real segura
    response.cookies.set("liora_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/"
    })

    return response
  } catch (error: any) {
    console.error("Register Error:", error)
    return NextResponse.json({ error: "Error al crear la cuenta en el servidor" }, { status: 500 })
  }
}
