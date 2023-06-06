#!/bin/sh

USERID=avni-media-user
GROUPID=avni-media-user
id -g ${GROUPID}
if [ $? -eq 1 ]; then
    groupadd avni-media-user
fi

id ${USERID}
if [ $? -eq 1 ]; then
    useradd -g avni-media-user avni-media-user
    useradd -g avni-media-user ubuntu
    usermod -aG wheel avni-media-user
    echo "avni-media-user ALL = (ALL) NOPASSWD: ALL" | sudo EDITOR='tee -a' visudo
fi

#Apply client and server artifacts
sudo -H -u avni-media-user bash << EOF
cd ~/ && rm -rf ~/avni-media
mkdir -p ~/avni-media/client
mkdir -p ~/avni-media/server
sudo tar -zxvf /tmp/avni-media-client.tgz ~/avni-media/client
sudo tar -zxvf /tmp/avni-media-server.tgz ~/avni-media/server
sudo rm -rf /tmp/avni-media-client.tgz /tmp/avni-media-server.tgz
EOF

#Run server
sudo -H -u avni-media-user bash << EOF
cd ~/avni-media/server
nvm use v19.8.1
pm2 start ./dist/main.js --name "avni-media-server" -p 3010
EOF

#Build client
sudo -H -u avni-media-user bash << EOF
cd ~/avni-media/client
nvm use v19.8.1
pm2 start npm --name app1 -- run start -- -p 3000
pm2 start npm --name "avni-media-client" -- run start -- -p 3000
EOF

#Persist apps to ensure they get restarted automatically
sudo -H -u avni-media-user bash << EOF
pm2 startup systemd
pm2 save
EOF