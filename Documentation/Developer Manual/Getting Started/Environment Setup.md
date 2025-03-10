# Setting up the development environment

I have tried to make this as easy and seamless as possible. Here are the steps to get started:

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) on your computer.
2. Clone the repository to your local machine.
3. Open the repository in your preferred code editor.
4. Open a terminal in the App folder and run the following command:

    `docker compose up -f docker-compose.dev.yml --profile basicSetup --watch`.

5. This will start the application in development mode, which consists of a CouchDB instance, Traefik as a reverse proxy, a backend server, and a frontend server. The backend server and frontend server will automatically reload when you make changes to the code.

6. You can now access the frontend at `http://localhost`, the backend at `http://localhost:3000`, the CouchDB dashboard at `http://localhost:5984/_utils`, and the Traefik dashboard at `http://localhost:8080`.

7. To install additional dependencies, you can open a terminal in the container and run `npm install` in the default location (`/usr/local/app`). This will allow the development environment to be entirely in the container, which is more efficient and reduces the risk of conflicts with other dependencies on your system. The bind volume of the source code folder will update automatically when you make changes to the code and install new dependencies in the container.

8. To stop the development environment, simply press `Ctrl + C` in the terminal where you ran the command.