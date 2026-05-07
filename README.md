# Aether Agency — Marketing Website

Modern agency marketing website built with React + Vite + TailwindCSS. It includes a contact form on the frontend and an optional Node/Express backend for email delivery.

## Quickstart (local)

Prerequisites: Node.js 18+ and npm.

1. Install dependencies

```bash
npm ci
```

2. Run the frontend in development:

```bash
npm run dev
```

Open http://localhost:5173 to view the site.

## Build & Preview

Build the static site:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Contact form backend (optional)

The frontend can submit the contact form to a small Express server for email delivery. If you run the backend locally, create a `.env` file with:

```env
SMTP_USER=your.email@gmail.com
SMTP_PASS=your-app-password
PORT=3001
```

Run the backend server:

```bash
npm run server
```

The dev server proxies `/api` requests to `http://localhost:3001`.

## Deploying the frontend to GitHub Pages

The repository includes an example GitHub Actions workflow (`.github/workflows/deploy-gh-pages.yml`) that builds the site and publishes the `dist/` folder to GitHub Pages (push to `main` triggers the action).

How it works:

- The workflow sets a `BASE` environment variable based on the repository name and runs `npm run build`. The Vite config reads `process.env.BASE` so assets are built with the correct base path.
- The workflow also sets `VITE_API_URL` to your Render backend URL so the built frontend will post contact form submissions to the correct backend endpoint in production.
- The action then deploys `./dist` to the `gh-pages` branch using `peaceiris/actions-gh-pages`.

Notes and manual alternative:

- If your default branch is not `main`, edit `.github/workflows/deploy-gh-pages.yml` to change the trigger branch.
- Manual deploy (optional): the project has a `predeploy` + `deploy` script that use `gh-pages`:

	```bash
	# Unix/macOS
	BASE=/your-repo-name/ npm run deploy

	# Windows (PowerShell)
	$env:BASE='/your-repo-name/'; npm run deploy
	```

	Replace `/your-repo-name/` with the actual repository name (e.g. `/aether-agency/`). The workflow does this automatically.

After a successful deploy, enable GitHub Pages if needed (Repository Settings → Pages) and point it to the `gh-pages` branch.

## Backend deployment (optional)

GitHub Pages is static-only. If you use the email backend, deploy it separately (Render, Railway, Fly, Heroku, etc.) and set `SMTP_USER` / `SMTP_PASS` in the host. Update the CORS origin in the server to allow your production site domain.

### Deploying the backend to Render

Quick steps to deploy the `server.js` backend to Render (recommended):

1. Sign in to https://render.com and click **New → Web Service**.
2. Connect your GitHub repository and pick the `main` branch (or the branch you use).
3. Set the **Root** to the repository root (this project is single-repo; leave empty if you host the backend at root).
4. For **Environment**, choose **Node**. For **Build Command** you can leave blank; Render will run `npm install` automatically.
5. Set **Start Command** to:

```
npm start
```


6. In the Environment (Render Dashboard) add the required environment variables:

- `SMTP_USER` — your SMTP username (email address)
- `SMTP_PASS` — your SMTP password or app password
- `FRONTEND_ORIGIN` — the URL of your frontend (example: `https://your-username.github.io/your-repo/`) or `*` to allow all origins (not recommended)

After you deploy the frontend to GitHub Pages, set `FRONTEND_ORIGIN` in Render to your Pages URL (for example: `https://your-username.github.io/your-repo/`). This ensures the backend accepts requests from the deployed frontend.

7. Optionally set `PORT` (Render provides `$PORT`, so leaving it blank will let the app use the provided port).

8. Create the service — Render will deploy and provide a URL for the backend.

Notes:

- The backend reads `FRONTEND_ORIGIN` to configure CORS. Use a comma-separated list for multiple allowed origins.
- We included a `render.yaml` sample (`render.yaml`) as a convenience to define a Render service from the repo; do not store secrets in this file. Set secrets in the Render Dashboard.


## Email template

The HTML email template lives in the backend's `server.js` in the `transporter.sendMail({ html: ... })` payload.

## Troubleshooting

- If emails fail: verify `SMTP_USER` and `SMTP_PASS`. For Gmail, enable 2FA and create an App Password. Check the server logs for `Nodemailer error:` output.
- CORS: allow your production domain in the backend when deployed.
