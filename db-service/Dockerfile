FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD secret
ENV MYSQL_DATABASE blockchain
ENV MYSQL_USER root
ENV MYSQL_PASSWORD secret

ADD setup.sql /docker-entrypoint-initdb.d