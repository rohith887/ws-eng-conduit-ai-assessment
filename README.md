
This is a fullstack RealWorld application built using Angular (frontend) and NestJS + MikroORM (backend), structured as a monorepo using Nx. To run the app locally, navigate to apps/frontend and apps/backend, run npm install in both, and then start the servers with npm run start:frontend and npm run start:backend. The frontend typically runs on port 4200 (or another available port), and the backend on port 3003. The stack includes Angular, NgRx, RxJS, SCSS for frontend UI/state, and NestJS, MikroORM, and PostgreSQL or SQLite on the backend. The RESTful API follows the RealWorld spec, featuring JWT authentication, user registration/login, article CRUD operations, commenting, and route guards. Known issues: the /tags endpoint returns a 404 due to missing seed data or absence of a tag creation UI; error handling is currently console-based and can be improved; JWT authentication works but route-based login state persistence may need enhancement; article filters are minimal. To seed the database, you can either manually add records using MikroORM CLI or insert directly into the DB. Deployment-ready for platforms like Heroku or Vercel with environment configuration. Screenshots (if added) would go in a /screenshots folder and referenced in the README via ![screenshot](./screenshots/home.png). Project structure includes apps/backend (NestJS), apps/frontend (Angular), and libs for shared modules (core, auth, articles, profile). Name: Rohith Reddy Komatireddy | Email: rohithkomatireddy051@gmail.com | GitHub: rohith887.


## 🖼️ Screenshots

### 🔐 Login Page
![Login Screenshot](./screenshots/login.png)

### 🏠 Home Page
![Home Screenshot](./screenshots/home.png)

### 📝 Article Editor
![Editor Screenshot](./screenshots/editor.png)
