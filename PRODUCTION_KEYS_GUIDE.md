# Guía de Configuración de Llaves de Producción

Esta guía explica cómo activar los cobros reales (Flow.cl / MercadoPago) y la sincronización bancaria real (Fintoc) en tu servidor de Vercel.

---

## 1. Variables de Entorno Requeridas

Ingresa a tu panel en [Vercel Dashboard](https://vercel.com/dashboard) ➔ **personal-finance-saas** ➔ **Settings** ➔ **Environment Variables** y agrega las siguientes llaves:

### 💳 Pasarela de Pagos (Flow.cl)
* `FLOW_API_KEY`: Tu llave API pública entregada por Flow.cl.
* `FLOW_SECRET_KEY`: Tu llave secreta entregada por Flow.cl.
* `FLOW_API_URL`: `https://www.flow.cl/api` *(Para producción real)*.
* `NEXT_PUBLIC_APP_URL`: `https://finanzaspro-chile.vercel.app`

### 🏦 Sincronización Bancaria (Fintoc)
* `FINTOC_API_KEY`: Tu llave real entregada por Fintoc (empieza con `pk_live_...`).

### 🤖 Asesor Financiero IA (Gemini)
* `GEMINI_API_KEY`: Tu llave de API de Google AI Studio.

---

## 2. Cómo Probar un Pago Real con Flow.cl

1. Una vez guardadas las llaves en Vercel, ve a `https://finanzaspro-chile.vercel.app/upgrade`.
2. Haz clic en **"Obtener Pro"** ($4.990 CLP).
3. La aplicación llamará al endpoint `/api/billing/subscribe` y redirigirá al usuario directamente al portal seguro de Webpay / Flow.
4. Al completarse el pago, Flow enviará la confirmación al webhook `/api/billing/webhook` y devolverá al usuario a tu Dashboard.

---

## 3. Pasos para Solicitar Llaves en Producción

1. **Flow.cl:** Registra tu empresa o RUT en [Flow.cl](https://www.flow.cl), ingresa a *Configuración ➔ Llaves API* y copia tu API Key y Secret Key.
2. **Fintoc:** Ingresa al dashboard de [Fintoc.com](https://fintoc.com), completa la verificación de tu empresa y solicita el cambio de Sandbox (`pk_test_`) a Producción (`pk_live_`).
