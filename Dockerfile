FROM node:22-alpine

RUN apk add --no-cache libc6-compat vips-dev

RUN corepack enable
RUN corepack prepare pnpm@10.17.1 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml .npmrc ./

RUN pnpm install --no-frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]