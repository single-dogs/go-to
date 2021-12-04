__dirname=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# remove all containers
docker stop $(docker ps -aq)
docker rm -f $(docker ps -aq)

# mongodb
docker run -itd -v $__dirname/../data:/data/db -p 27017:27017 mongo mongod --dbpath /data/db --bind_ip_all

# server env
export GOTO_PORT=80
export GOTO_MONGOURL="mongodb://localhost:27017/goto"
# server
node  --inspect=0.0.0.0:9229 -r $__dirname/../node_modules/ts-node/register $__dirname/../src/index.ts