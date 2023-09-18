This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses [TailwindCSS](https://tailwindcss.com/) for stylings and [i18n](https://www.i18next.com/) for internationalization.

The application was made by designs with being based on the technical requirements. You can see all of the orders, all of the products, products that relate to a specific order, filter products by their specification and/or model. It is possible to delete products (changes will be stored in localStorage until you remove all of the products. When you do, mocked values will be returned).

## Getting Started

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

To run with docker:

```bash
docker build -t nextjs-docker .
docker run -p 3000:3000 nextjs-docker
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

There is [deployed version](https://inventory-nine-xi.vercel.app/) if you don't want to run the application locally.
