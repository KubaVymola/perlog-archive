FROM node:20-alpine

WORKDIR /app

RUN yarn install --frozen-lockfile --prod && yarn next telemetry disable && yarn build && yarn cache clean

COPY . .

EXPOSE 4200

CMD ["yarn", "start:prod"]