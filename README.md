# RentalCar

A frontend web application for a car rental company. Users can browse a catalog of available cars, filter and paginate
through them, and submit a booking request for a specific car.

**Live demo:** https://rental-car-jade-rho.vercel.app/

## Features

- **Home page** — a hero section with a call to action leading into the catalog.
- **Catalog page** (`/catalog`) — cars fetched from the backend, with server-side filtering by brand (single choice),
  price (single choice), and mileage (from/to), plus "Load More" pagination via TanStack Query's `useInfiniteQuery` that
  respects the active filters.
- **Car details page** (`/catalog/[carId]`) — full information about a car (photo, price, description, rental
  conditions, specifications, features) and a booking form that submits directly to the backend, with success/error
  toast notifications and client-side validation.
- Loading and error states throughout (spinners, empty-state illustration, 404 handling).

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [TanStack Query](https://tanstack.com/query) for data fetching, caching, and infinite pagination
- CSS Modules for styling
- [react-icons](https://react-icons.github.io/react-icons/) for icons
- [react-hot-toast](https://react-hot-toast.com/) for notifications
- [Axios](https://axios-http.com/) for HTTP requests to the
  [Rental Car API](https://car-rental-api.goit.study/api-docs/)

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/InnaIvBoiko/rental-car.git
cd rental-car
npm install
```

### Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # run ESLint
```

## Project structure

```
app/                 # routes (App Router): /, /catalog, /catalog/[id]
components/           # reusable UI components (CarCard, Filters, BookingForm, ...)
lib/api.ts            # backend API client
types/                # shared TypeScript types
```

## Author

**Inna Boiko** — [GitHub](https://github.com/InnaIvBoiko)
