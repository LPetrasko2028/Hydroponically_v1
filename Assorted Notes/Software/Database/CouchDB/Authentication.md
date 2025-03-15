# Authentication with CouchDB

## Overview

I am contemplating using 3 methods for authentication in my CouchDB application:

1. Cookie-based authentication with couchdb directly
2. Proxy Authentication using an external service (either my reverse proxy (traefik) or my node backend)
3. JWT (JSON Web Token) authentication using a node backend

## Attributes I want to achieve:

- Users can create accounts, log in, and log out
- Users can view their own profile and change their password
- Users can login on every device, unless otherwise specified (Replication of user data or single global source of truth)
- Users can have different roles (admin, user, etc.)

## Security Considerations:

- Data is not inherently sensitive for read, but some variables such as device relay controls are sensitive as they are used to control mains power.

## Cookie-based Authentication

This is the simplest method of authentication, but it has some drawbacks:

- Cookies are not secure, so they can be easily intercepted and stolen
- Cookies are not encrypted, so they can be easily read by malicious actors
- Cookies are not protected against cross-site request forgery (CSRF) attacks

### Pros:

- Easy to implement
- Simple to use
- Easy to set up

### Cons:

- Cookies are not secure
- Cookies are not encrypted
- Cookies are not protected against CSRF attacks

### Implementation:

1. Provide login to couchdb directly
2. Get cookie from couchdb
3. Use cookie to authenticate requests to couchdb
4. User data must be replicated to all devices for this method to work, which is dependent on if couchdb will allow replication of user data and if it is secure enough.

## Proxy Authentication

This method involves using an external service to authenticate users. The external service can be a reverse proxy (traefik) or a node backend.

### Pros:

- Provides a secure and encrypted method of authentication
- Provides a centralized location for authentication
- Provides a single source of truth for user data

### Cons:

- Requires an external service to be set up and maintained
- Requires the external service to be secure and encrypted
- Requires the external service to be maintained and updated

### Implementation:

1. User logs in to external service
2. External service authenticates user and returns a JWT token
3. User sends JWT token with each request to couchdb

## JWT Authentication

This method involves using a node backend to authenticate users.

### Pros:

- Provides a secure and encrypted method of authentication
- Provides a centralized location for authentication
- Provides a single source of truth for user data
- Requires no external service to be set up or maintained

### Cons:

- Requires a node backend to be set up and maintained
- Requires the node backend to be secure and encrypted
- Requires the node backend to be maintained and updated

### Implementation:

1. User logs in to node backend
2. Node backend authenticates user and returns a JWT token
3. User sends JWT token with each request to couchdb

## Conclusion:

TODO: 
    - Research and compare the 3 methods of authentication.
    - Assess each field below and determine which method is best for my application.

### Rating:

- Cooke-based authentication:
  1. Implementation: X/5
  2. Security: X/5
  3. Maintenance: X/5
  4. Scalability: X/5
  5. Performance: X/5 - User data is replicated, so no latency issues
- Proxy authentication:
  1. Implementation: X/5
  2. Security: X/5
  3. Maintenance: X/5
  4. Scalability: X/5
  5. Performance: X/5 - Couchdb request to external service for every request
- JWT authentication:
  1. Implementation: X/5
  2. Security: X/5
  3. Maintenance: 5/5
  4. Scalability: 5/5
  5. Performance: 5/5 - Couchdb request to external service for every request