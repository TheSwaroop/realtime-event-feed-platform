FROM node:22-alpine AS build
WORKDIR /app
ARG PUBLIC_SOCKET_URL=http://localhost:4000
ARG PUBLIC_API_URL=http://localhost:4000
ENV PUBLIC_SOCKET_URL=$PUBLIC_SOCKET_URL PUBLIC_API_URL=$PUBLIC_API_URL
COPY package*.json ./
COPY packages/shared/package.json packages/shared/package.json
COPY apps/frontend/package.json apps/frontend/package.json
RUN npm install
COPY packages/shared packages/shared
COPY apps/frontend apps/frontend
COPY tsconfig.json ./tsconfig.json
RUN npm --workspace @platform/shared run build && npm --workspace @platform/frontend run build
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/frontend/build ./build
COPY --from=build /app/apps/frontend/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node","build"]
