# Freelancing Portfolio Builder

A full-stack web application built with the MERN stack that helps freelancers create and manage their professional portfolios.

## Features

- 🔐 User Authentication (JWT-based)
- 🧑‍💼 Profile Management
- 🧠 Skills Showcase
- 📁 Project Portfolio
- 📄 Resume Section
- 💬 Testimonials
- 📞 Contact Form
- 🌐 Public Portfolio Page
- 🎨 Responsive Design with Light/Dark Mode

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cloudinary (for image uploads)

### Additional Tools
- Multer (file uploads)
- EmailJS/Nodemailer (email integration)
- Vercel/Netlify (frontend hosting)
- Render/Heroku (backend hosting)

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
cd freelance-portfolio-builder
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a .env file in the root directory and add:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Run the development server
```bash
npm run dev
```

This will start both the frontend (port 3000) and backend (port 5000) servers.

## Project Structure

```
freelance-portfolio/
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── index.js
├── backend/                # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── .env
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. 