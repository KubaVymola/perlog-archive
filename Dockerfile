FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile --prod && yarn next telemetry disable && yarn build && yarn cache clean

EXPOSE 4200

CMD ["yarn", "start:prod"]