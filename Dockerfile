FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json .npmrc ./
COPY packages/api/package.json ./packages/api/package.json
COPY packages/front/package.json ./packages/front/package.json
RUN npm ci --omit=dev --workspace=packages/api --include-workspace-root=false

COPY packages/api/knexfile.js ./packages/api/knexfile.js
COPY packages/api/src ./packages/api/src
COPY packages/api/migrations ./packages/api/migrations

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start", "--workspace=packages/api"]
