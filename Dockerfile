FROM node:16.15.0-alpine3.14 as build

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --production

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

#NGINX Web Server
FROM nginx:1.12-alpine as prod

COPY --from=build /code/build /usr/share/nginx/html  

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]