# Vulcans Robotics Club Website

Team Vulcans is the premier robotics team and club associated with P.E.S.'s Modern College of Engineering (MCOE) in Shivajinagar, Pune. Founded in 2011, the team focuses on robotics, automation, and competing in prestigious national competitions like ABU Robocon.

This repository holds the codebase for the official website, built using Next.js, Tailwind CSS, and Convex.

---

## 🚀 Deployment Credentials & Architecture

The application is split into a frontend hosted on Vercel and a real-time backend/database hosted on Convex.

### Frontend (Next.js on Vercel)
- **Deployment Platform**: Vercel
- **Live URL**: https://robotics-pesmcoe.vercel.app
- **Account / Email Associated**: `suhail17mohammad@gmail.com`

### Backend (Convex)
- **Deployment Platform**: Convex Cloud
- **Dashboard URL**: https://dashboard.convex.dev/
- **Account / Email Associated**: `mohammad_suhail_entc@moderncoe.edu.in`
- **Team**: `suhail-mohammad-f9a06`
- **Project**: `vulcans`

## 💻 Getting Started for Development

To get the full application running on your local machine, you need to start three separate processes in three different terminal windows:

### 1. Run the Convex Backend
First, start the Convex development server from the root of the project to sync your database and API functions:

```bash
npx convex dev
```

### 2. Run the Public Website (Frontend)
In a new terminal window, start the main Next.js development server for the public website:

```bash
npm run dev
```

The public site will be available at [http://localhost:3000](http://localhost:3000).

### 3. Run the Admin Dashboard
In a third terminal window, navigate into the `admin` folder and start its Next.js development server:

```bash
cd admin
npm run dev
```

The admin dashboard will be available at [http://localhost:3001](http://localhost:3001) (or whichever port Next.js assigns it).
