# **Service Seller POS System**

## **Overview**
This project is a **Point of Sale (POS) system** for selling services, built with Next.js 15, React 19, and **Zustand** for state management. It allows users to manage a shopping cart, checkout, and process payments (mocked).

---

## **Getting Started**

### **1. Clone the Repository**
```sh
git clone https://github.com/Jrmkrishn/serviceseller.git
cd serviceseller
```

### **2. Install Dependencies**
Make sure you have **Node.js (v18+)** installed, then run:

```sh
pnpm install
# or
npm install --legacy-peer-deps
# or
yarn install --legacy-peer-deps
```

### **3. Environment Variables**
Create a `.env.local` file in the root of the project and configure any required environment variables.

Example:
```
NEXT_PUBLIC_API_URL=https://example.com/api
```

### **4. Run the Development Server**
```sh
pnpm dev
# or
npm run dev
# or
yarn dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## **Features**
- 🛒 **Cart Management** – Add, update, and remove services from the cart.
- 💳 **Mock Checkout** – Simulated payments with Credit Card, UPI, or Cash.
- 📃 **Receipt Generation** – Prints a receipt after order completion.
- 🌍 **Multi-language Support** – English, Hindi, Kannada.
- 🔄 **Smooth Page Transitions** – Auto-scroll to top on page navigation.

---

## **Project Structure**
```
/app
  /(main)
    /_store          # Zustand state management
    /components      # Reusable UI components
    /pages          # Next.js pages
  /public           # Static assets
  /lib              # Utility functions & helpers
```

---

## **Assumptions & Limitations**
### ✅ **Assumptions**
- The system is designed for **service-based businesses**, not physical products.
- The **payment system is mocked**, meaning no real transactions occur.
- Users complete checkout in a **single session** (no user authentication required).

### ❌ **Limitations**
- **No database integration** – Cart data is stored in memory (via Zustand).
- **No real payment gateway** – Transactions are simulated for demo purposes.
- **No backend API** – The project is frontend-only.

---

## **Contributing**
1. **Fork the repo** and create a new branch.
2. Make your changes and **test them locally**.
3. Submit a **pull request**.

---

## **License**
This project is **MIT licensed**.

