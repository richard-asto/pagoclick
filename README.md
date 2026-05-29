# PagoClick

Plataforma de e-commerce con procesamiento de pagos en línea, desarrollada con React + Node.js + MySQL. Permite a usuarios registrados explorar productos, gestionar un carrito de compras y realizar pagos con tarjeta de crédito via Stripe.

---

## Tecnologías

**Frontend**
- React 18 + Vite
- React Router DOM
- Axios
- Stripe.js (@stripe/react-stripe-js)
- React Toastify
- Context API (AuthContext, CartContext)

**Backend**
- Node.js + Express 5
- Sequelize ORM
- MySQL 8 (Aiven Cloud)
- JSON Web Tokens (JWT)
- bcrypt
- Stripe SDK
- Helmet + CORS + express-rate-limit

**Deploy**
- Frontend: Render (Static Site)
- Backend: Render (Web Service)
- Base de datos: Aiven Cloud (MySQL)

---

## Estructura del proyecto

```
pagoclick/
├── client/                         # Frontend React
│   ├── public/
│   │   └── _redirects              # Redirect rules para React Router en Render
│   └── src/
│       ├── api/
│       │   └── axios.js            # Instancia Axios con interceptores
│       ├── components/
│       │   ├── Layout/
│       │   ├── Navbar/
│       │   ├── ProductCard/
│       │   └── ProtectedRoute/
│       │       ├── AdminRoute.jsx
│       │       └── ProtectedRoute.jsx
│       ├── context/
│       │   ├── AuthContext.jsx     # Manejo de sesión de usuario
│       │   └── CartContext.jsx     # Carrito por usuario
│       ├── pages/
│       │   ├── AdminOrders/
│       │   ├── Cart/
│       │   ├── Checkout/
│       │   ├── Dashboard/          # Panel de administración
│       │   ├── Home/
│       │   ├── Login/
│       │   ├── Orders/
│       │   ├── Register/
│       │   └── Success/
│       ├── routes/
│       │   └── AppRoutes.jsx
│       └── services/
│           ├── authService.js
│           ├── orderService.js
│           ├── paymentService.js
│           └── productService.js
│
└── server/                         # Backend Node.js
    └── src/
        ├── config/
        │   ├── db.js               # Conexión Sequelize con SSL
        │   └── stripe.js
        ├── controllers/
        │   ├── auth.controller.js
        │   ├── order.controller.js
        │   ├── payment.controller.js
        │   ├── product.controller.js
        │   └── refund.controller.js
        ├── middlewares/
        │   ├── auth.middleware.js  # Verificación JWT
        │   └── admin.middleware.js # Verificación rol admin
        ├── models/
        │   ├── index.js            # Asociaciones entre modelos
        │   ├── Order.js
        │   ├── Payment.js
        │   ├── Product.js
        │   └── User.js
        ├── routes/
        │   ├── auth.routes.js
        │   ├── order.routes.js
        │   ├── payment.routes.js
        │   ├── product.routes.js
        │   └── refund.routes.js
        ├── services/
        │   ├── auth.service.js
        │   ├── order.service.js
        │   ├── payment.service.js
        │   └── product.service.js
        ├── utils/
        │   └── jwt.js
        ├── app.js
        └── server.js
```

---

## Instalación local

### Requisitos previos
- Node.js >= 18
- MySQL corriendo localmente
- Cuenta de Stripe (modo test)

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/pagoclick.git
cd pagoclick
```

### 2. Configurar el backend

```bash
cd server
npm install
```

Crear el archivo `server/.env`:

```env
PORT=5000
NODE_ENV=development

# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=pagoclick
DB_USER=tu_usuario
DB_PASSWORD=tu_password

# JWT
JWT_SECRET=un_string_largo_y_aleatorio

# Stripe
STRIPE_SECRET_KEY=sk_test_...

# CORS
CLIENT_URL=http://localhost:5173
```

Iniciar el servidor:

```bash
npm run dev
```

### 3. Configurar el frontend

```bash
cd client
npm install
```

Crear el archivo `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

Iniciar el frontend:

```bash
npm run dev
```

---

## API Endpoints

### Autenticación
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registro de usuario | No |
| POST | `/api/auth/login` | Login, retorna JWT | No |

### Productos
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/products` | Listar productos | No |
| POST | `/api/products` | Crear producto | Admin |
| PUT | `/api/products/:id` | Editar producto | Admin |
| DELETE | `/api/products/:id` | Eliminar producto | Admin |

### Órdenes
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/orders` | Crear orden | Usuario |
| GET | `/api/orders/my-orders` | Órdenes del usuario | Usuario |
| GET | `/api/orders` | Todas las órdenes | Admin |

### Pagos
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/payments/create-payment-intent` | Crear intento de pago Stripe | Usuario |

### Reembolsos
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/refunds/:orderId` | Reembolsar orden | Admin |

---

## Modelos de base de datos

```
User
  id, name, email, password (bcrypt), role (admin/client)

Product
  id, name, description, price, image, stock

Order
  id, total, status (pending/paid/refunded/cancelled), paymentIntentId, userId

Payment
  id, orderId, stripePaymentId, amount, status
```

---

## Flujo de pago

1. El usuario agrega productos al carrito
2. En Checkout se crea una orden en el backend con el total calculado en el servidor
3. El backend genera un `PaymentIntent` en Stripe usando el total de la DB (no del cliente)
4. El frontend confirma el pago con el `clientSecret` retornado
5. Stripe procesa el pago y el backend actualiza el estado de la orden a `paid`

---

## Roles

| Rol | Permisos |
|-----|----------|
| `client` | Ver productos, gestionar carrito, realizar pagos, ver sus órdenes |
| `admin` | Todo lo anterior + crear/editar/eliminar productos, ver todas las órdenes, gestionar reembolsos |

---

## Deploy en Render

### Backend (Web Service)
```
Root Directory:   server
Build Command:    npm install
Start Command:    npm start
```

Variables de entorno en Render:
```
NODE_ENV=production
PORT=5000
JWT_SECRET=...
STRIPE_SECRET_KEY=sk_live_...
CLIENT_URL=https://pagoclick-client.onrender.com
DB_HOST=...aivencloud.com
DB_PORT=...
DB_NAME=pagoclick
DB_USER=...
DB_PASSWORD=...
```

### Frontend (Static Site)
```
Root Directory:    client
Build Command:     npm install && npm run build
Publish Directory: dist
```

Variables de entorno en Render:
```
VITE_API_URL=https://pagoclick-api.onrender.com/api
VITE_STRIPE_PUBLIC_KEY=pk_live_...
```

---

## Seguridad implementada

- Contraseñas hasheadas con bcrypt (salt 10)
- Autenticación via JWT con expiración
- CORS restringido al dominio del frontend
- Cabeceras HTTP seguras con Helmet
- Rate limiting en rutas de autenticación (10 intentos / 15 min)
- Monto del pago validado desde la base de datos, no desde el cliente
- Rutas protegidas por rol en frontend y backend
- Variables sensibles en variables de entorno, nunca en el código
- SSL obligatorio en conexión a base de datos (Aiven)
- Tokens almacenados en sessionStorage
- Interceptor de 401 para cierre de sesión automático al expirar el token
