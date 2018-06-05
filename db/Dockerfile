FROM mysql:latest

ENV MYSQL_USER user
ENV MYSQL_ROOT_PASSWORD secret
ENV MYSQL_PASSWORD password
ENV MYSQL_DATABASE blockchain

COPY setup.sql /docker-entrypoint-initdb.d/