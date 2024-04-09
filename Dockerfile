FROM node:20.10.0-alpine3.18

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn run build

RUN yarn prisma generate

EXPOSE 3000

CMD ["yarn", "primsa", "migrate", "deploy", "&&" ,"yarn", "run", "start"]