__dirname=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# remove all containers
docker stop $(docker ps -aq)
docker rm -f $(docker ps -aq)

# run
docker-compose -f $__dirname/../docker-compose-debug.yaml up