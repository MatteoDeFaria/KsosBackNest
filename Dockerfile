FROM node:20.10.0-alpine3.18

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "primsa", "generate", "&&" ,"yarn", "run", "start"]