# Kathakora

A premium server-side rendered e-commerce application built with Node.js, Express, EJS, MongoDB Atlas, Redis, HTMX, Tailwind CSS, Cloudinary, and Docker.

Kathakora demonstrates a modern SSR architecture with authentication, shopping cart functionality, checkout, order management, an admin dashboard, and containerized deployment.

---

## Live Demo

**Live:** https://kathkora.onrender.com

---

## Features

### Customer

- Browse products
- Product detail page
- Google Authentication
- Guest cart
- User cart
- Add to cart
- Update quantity
- Remove items
- Checkout
- Order success page
- Order history
- Responsive design

### Admin

- Admin dashboard
- Product management
- Create products
- Edit products
- Delete products
- Cloudinary image uploads
- Order management
- Update order status

---

## Tech Stack

### Backend

- Node.js
- Express.js
- EJS
- MongoDB Atlas
- Redis

### Frontend

- Tailwind CSS
- HTMX
- Vanilla JavaScript

### Authentication

- Passport.js
- Google OAuth 2.0

### Storage

- Cloudinary

### DevOps

- Docker
- Docker Compose

---

## Project Structure

```
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── seeds/
├── utils/
├── views/
│   ├── pages/
│   └── partials/
├── app.js
└── server.js
```

---

## Installation

Clone the repository.

```bash
git clone https://github.com/yourusername/kathakora.git
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
PORT=3000

MONGODB_URI=

SESSION_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

REDIS_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Run the application.

```bash
npm run dev
```

---

## Docker

Build the Docker image.

```bash
docker build -t kathakora .
```

Run the container.

```bash
docker compose up --build
```

---

## Future Improvements

- Product search
- Category filtering
- Wishlist
- Reviews and ratings
- Payment gateway integration
- Email notifications
- Inventory analytics
- Automated testing

---

## What I Learned

While building Kathakora I gained practical experience with:

- Express MVC architecture
- Server-side rendering with EJS
- MongoDB Atlas integration
- Redis caching and session management
- Google OAuth authentication
- Cloudinary image uploads
- HTMX interactions
- Docker containerization
- Building a complete e-commerce workflow

---

