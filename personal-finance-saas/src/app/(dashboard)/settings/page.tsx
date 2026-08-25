"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Administra las preferencias de tu cuenta y suscripción.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil de Usuario</CardTitle>
            <CardDescription>Actualiza tu información personal y correo de contacto.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" defaultValue="Usuario de Prueba" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" defaultValue="usuario@correo.cl" disabled />
              <p className="text-xs text-muted-foreground">El correo está vinculado a tu cuenta principal.</p>
            </div>
            <Button>Guardar Cambios</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferencias de Moneda</CardTitle>
            <CardDescription>Define la moneda base de tus finanzas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Moneda Principal</p>
                <p className="text-sm text-muted-foreground">Actualmente: CLP (Peso Chileno)</p>
              </div>
              <Button variant="outline" disabled>Cambiar a USD</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificaciones y Alertas</CardTitle>
            <CardDescription>Configura cómo el Asesor IA se comunica contigo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas de Déficit</Label>
                <p className="text-sm text-muted-foreground">Recibir un correo si tus gastos superan tus ingresos.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Resumen Semanal</Label>
                <p className="text-sm text-muted-foreground">Reporte financiero generado por IA cada viernes.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Zona de Peligro</CardTitle>
            <CardDescription>Acciones destructivas para tu cuenta.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Eliminar mi Cuenta y Datos</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
