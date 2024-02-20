# Docker local development

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/lisnayk/ttp-lecture-examples.git
    cd ttp-lecture-examples/01-docker-development
    ```


2. Run Docker Compose:

    ```bash
    docker-compose up
    ```

   This command will start the defined services, networks, and volumes.

3. Access your application:

    - For example, if using Nginx, open a web browser and go to [http://localhost:8080](http://localhost:8080).

4. Stop and remove the Docker Compose setup:

    ```bash
    docker-compose down
    ```

   This will stop and remove the running containers, networks, and volumes.

## Customization

- Modify the `docker-compose.yml` file to suit your application's requirements.

