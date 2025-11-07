# 🛒 Full Stack E-Commerce Cart - VibeCart

A modern, full-stack shopping cart application built with **MERN Stack**, featuring dynamic animations, responsive design, and a seamless checkout experience.

**Submitted by:** Adarsh Maurya  
**Live Demo:** https://www.loom.com/share/b12c98e48c884d7d9d2779b5769c43f0

---

## 🚀 Tech Stack & Core Features

| Category | Technology | Key Features |
|----------|------------|--------------|
| **Frontend** | React (Vite), Tailwind CSS, Framer Motion | Dynamic Cart UI, Animated Transitions, Responsive Design |
| **Backend** | Node.js, Express.js | REST APIs for Cart Management |
| **Database** | MongoDB Atlas | Persistent cart and product data |

---

##  Key Features

###  Product Management
-  Fetches 5-10 real products from **Fake Store API**
-  Beautiful product cards with hover animations
-  Real-time cart count in header

###  Cart Functionality
-  **Add to Cart** with smooth animations
-  **Increment/Decrement** quantity controls
-  **Remove items** with confirmation toast
-  **Persistent cart** across sessions (MongoDB)

###  Smart Calculations
-  Real-time **Subtotal** calculation
-  **Grand Total** with breakdown

###  UI/UX Highlights
-  **Framer Motion animations** - Staggered fade-in, smooth transitions
-  **Center popup modal** for checkout (modern UX)
-  **Fully responsive** - Mobile, Tablet, Desktop
-  **Hero slider** with Ken Burns effect
-  **Toast notifications** for all actions

---

##  Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- npm or yarn


### 2️ Backend Setup
```bash
cd backend
npm install

# Create .env file and add:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/vibecommerce
# PORT=8080

node server.js
# Backend running on http://localhost:8080
```

### 3️ Frontend Setup (Vite)
```bash
cd ../frontend
npm install

# Start development server
npm run dev
# Frontend running on http://localhost:5173
```


##  Screenshots

###  Product Grid

<img width="2848" height="1625" alt="Screenshot 2025-11-07 135757" src="https://github.com/user-attachments/assets/a2dd33fc-51a5-4f17-8f7a-f596f6e74490" />

<img width="2845" height="1624" alt="Screenshot 2025-11-07 135909" src="https://github.com/user-attachments/assets/8633b995-4d16-4389-af7b-31c06363e27e" />


###  Shopping Cart
<img width="2753" height="1594" alt="Screenshot 2025-11-07 135945" src="https://github.com/user-attachments/assets/2a6b99ca-520b-4308-9d59-dab838a26a50" />

*Interactive cart with quantity controls and totals*

###  Checkout Modal
<img width="2849" height="1629" alt="Screenshot 2025-11-07 135959" src="https://github.com/user-attachments/assets/74fab1d8-d72c-400d-9950-82c011ca12c5" />

<img width="2841" height="1591" alt="Screenshot 2025-11-07 140055" src="https://github.com/user-attachments/assets/f3c545ba-ed7f-4854-b070-15b7629085aa" />


## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart` | Fetch all cart items |
| `POST` | `/api/cart` | Add item to cart |
| `POST` | `/api/cart/decrease` | Decrease quantity |
| `DELETE` | `/api/cart/:id` | Remove item |
| `POST` | `/api/checkout` | Process checkout |



##  Bonus Features Implemented

-  **External API Integration** (Fake Store API)
-  **error handling**

---

##  Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run dev
```
### Backend (Render/Railway)
```bash
cd backend
node server.js
---
