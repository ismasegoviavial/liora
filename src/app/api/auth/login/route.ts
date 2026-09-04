import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Correo y contraseña son obligatorios" }, { status: 400 })
    }

    const cleanEmail = email.toLowerCase().trim()

    // Buscar usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail }
    })

    if (!user) {
      return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 })
    }

    // Verificar la contraseña en Account
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")
    const account = await prisma.account.findFirst({
      where: {
        userId: user.id,
        password: hashedPassword
      }
    })

    if (!account) {
      return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 })
    }

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
    console.error("Login Error:", error)
    return NextResponse.json({ error: "Error al iniciar sesión" }, { status: 500 })
  }
}
