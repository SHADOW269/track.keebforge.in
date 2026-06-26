# KeebForge Order Management & Tracking System

<p align="center">
  <img src="https://keebforge.in/assets/logo.png" width="180" alt="KeebForge">
</p>

<p align="center">
Internal Order Management Dashboard & Public Order Tracking System for KeebForge
</p>

---

## Overview

The KeebForge Order Management System is a full-stack web application built to manage custom mechanical keyboard orders from start to finish.

It consists of two major parts:

### Admin Dashboard

Internal dashboard used by KeebForge staff to:

- Create customer orders
- Update build progress
- Manage production workflow
- Update shipping details
- Track warranty status
- Maintain customer records
- Record timeline updates

### Public Tracking Page

Customers receive an order number (example: `KF000001`) and can track the progress of their build without creating an account.

Example:

```
https://order.keebforge.in/track/KF000001
```

---

# Current Features

## Admin Dashboard

- Dashboard overview
- Create new order
- Edit existing order
- Update customer information
- Update build information
- Update shipping information
- Update warranty
- Update order status
- Timeline system
- Soft delete (Archive)
- Dashboard statistics

---

## Public Tracking

- Track using Order Number
- Live status
- Timeline history
- Shipping information
- Warranty status

---

# Technology Stack

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

---

## Backend

- Next.js Route Handlers
- Supabase

---

## Database

- PostgreSQL
- Supabase

---

## Authentication

- Supabase Auth (Admin Only)

---

## Hosting

Frontend

- Vercel

Database

- Supabase

---

# Project Structure

```
track-keebforge/
│
├── middleware.ts                 # Protects admin routes (authentication & authorization)
├── package.json                  # Project dependencies and npm scripts
├── README.md                     # Project documentation
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── .env.local                    # Environment variables (Supabase, API keys, etc.)
├── public/                       # Static assets (images, icons, robots.txt, etc.)
│
└── src/
    ├── app/                      # Next.js App Router
    │   ├── admin/                # Internal admin dashboard
    │   │   ├── page.tsx          # Dashboard (order statistics & recent orders)
    │   │   ├── new/
    │   │   │   └── page.tsx      # Create a new customer order
    │   │   └── orders/
    │   │       └── [orderNumber]/
    │   │           └── page.tsx  # View & edit a specific order
    │   │
    │   ├── api/                  # Backend API routes
    │   │   └── orders/
    │   │       ├── route.ts      # GET all orders / POST create new order
    │   │       └── [id]/
    │   │           └── route.ts  # GET single order / PATCH update / DELETE archive
    │   │
    │   ├── login/
    │   │   └── page.tsx          # Admin login page
    │   │
    │   ├── track/
    │   │   └── [orderNumber]/
    │   │       └── page.tsx      # Public customer order tracking page
    │   │
    │   ├── favicon.ico           # Website favicon
    │   ├── globals.css           # Global styles
    │   ├── layout.tsx            # Root application layout
    │   └── page.tsx              # Landing / Home page
    │
    ├── components/               # Reusable React components
    │   └── OrderTimeline.tsx     # Customer order progress timeline component
    │
    ├── constants/                # Shared constants used across the app
    │   └── order-statuses.ts     # Master list of all valid order statuses
    │
    └── lib/                      # Shared utilities & external service clients
        ├── supabase.ts           # Public Supabase client (read operations)
        └── supabaseAdmin.ts      # Service-role Supabase client (admin CRUD operations)
```

---

# Database Schema

## orders

| Column | Type |
|----------|------|
| id | uuid |
| order_number | varchar(8) |
| customer_name | text |
| customer_email | text |
| customer_phone | text |
| discord_username | text |
| service_type | text |
| current_status | text |
| order_summary | text |
| estimated_total | numeric |
| keyboard_pcb_model | text |
| switch_details | text |
| street_address | text |
| city | text |
| state | text |
| pincode | text |
| courier | text |
| tracking_number | text |
| estimated_delivery | date |
| warranty_start_date | date |
| warranty_end_date | date |
| notes | text |
| is_deleted | boolean |
| created_at | timestamptz |
| updated_at | timestamptz |

---

## order_updates

| Column | Type |
|----------|------|
| id | uuid |
| order_id | uuid |
| status | text |
| note | text |
| created_at | timestamptz |

---

# Order Lifecycle

```
Order Received
        │
Payment Pending
        │
Payment Received
        │
Parts Booked
        │
Parts Received
        │
In Queue
        │
Work Started
        │
Testing
        │
Packing
        │
Shipment Booked
        │
Shipment Picked Up
        │
Shipping
        │
Delivered
        │
Warranty Active
        │
Warranty Closed
```

---

# API Routes

## Orders

### Create Order

```
POST /api/orders
```

---

### Update Order

```
PATCH /api/orders/:id
```

---

### Archive Order

```
DELETE /api/orders/:id
```

Soft delete only.

Updates

```
is_deleted = true
```

---

# Admin Routes

```
/admin
```

Dashboard

```
/admin/new
```

Create Order

```
/admin/orders/:orderNumber
```

Edit Order

---

# Public Routes

```
/
```

Landing Page

```
/track/:orderNumber
```

Track Order

---

# Authentication

Only administrators can access:

```
/admin/*
```

Authentication is powered by:

- Supabase Auth

Customers never require an account.

---

# Soft Delete

Orders are never permanently deleted.

Instead:

```
is_deleted = true
```

Archived orders:

- disappear from dashboard
- disappear from tracking page
- remain inside database

---

# Development

Clone repository

```bash
git clone https://github.com/shadow269/track.keebforge.in.git
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

---

# Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

SUPABASE_SERVICE_ROLE_KEY=
```

---

# Future Features

## Customer

- Email notifications
- SMS notifications
- Live shipment tracking
- Build gallery
- Invoice download

---

## Admin

- Dashboard analytics
- Search
- Filters
- Bulk updates
- Restore archived orders
- PDF invoice
- Photo uploads
- Timeline editor
- Admin roles
- Activity logs
- Automatic status emails

---

# Deployment

Frontend

- Vercel

Database

- Supabase

Domain

```
order.keebforge.in
```

Public tracking

```
order.keebforge.in/track/KF000001
```

---

# License

Private Project

Copyright © KeebForge.

All rights reserved.

---

# Author

Shadow269

KeebForge

https://keebforge.in
