# proxy server
FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY dev.nginx.conf /etc/nginx/conf.d

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]