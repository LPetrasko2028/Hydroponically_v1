# Use an official Node.js runtime as the base image
FROM node:20 AS base

# Set the working directory in the container
WORKDIR /usr/local/app

# Frontend Base for Dev and Build
FROM base AS frontend-base
# Copy package.json and package-lock.json to the working directory and smoke test install dependencies
COPY ./frontend/package*.json ./
RUN --mount=type=cache,target=/usr/local/cache/.npm npm install
COPY frontend/* ./

## Frontend Dev
FROM frontend-base AS frontend-dev
CMD ["npm", "run", "dev"]

## Frontend Build
FROM frontend-base AS frontend-build
RUN npm run build

# Backend Base for Dev, Test and Build
FROM base AS backend-base
# Copy package.json and package-lock.json to the working directory and smoke test install dependencies
COPY ./backend/package*.json ./
RUN --mount=type=cache,target=/usr/local/cache/.npm npm install
COPY backend/* ./

## Backend Dev
FROM backend-base AS backend-dev
CMD ["npm", "run", "dev"]

## Backend Test
FROM backend-base AS backend-test
CMD ["npm", "run", "test"]

## Backend Build
FROM backend-base AS backend-start
ENV NODE_ENV=production
COPY --from=frontend-build /usr/local/app/dist ./frontend/dist
EXPOSE 3000
CMD ["npm", "run", "start"]
