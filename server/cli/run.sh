# remove all containers
docker stop $(docker ps -aq)
docker rm -f $(docker ps -aq)

# run
docker-compose -f ${workspace}/server/docker-compose.yaml up