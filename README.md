# EcoTrack - Supply Chain Transparency Platform

A full-stack MERN application for supply chain transparency, enabling businesses to showcase their products' journey from raw materials to final delivery.

![EcoTrack](https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## 🌟 Features

- **User Authentication** - JWT-based login/register with role-based access (Consumer/Business)
- **Product Management** - Full CRUD operations for products with supply chain stages
- **Interactive Maps** - Visualize supply chain journeys with React-Leaflet
- **Payment Integration** - Stripe, JazzCash, and EasyPaisa payment methods
- **Modern UI/UX** - Glassmorphism design with Tailwind CSS
- **Responsive Design** - Mobile-first approach

## 🛠 Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

### Frontend
- React 19 with Vite
- Tailwind CSS
- React-Leaflet for maps
- Axios for API calls
- Lucide React for icons

## 📁 Project Structure

```
EcoTrack/
├── server/                 # Backend API
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   └── index.js           # Entry point
│
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Auth context
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app
│   └── index.html
│
└── README.md
```

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

3. **Configure Environment Variables**
Create a `.env` file in the server directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecotrack
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

4. **Seed the Database**
```bash
npm run data:import
```

5. **Setup Frontend**
```bash
cd ../client
npm install
```

### Running the Application

**Start Backend (Terminal 1):**
```bash
cd server
npm run server
```

**Start Frontend (Terminal 2):**
```bash
cd client
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 🔐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Orders & Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order |
| GET | `/api/orders/myorders` | Get user orders |
| POST | `/api/payment/stripe/create-intent` | Stripe payment |
| POST | `/api/payment/jazzcash/initiate` | JazzCash payment |
| POST | `/api/payment/easypaisa/initiate` | EasyPaisa payment |

## 📸 Screenshots

### Home Page
- Modern hero section with search functionality
- Glassmorphism product cards
- Sustainability ratings display

### Product Detail
- Interactive supply chain map
- Journey timeline
- Eco-score metrics

### Business Dashboard
- Product management table
- Analytics overview
- CRUD operations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Hasaan Badar**
- GitHub: [@grim6-hasaan](https://github.com/grim6-hasaan)

---

⭐ Star this repository if you found it helpful!
