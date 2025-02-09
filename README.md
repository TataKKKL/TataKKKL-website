# TataKKKL-website

## 1. Setup

### 1.1 Create .env file

create .env file
```
SUPABASE_KEY=
SUPABASE_PROJECT_ID=
SUPABASE_URL=
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
GITHUB_ACCESS_TOKEN=
NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"
```
### 1.2 ORM with Prisma
Add the following to .env file to use Prisma to connect to Supabase for database operations.
```
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL=

# Direct connection to the database. Used for migrations.
DIRECT_URL=
```
for migration:
```
npx prisma migrate dev --name create_books_table
```
for seeding:
```
npx prisma db seed
```
## 2. Frontend
We use Next.js page router to build the frontend.
https://github.com/TataKKKL/TataKKKL-website/tree/main/website-app/pages

## 3. Backend
Right now, the backend are in the same repo as the frontend, but in the future, they will be in different repos. Under the pages/api folder.
https://github.com/TataKKKL/TataKKKL-website/tree/main/website-app/pages/api

production backend url: https://tata-kkkl-website-d7nq.vercel.app

check the hello endpoint:
```
url -X GET https://tata-kkkl-website-d7nq.vercel.app/api/hello
{"name":"John Doe"}%
```

## 4. Webhook testing
testing repo: https://github.com/TataKKKL/TataKKKL-website
webhook testing: ngrok