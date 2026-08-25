# Guía de Despliegue en Google Cloud Platform (GCP)

Esta guía documenta los pasos para desplegar la plataforma FinanzasPro en GCP para ti y tu socio.

---

## 1. Conexión de Repositorio (Cloud Source Repositories)

Para compartir código entre computadores mediante la infraestructura de Google Cloud:

```bash
# Autenticarse en Google Cloud SDK
gcloud auth login

# Crear el repositorio en GCP
gcloud source repos create personal-finance-saas

# Agregar el remoto y subir el código
git remote add google https://source.developers.google.com/p/[TU_PROJECT_ID]/r/personal-finance-saas
git push --all google
```

---

## 2. Base de Datos Compartida (Cloud SQL PostgreSQL)

1. En la consola de GCP, ve a **Cloud SQL** y crea una instancia **PostgreSQL** (versión 15/16) de tipo `db-f1-micro`.
2. Actualiza tu archivo `.env`:

```env
DATABASE_URL="postgresql://postgres:[TU_PASSWORD]@[IP_DE_CLOUD_SQL]:5432/finanzaspro?schema=public"
```

3. Ejecuta la migración inicial:

```bash
npx prisma db push
```

---

## 3. Despliegue del Servidor Web (Cloud Run)

1. Compila la imagen en la nube usando **Cloud Build**:

```bash
gcloud builds submit --tag gcr.io/[TU_PROJECT_ID]/personal-finance-saas
```

2. Despliega en **Cloud Run**:

```bash
gcloud run deploy finanzaspro-web \
  --image gcr.io/[TU_PROJECT_ID]/personal-finance-saas \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL="postgresql://postgres:[PASSWORD]@[IP_SQL]:5432/finanzaspro"
```

---

## 4. Analíticas B2B (BigQuery)

El código del proyecto ya incluye el módulo `src/lib/bigquery.ts`. 

Cada vez que un usuario pase cerca de una tienda (ej: Haka Honu), el backend de **Cloud Run** transmitirá silenciosamente el evento a **BigQuery** para generar los reportes analíticos de tráfico y conversión que le venderás a las marcas.

1. Ve a **BigQuery** en la consola de GCP.
2. Crea el Dataset: `b2b_analytics`.
3. Crea la tabla: `deal_impressions` con el esquema (`dealId`, `companyName`, `userId`, `userLatitude`, `userLongitude`, `distanceMeters`, `timestamp`).
