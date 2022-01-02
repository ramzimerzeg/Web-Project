#!/bin/bash

apt-get update

apt-get upgrade

apt-get install curl

curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

apt-get install -y nodejs

apt-get install git

npm install -g @angular/cli@13.1.2

node -v

git --version

ng version
