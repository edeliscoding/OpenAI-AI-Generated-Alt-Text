This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

# Image Upload with AI-Generated Alt Text

This project is a NextJs React application that will Generate a concise and descriptive alt text for uploaded image

## Setup

1.  Clone the repository
2.  Install dependencies:

    ```
    npm install
    ```

    ```

    ```

3.  Open `.env.local` and replace `your_openai_api_key_here` with your actual OpenAI API key

## Running the Application

To start the development server:

```
npm run dev
```

## Environment Variables

This project uses the following environment variables:

OPENAI_API_KEY: Your OpenAI API key

Make sure to set these in your `.env.local` file before running the application.

## Security Note

Never commit your `.env.local` file or expose your API keys in your code. The `.env.local` file is included in `.gitignore` to prevent accidental commits.

This one takes Excel File and graph the dataset give. Graph adjusts based on query.
