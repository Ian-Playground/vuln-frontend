# Vulnerability Management System

A modern web application for managing and tracking security vulnerabilities, built with Nuxt 3 and TypeScript.

## Features

-   🔐 User authentication and authorization
-   📝 Create, read, update, and delete vulnerabilities
-   🏷️ Categorize vulnerabilities using OWASP categories
-   📊 Track vulnerability severity and status
-   📱 Responsive design with modern UI by NUXT UI

## Tech Stack

-   Nuxt 3
-   TypeScript
-   Vue 3
-   Pinia (State Management)
-   Nuxt UI (Component Library)
-   Tailwind CSS

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Create a `.env` file:

```env
APP_URL=http://localhost:8000
APP_TIMEZONE=UTC
```

3. Run development server:

```bash
yarn dev
```

4. Build for production:

```bash
yarn build
```

## Project Structure

-   `components/` - Reusable Vue components
-   `pages/` - Application pages and routes
-   `types/` - TypeScript type definitions
-   `stores/` - Pinia stores for state management
-   `composables/` - Reusable Vue composition functions

## License

MIT

## Docker Deployment

To dockerize the Nuxt frontend, follow these steps:

1. **Build the Docker Image**:

    ```sh
    docker build -t vuln-frontend .
    ```

2. **Run the Docker Container**:

    ```sh
    docker compose up
    ```

    The application will be accessible at [http://localhost:3000](http://localhost:3000).

3. **Environment Variables**:

    - Ensure your `.env` file is correctly set up with the necessary environment variables.
    - You can use the `.env.example` file as a template.

4. **Troubleshooting**:
    - If the application is inaccessible, ensure no other service is using port 3000.
    - Check the Docker logs for any errors or warnings.
    - If accessing via `localhost` doesn't work, try using the container's IP address or name.
