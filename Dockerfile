FROM node:14-alpine as builder
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]