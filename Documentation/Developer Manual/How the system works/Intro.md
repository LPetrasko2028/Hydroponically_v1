# Intro on how the system works

The system is managed by a docker-compose file, which is used to start all of the parts of the application in their respective containers. The parts of the system are:

- CouchDB: A NoSQL database that stores all of the data for the system.
- Traefik: A reverse proxy that handles routing requests to the correct container based on the URL.
- Backend: A Node.js server that handles all of the logic for the system.
- Frontend: A React application that provides a user interface for the system.

The system is designed to be highly modular and scalable, allowing for easy addition of new features and components.

## CouchDB

My goals when choosing CouchDB were:

- Scalability: CouchDB is designed to scale horizontally, allowing for easy addition of new nodes to the cluster.
- Flexibility: CouchDB is designed to be highly flexible, allowing for easy customization and integration with other systems.
- Performance: CouchDB is designed to be highly performant, allowing for fast data retrieval and storage.
- Ease of development: CouchDB is designed to be easy to develop with, allowing for rapid prototyping and testing.

With these goals in mind, the backend of the system is split between the backend and CouchDB. CouchDB has HTTP built-in which allows the front end to communicate without having to add essentially a wrapper in the backend. The goal is for all simple CRUD operations to be sent by the front end directly to couchdb and the other more complex operations and machine requests to be sent to the backend.

This structure requires that couchdb handles authentication and authorization, which it luckily does out of the box. This will reduce the amount of code in the backend and allow logic to be in one place.