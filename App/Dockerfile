# Use an official Node.js runtime as the base image
FROM node:22-alpine AS base

# Set the working directory in the container
WORKDIR /usr/local/app

# Frontend Base for Dev and Build
FROM base AS frontend-base
# Copy package.json and package-lock.json to the working directory and smoke test install dependencies
COPY ./frontend/package*.json ./
RUN npm install

# [1] DO NOT COPY the frontend -- USING VOLUME instead for live reloading in dev
# Relocating this to the build stage
# COPY frontend/* ./

## Frontend Dev
FROM frontend-base AS frontend-dev
CMD ["npm", "run", "dev"]

## Frontend Build
FROM frontend-base AS frontend-build
COPY frontend/ ./
RUN npm run build

# Backend Base for Dev, Test and Build
FROM base AS backend-base
# Copy package.json and package-lock.json to the working directory and smoke test install dependencies
COPY ./backend/package*.json ./
RUN npm install

## Backend Dev
FROM backend-base AS backend-dev
CMD ["npm", "run", "dev"]

## Backend Test
FROM backend-base AS backend-test
CMD ["npm", "run", "test"]

## Backend Build
FROM backend-base AS backend-start
# COPY backend/ ./
ENV NODE_ENV=production
COPY --from=frontend-build /usr/local/app/dist ./frontend/dist
EXPOSE 3000
CMD ["npm", "run", "start"]
