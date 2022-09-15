# frontend content
FROM node:16.13.2 as builder

WORKDIR /usr/src/app
# ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV REACT_APP_ENV=production
COPY package.json .
RUN npm install --silent

COPY . .
RUN npm run build

# web server and proxy
FROM nginx:1.23.1

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY --from=builder /usr/src/app/build /etc/nginx/frontworks/noveltime

# EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]