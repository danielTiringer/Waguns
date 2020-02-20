FROM nginx:alpine

MAINTAINER Daniel Tiringer

COPY public /usr/share/nginx/html

EXPOSE 80 443
