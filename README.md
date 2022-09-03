# Installation Late Application on VPS

In this tutorial, we will install the late project continuing the following

1. late-client: react front-end runs on port 80
2. late-server: node back-end runs on port 4000
3. Mongo: mongo database
4. Redis: Redis for cashing the database

## Preparing the server

You have to install the last version of dokku and to access dokku there are two options:

1. Copy the public key of your current user to dokku in this case you will use one private key to access both users by ssh
2. Create new ssh key pairs and place the public key and use them for dokku only

```bash
wget https://raw.githubusercontent.com/dokku/dokku/v0.28.1/bootstrap.sh
sudo DOKKU_TAG=v0.28.1 bash bootstrap.sh

# copying the public-key and add it for dokku
sudo cat /home/ubuntu/.ssh/authorized_keys | dokku ssh-keys:add admin

# configure the dokku domain Building the Image
dokku domains:set-global lateproject.net
```

Configure the global nginx configuration by creating file at `/etc/nginx/conf.d/00-default-vhost.conf`.

> **Note:** The configuration file must be loaded before `/etc/nginx/conf.d/dokku.conf` that's why is name started with 00, so it can not be arranged as a vhost in `/etc/nginx/sites-enabled` that is only processed afterwards.

Make sure to reload Nginx after creating this file by running `service nginx reload`.

Example of `00-default-vhost.conf` configuration which will server files in `/var/www/html` for the global domain `lateproject.net` or `www.lateproject.net`.

```nginx
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name lateproject.net www.lateproject.net;
  access_log off;

  root /var/www/html;

  # Add index.php to the list if you are using PHP
  index index.html index.htm index.nginx-debian.html;

  location / {
    # First attempt to serve request as file, then
    # as directory, then fall back to displaying a 404.
    try_files $uri $uri/ =404;
  }
}
```

### Adding SSL

we will add an SSL certificate only for the domain `lateproject.net` or `www.lateproject.net` we will not add a wildcard for the subdomain because the dokku Let's Encrypt plugin will take care of adding SSL for the subdomains.

let’s obtain trusted HTTPS certificates for our application. It’s also best practice to redirect all encrypted HTTP connections to HTTPS. This is relatively easy with certbot and let's encrypt certificates. The certbot will obtain free certificates and also handle the renewal process automatically. To do that we will install certbot and also a plugin for our NGINX server.

```bash
sudo apt install certbot python3-certbot-nginx

sudo certbot --nginx -d research.the-digital-life.com
```

It will ask you if you want to redirect all traffic from HTTP to HTTPS. Select yes (2). This automatically makes some changes to our NGINX default configuration.

The certbot will update `/etc/nginx/conf.d/00-default-vhost.conf` file to redirect all HTTP to HTTPS and configure it to use SSL for `lateproject.net` or `www.lateproject.net`.

Source: https://www.youtube.com/watch?v=DyXl4c2XN-o

## Dokku Installation and Configuration

```bash
# Install Mongo plugin
dokku plugin:install https://github.com/dokku/dokku-mongo.git mongo

# Install Redis plugin
sudo dokku plugin:install https://github.com/dokku/dokku-redis.git redis

# Install Let's Encrypt plugin and set the email
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
dokku config:set --global DOKKU_LETSENCRYPT_EMAIL=TYPE_EMAIL

# Create mongo service named mongodb
dokku mongo:create mongodb

# Create redis service named redis
dokku redis:create redis

# Create late-client and late-server app
dokku apps:create late-client
dokku apps:create late-server

# setting domains for both apps
dokku domains:set late-client client.lateproject.net
dokku domains:set late-server api.lateproject.net

# Enable SSL for both apps
dokku letsencrypt:enable late-client
dokku letsencrypt:enable late-server

# Link late-server app with both redis and mongodb service
dokku mongo:link mongodb late-server
dokku redis:link redis late-server

# Setting ports for both app
dokku proxy:ports-set late-client http:80:80 https:443:80
dokku proxy:ports-set late-server http:80:4000 https:443:4000

# Setting Env for late-server
dokku config:set late-server NODE_ENV=production NODE_RUN_BY=dokku NODE_V=11 JWT_KEY=secret
```

## Dokku deployment

For deployment of the app, we will use GitHub action to build CI/CD so the process will be automatic and it will trigger at each push for GitHub main branch. there are two methods

### Method I: Direct Deployment

In this method, GitHub action pushes the code to dokku and lets dokku build the image in the VPS by specifying the Dockerfile for each app.

> **Note:** we have to manually delete the intermediate docker image that was used to build the app these images must be labeled `stage=builder` in the docker file

```bash
# This command will delete all image labeled stage=builder
sudo docker image prune --filter label=stage=builder
```

We have to configure dokku with some parameters that are used when building the image

```bash
# We have to tell dokku to use custom docker file
dokku builder-dockerfile:set late-client dockerfile-path ./client/Dockerfile.prod
dokku builder-dockerfile:set late-server dockerfile-path ./server/Dockerfile.prod

# For passing args in the building phase
dokku docker-options:add late-client build '--build-arg VITE_API_URL=https://api.lateproject.net/api/v1'
```

> **Note:** in this method the context in the docker file will be the root `late` folder so all commands should take into consideration to `cd` to project folder. For example, in the `client` docker file when copying the file instead of `Copy . .` we will use `COPY client/. .`

The Github action file

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Cloning Repo
        uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: Deploy the App to Dokku
        uses: dokku/github-action@master
        with:
          git_remote_url: 'ssh://dokku@${{ secrets.SSH_URL }}/late-client'
          ssh_private_key: ${{ secrets.SSH_PRIVATE_KEY }}
```

### Method II: Docker Hub Deployment

In this method, GitHub action builds the image and pushes it to the docker hub then deployed the build image to dokku by rebuilding the app.

In this method, we set all configurations in GitHub action whereas in the previous method dokku will handle docker configuration so this method has more flexibility. Also, we will have a new version in docker hub always

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Cloning Repo
        uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: Building the Image
        run: cd client && docker build -f Dockerfile.prod --build-arg VITE_API_URL=https://api.lateproject.net/v1 -t omarauf/late-client .

      - name: Login to Docker
        run: docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
        env:
          DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}
          DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}

      - name: Push Image to Docker Hub
        run: docker push omarauf/late-client

      - name: Deploy the App to Dokku
        uses: appleboy/ssh-action@master
        with:
          username: ${{ secrets.SSH_USERNAME }}
          host: ${{ secrets.DOMAIN }}
          port: ${{ secrets.SSH_PORT }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: 'sudo docker pull omarauf/late-client && dokku ps:rebuild late-client'
```
