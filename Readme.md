# Full Stack E-Commerce Cart - Assignment

This is a full-stack mock e-commerce cart application built for the Nexora internship screening process (Vibe Commerce).

**Submitted by:** Adarsh Maurya
**Email:** mauryadarsh9140@gmail.com

---

### Tech Stack
* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas

---

### Features
* **Product Listing:** Fetches mock products from a hardcoded backend API.
* **Add to Cart:** Adds selected items to a persistent cart in a MongoDB database.
* **View Cart:** Fetches all cart items from the database and calculates the cart total.
* **Remove from Cart:** Deletes items from the cart in the database.
* **Mock Checkout:** A simple form (Name, Email) that, upon submission, clears the cart in the database.
* **Receipt Modal:** A pop-up modal appears on successful checkout, displaying the total and timestamp.
* **Responsive UI:** Clean, modern, and responsive user interface built with plain CSS and Flexbox/Grid.

---

### How to Run This Project Locally

**Prerequisites:**
* Node.js (v18 or later recommended)
* A MongoDB Atlas Account (for the connection string)

**1. Backend Setup:**
```bash
# From the root project folder, navigate to the backend
cd backend

# Install all required packages
npm install

# Create a .env file in the /backend folder
# Add your MongoDB connection string to it:
# MONGO_URI=mongodb+srv://<your-username>:<your-password>@...

# Start the backend server (runs on http://localhost:8080)
npm start