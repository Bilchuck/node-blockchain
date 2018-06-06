FROM mysql:5

ENV MYSQL_ROOT_PASSWORD secret
ENV MYSQL_DATABASE blockchain

EXPOSE 3306

COPY setup.sql /docker-entrypoint-initdb.d