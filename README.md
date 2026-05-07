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

## Email template

The HTML email template lives in the backend's `server.js` in the `transporter.sendMail({ html: ... })` payload.

## Troubleshooting

- If emails fail: verify `SMTP_USER` and `SMTP_PASS`. For Gmail, enable 2FA and create an App Password. Check the server logs for `Nodemailer error:` output.
- CORS: allow your production domain in the backend when deployed.
