# --- Base image with pnpm enabled
FROM node:lts AS base
WORKDIR /app
# Enable Corepack and pin pnpm version (adjust as needed)
RUN corepack enable && corepack prepare pnpm@9.9.0 --activate

# --- Dependencies (install with lockfile)
FROM base AS deps
# If you have an .npmrc, copy it too
COPY package.json pnpm-lock.yaml ./
# Pre-fetch to leverage Docker layer cache, then install
RUN pnpm fetch
RUN pnpm install --frozen-lockfile

# --- Build (needs devDependencies)
FROM base AS build
COPY --from=deps /app/node_modules /app/node_modules
COPY . ./
# Build your production bundle (ensure this script exists)
RUN pnpm run build:prod

# --- Prune to production-only node_modules
FROM base AS prod-deps
COPY --from=deps /app/node_modules /app/node_modules
COPY package.json pnpm-lock.yaml ./
RUN pnpm prune --prod

# --- Runtime
FROM node:lts AS runtime
WORKDIR /usr/src/app
ENV NODE_ENV=production
ARG PORT=3000
ENV PORT=${PORT}

# Copy production dependencies and built files
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# Optionally copy package.json if your app reads metadata at runtime
COPY package.json ./

EXPOSE ${PORT}
CMD ["pnpm", "run", "start:prod"]