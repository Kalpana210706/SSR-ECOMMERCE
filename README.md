## SSR E-Commerce Product Management Dashboard

A Server-Side Rendered (SSR) E-Commerce Product Management Dashboard built using Next.js App Router, designed for efficient product administration with secure admin access, real-time analytics, and optimized performance.
This project enables administrators to manage products, monitor sales and stock metrics, and provides a user-facing product browsing experience.

## Project Overview

This project focuses on building a server-rendered e-commerce dashboard where:

Admins can create, update, delete products

Products are stored in MongoDB

Product data is server-side rendered for SEO & performance

Admin dashboard includes analytics using charts

Secure admin login restricts dashboard access

Users can browse products and view detailed product pages

The application uses Next.js App Router to combine SSR, API routes, and modern UI patterns.

## Key Features

 Admin Dashboard

Secure admin login (dummy credentials)

Product CRUD operations

Image upload support

Category-based product management

Real-time stock & sales updates

Analytics dashboard with charts

## User Features

Product listing page

Search and category filter

Product detail page

Buy Now functionality (updates stock & sales)

Responsive UI

## Analytics

Stock distribution chart

Sales distribution chart

Price range analytics

Total products, stock & sales summary

 ## Performance & SEO

Server-Side Rendering (SSR) using Next.js

Optimized MongoDB queries

Fast client updates using SWR

## Tech Stack

Frontend

Next.js 14 (App Router)

React

Tailwind CSS

SWR (data fetching & revalidation)

Recharts (analytics & charts)

Backend
Next.js API Routes

MongoDB

Mongoose

Other Tools

Cloudinary (image uploads)

Zod (form validation)

GitHub

Vercel (deployment)

## Setup & Configuration

1. Clone the repository and install dependencies.
2. Configure environment variables for MongoDB and Cloudinary.
3. Run the development server.


## Environment Variables

Create a `.env.local` file and configure the following variables:

- MONGODB_URI
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- ADMIN_EMAIL
- ADMIN_PASSWORD

- ## DUMMY credentials
- ADMIN_EMAIL = admin@ex.com
- ADMIN_PASSWORD = admin@123!!
