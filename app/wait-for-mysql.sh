echo "DATABASE_HOST"
echo $DATABASE_HOST
until nc -z -v -w30 $DATABASE_HOST 3306
do
  echo "CFG_MYSQL_HOST"
  echo $CFG_MYSQL_HOST
  echo "Waiting for database connection..."
  # wait for 5 seconds before check again
  sleep 5
done

echo "MySQL found!"