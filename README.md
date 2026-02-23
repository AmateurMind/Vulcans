# Vulcans Robotics Club Website

This repo now has two separate Next.js apps:

- Public website: root project (`f:\Vulcans`)
- Admin app: standalone project in `f:\Vulcans\admin`

Both apps use Convex.

## Prerequisites

- Node.js 18+
- npm
- Convex project access

## Environment Setup

Set env vars before running:

- Root app: `f:\Vulcans\.env.local`
- Admin app: `f:\Vulcans\admin\.env.local` (create from `admin/.env.example` if missing)

## Run Everything (3 Terminals)

Install dependencies once:

```bash
cd f:\Vulcans
npm install
cd admin
npm install
```

Then run these at the same time in 3 terminals:

Terminal 1 (Convex backend):

```bash
cd f:\Vulcans
npx convex dev
```

Terminal 2 (Public frontend):

```bash
cd f:\Vulcans
npm run dev
```

Terminal 3 (Admin frontend):

```bash
cd f:\Vulcans\admin
npm run dev
```

Open:

- Public: `http://localhost:3000`
- Admin: `http://localhost:3001/signin`

## Notes

- `admin` uses the root Convex backend; do not run `convex dev` from `admin` unless you intentionally use a separate Convex project.
- If port `3000` or `3001` is busy, stop the old process first.
- Root and admin are separate apps and can run independently.
