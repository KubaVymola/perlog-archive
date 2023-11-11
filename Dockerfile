FROM node:20-slim as build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --prod
COPY . .
RUN yarn build


FROM node:20-slim

WORKDIR /app
COPY --from=build /app /app
EXPOSE 4200

CMD ["yarn", "start:prod"]
