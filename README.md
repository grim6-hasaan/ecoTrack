# EcoTrack 🌿

A full-stack **Supply Chain Transparency Platform** built with the MERN stack. EcoTrack enables businesses to showcase their products' journey from raw materials to final delivery, empowering consumers to make informed purchasing decisions.

![EcoTrack Banner](https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## ✨ Features

### For Consumers
- 🔍 **Search & Filter** - Find products by name, category, or sustainability rating
- 🗺️ **Interactive Maps** - Visualize the complete supply chain journey
- 📊 **Eco Scores** - See sustainability ratings at a glance
- 🛒 **Easy Checkout** - Multiple payment options

### For Businesses
- 📦 **Product Management** - Full CRUD operations with supply chain stages
- 📈 **Analytics Dashboard** - Track views and engagement
- 🔐 **Secure Access** - Role-based authentication

### Technical Highlights
- 🔑 **JWT Authentication** - Secure, stateless authentication
- 💳 **Payment Integration** - Stripe, JazzCash, EasyPaisa
- 📱 **Responsive Design** - Mobile-first UI with Tailwind CSS
- 🎨 **Modern UI/UX** - Glassmorphism effects, smooth animations

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI library |
| Vite | Build tool |
| Tailwind CSS | Styling |
| React Router | Navigation |
| React-Leaflet | Interactive maps |
| Axios | HTTP client |
| Lucide React | Icons |

---

## 📁 Project Structure

```
EcoTrack/
├── server/                    # Backend API
│   ├── config/
│   │   └── db.js             # Database connection
│   ├── controllers/
│   │   ├── authController.js # Auth logic
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification
│   ├── models/
│   │   ├── User.js           # User schema
│   │   ├── Product.js        # Product with stages
│   │   └── Order.js          # Order tracking
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── paymentRoutes.js
│   ├── index.js              # Entry point
│   └── seeder.js             # Demo data
│
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── SupplyChainMap.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Skeleton.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ToastContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Mission.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Privacy.jsx
│   │   │   ├── Terms.jsx
│   │   │   └── NotFound.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/grim6-hasaan/ecoTrack.git
cd ecoTrack
```

2. **Setup Backend**
```bash
cd server
npm install
```

3. **Configure Environment**

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecotrack
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

4. **Seed Demo Data**
```bash
npm run data:import
```

5. **Setup Frontend**
```bash
cd ../client
npm install
```

### Running the App

**Terminal 1 - Start Backend:**
```bash
cd server
npm run server
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

Visit **http://localhost:5173** 🎉

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update profile |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order |
| GET | `/api/orders/myorders` | Get user orders |
| PUT | `/api/orders/:id/pay` | Update payment |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payment/stripe/create-intent` | Stripe payment |
| POST | `/api/payment/jazzcash/initiate` | JazzCash payment |
| POST | `/api/payment/easypaisa/initiate` | EasyPaisa payment |

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection | `mongodb://localhost:27017/ecotrack` |
| `JWT_SECRET` | JWT signing key | `your_secret_key` |
| `NODE_ENV` | Environment | `development` |
| `CLIENT_URL` | Frontend URL | `http://localhost:5173` |

---

## 📱 Screenshots

### Home Page
- Hero section with animated backgrounds
- Search with category filtering
- Product grid with hover effects

### Product Detail
- Interactive supply chain map
- Journey timeline
- Sustainability metrics

### Business Dashboard
- Product management table
- CRUD operations
- Analytics overview

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Hasaan Badar**

- GitHub: [@grim6-hasaan](https://github.com/grim6-hasaan)
- Email: hasaanbadar24@gmail.com

---

⭐ **Star this repository if you found it helpful!**
