# 💰 Expense Tracker App

Track your income and expenses effortlessly with this modern and intuitive expense tracker application. Gain insights into your financial habits with visual overviews and manage your transactions with ease.

---

## ✨ Features

- 🔐 **User Authentication**  
  Secure user registration and login using JWT.

- 📊 **Dashboard Overview**  
  Quick summary of your total balance, income, and expenses.

- 📈 **Interactive Charts**  
  - **Pie Chart**: Visualizes income vs. expense distribution.  
  - **Area Chart**: Tracks trends over time.

- 💵 **Income Management**  
  - Add new income sources with amount, date, and optional icon.  
  - View a list of all income entries.  
  - Delete income records.  
  - Export income data (CSV/Excel).

- 💸 **Expense Management**  
  - Record expenses by category, amount, date, and icon.  
  - View a list of all expenses.  
  - Delete expense records.  
  - Export expense data (CSV/Excel).

- 📱 **Responsive Design**  
  Seamless experience across desktop, tablet, and mobile devices.

- ✅ **Toast Notifications**  
  Clean, user-friendly feedback for every action (success, error).

---

## 🚀 Technologies Used

### 🖥️ Frontend

- ⚛️ [React.js](https://reactjs.org/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 📊 [Recharts](https://recharts.org/en-US/)
- 🔔 [react-hot-toast](https://react-hot-toast.com/)
- 📅 [moment.js](https://momentjs.com/)
- 🧰 [Axios](https://axios-http.com/)
- 🧩 [react-icons/lu](https://react-icons.github.io/react-icons/)

### 🛠️ Backend

- 🟢 [Node.js](https://nodejs.org/)
- 🚀 [Express.js](https://expressjs.com/)
- 🍃 [MongoDB](https://www.mongodb.com/)
- 🧬 [Mongoose](https://mongoosejs.com/)
- 🔐 [JWT](https://jwt.io/)

---

# 🛠️ Setup and Installation

## 📦 Prerequisites

- Node.js (LTS)
- npm or Yarn
- Git
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

## 🔧 Backend Setup

```bash
# Step 1: Navigate to the backend directory
cd backend

# Step 2: Install dependencies
npm install

# Step 3: Create a .env file and add the following:
MONGO_URI=mongodb+srv://<username>:<password>@<your-cluster>.mongodb.net/expense_tracker_db
PORT=8000
JWT_SECRET=your_secret_key

# Step 4: Start the backend server
npm run dev
```

## 🎨 fontend setup
```bash
# Step 1: Navigate to the frontend directory
cd expense-tracker

# Step 2: Install dependencies
npm install

# Step 3: Start the React development server
npm run dev
```
