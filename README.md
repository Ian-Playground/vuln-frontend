## Docker Deployment

To dockerize the Nuxt frontend, follow these steps:

1. **Build the Docker Image**:

    ```sh
    docker build -t vuln-frontend .
    ```

2. **Run the Docker Container**:

    ```sh
    docker run -p 3000:3000 --env-file .env vuln-frontend
    ```

    The application will be accessible at [http://localhost:3000](http://localhost:3000).

3. **Environment Variables**:

    - Ensure your `.env` file is correctly set up with the necessary environment variables.
    - You can use the `.env.example` file as a template.

4. **Troubleshooting**:
    - If the application is inaccessible, ensure no other service is using port 3000.
    - Check the Docker logs for any errors or warnings.
    - If accessing via `localhost` doesn't work, try using the container's IP address or name.
