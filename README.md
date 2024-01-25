# Geralt locally
- `npm install`
- `npm start` to run

# Docker 
The docker container will pull the projects package.js run npm install, and then start the node api
- Build a new image: `docker build --tag geralt-api:[version] .`
- Run image within containter: `docker run --publish 3000:3000 geralt-api` NOTE: for ports -> [host port]:[container port]
- To show running containers: `docker ps -all` NOTE: "all" flag lists all containers
- To restart: `docker restart geralt-api`
- To stop: `docker stop geralt-api` (you can also supply a container ID found listed in the `ps` command)
- To remove container: `docker rm geralt-api`