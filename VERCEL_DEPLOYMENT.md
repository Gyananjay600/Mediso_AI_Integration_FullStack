# Deploy Mediso on Vercel

Deploy the frontend and backend as two Vercel projects connected to this same Git repository.

## 1. Deploy the backend API

1. In Vercel, select **Add New > Project** and import this repository.
2. Set **Root Directory** to `backend`.
3. Keep the default install command. No build command is required.
4. Add these Production environment variables in **Settings > Environment Variables**:

   ```text
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   # Supabase Connect > Transaction pooler URL (recommended for Vercel)
   DATABASE_URL=postgresql://postgres.project-ref:your-password@aws-region.pooler.supabase.com:6543/postgres
   DB_CONNECTION_LIMIT=5
   DB_SSL=true
   JWT_SECRET=a-long-random-secret
   JWT_EXPIRES_IN=7d
   GEMINI_API_KEY=your-gemini-key
   GEMINI_MODEL=your-gemini-model
   ```

5. Deploy, then open `https://your-backend.vercel.app/api/health` to verify it.

## 2. Deploy the frontend

1. Import the same repository again as a second Vercel project.
2. Set **Root Directory** to `frontend` and Framework Preset to **Vite**.
3. Add this Production environment variable before deploying:

   ```text
   VITE_API_URL=https://your-backend.vercel.app/api
   ```

4. Deploy and copy the frontend URL.

## 3. Finalize CORS

Update the backend Production `FRONTEND_URL` with the actual frontend URL (without a trailing slash), then redeploy the backend. If you use Vercel preview deployments, add their URL(s) as a comma-separated list as well.

## Database note

Use the Supabase Transaction pooler connection string for the Vercel serverless backend. Do not commit real credentials: configure them only in Vercel environment variables.
