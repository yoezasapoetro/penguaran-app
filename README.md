# **Penguaran \- A Personal Expense Tracker**

## **🚀 Overview**

Penguaran is a personal expense tracking application built to provide a clean, simple, and effective way to manage finances. This project was born out of a need to better manage personal finances and a desire for a customizable tool, rather than relying on existing services.

It serves as both a practical utility and a development playground for exploring modern web and mobile technologies.

## **💻 Tech Stack**

* **Framework**: Next.js  
* **Databases**: PostgreSQL (for production) & SQLite (for development)  
* **Styling**: Material-UI (MUI)  
* Deployment: Vercel (Early release, shutting down due expired domain)
* **Planned Mobile App**: React Native (Expo)

## **✨ Current Features**

* **Expense Logging**: Easily add and track daily expenses.  
* **Categorization**: Assign categories to each expense (e.g., Food, Transport, Bills) to understand spending habits.  
* **Expense History**: View a detailed history of all logged expenses over time.

## **🚧 Roadmap & Future Plans**

This project is under active development with an exciting roadmap ahead:

* **Monorepo Refactoring**: The highest priority is to refactor the entire project into a monorepo structure. This will streamline development and allow for the dynamic creation of multiple applications from a shared codebase.  
* **Backend Separation**: The current Next.js backend logic will be separated into a standalone service. This will create a more robust and scalable architecture, allowing different clients (web, mobile) to consume a single, dedicated API.  
* **React Native Mobile App**: Once the monorepo and dedicated backend are in place, the plan is to develop a mobile application using React Native to provide on-the-go expense tracking.  
* **Advanced Features**: Future versions will include features like budget planning, data visualization, and recurring expense management.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
