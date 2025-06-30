
# 🚚 MA SHIFT - Parcel Delivery System

MA SHIFT is a home/office pickup parcel delivery platform tailored to meet the needs of users, riders, and administrators across Bangladesh. It streamlines the end-to-end logistics experience with robust features like real-time tracking, secure payment integration, and a responsive role-based dashboard.

---

## 📦 Key Features

- **📱 User Panel:**
  - Add and manage parcels with dynamic pricing.
  - Real-time parcel tracking with status history.
  - Secure card-based payment system with Stripe.
  - Payment history and delivery reviews.
  - Parcel status visualization with Recharts.
  - Update user profile and account information.

- **🛠️ Admin Panel:**
  - Manage users, riders, and service centers.
  - Assign riders to pickup and delivery tasks.
  - Track parcel movement and update statuses.
  - View system-wide payments and earnings.
  - Role management and service center analysis.

- **🚴 Rider Panel:**
  - View assigned parcels for pickup/delivery.
  - Confirm pickup or delivery using tracking ID.
  - View earnings and delivery stats.
  - Update rider profile and availability.

---

## 🧑‍💼 Roles & Responsibilities

| Role  | Responsibilities |
|-------|------------------|
| **User** | Parcel booking, payment, tracking, review |
| **Admin** | Parcel routing, rider assignment, user management |
| **Rider** | Pickup, in-transit updates, delivery confirmation |

---

## 🖥️ Dashboard Layout

- **Sidebar:** Logo, user info, role-based navigation, logout.
- **Main Content:** Dynamic routing-based component rendering.
- **Responsive Design:** Optimized for desktop and mobile.

---

## 📊 Parcel Status Lifecycle

1. Unpaid
2. Paid
3. Ready to Pickup
4. In-Transit
5. Reached Service Center
6. Shipped
7. Ready for Delivery
8. Delivered

---

## 🔐 Authentication & Authorization

- Firebase Authentication (Email/Password + Google)
- JWT Token Protection for APIs
- Role-based route access

---

## 💳 Payment Integration

- Stripe Integration
- Transaction details stored securely
- Auto-generate Tracking ID on success

---

## 📁 Tech Stack

- **Frontend:** React, Tailwind CSS, DaisyUI, Recharts
- **Backend:** Node.js, Express.js, MongoDB, Firebase Admin SDK
- **Authentication:** Firebase, JWT
- **Payment:** Stripe
- **Deployment:** Vercel / Netlify (Frontend), Render / Cyclic (Backend)

---

## 🚀 Getting Started

### 🔧 Installation

```bash
# Clone the repo
git clone https://github.com/azijulhakimbd/MA-Shift-Client
cd MA-Shift-Client

# Install dependencies
npm install

# Start the development server
npm run dev
