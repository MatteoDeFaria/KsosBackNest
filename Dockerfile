FROM node:20.10.0-alpine3.18 as builder

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn run build

FROM node:20.10.0-alpine3.18

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/nest-cli.json ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/tsconfig.build.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]