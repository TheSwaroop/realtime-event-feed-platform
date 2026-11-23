FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY packages/shared/package.json packages/shared/package.json
COPY apps/backend/package.json apps/backend/package.json
RUN npm install
COPY packages/shared packages/shared
COPY apps/backend apps/backend
COPY tsconfig.json ./tsconfig.json
RUN npm --workspace @platform/shared run build && npm --workspace @platform/backend run build
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 4000
CMD ["node","apps/backend/dist/server.js"]
