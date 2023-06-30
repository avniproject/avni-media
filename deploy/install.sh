#!/bin/sh

USERID=avni-media-user
GROUPID=avni-media-user
id -g ${GROUPID}
if [ $? -eq 1 ]; then
    groupadd avni-media-user
fi

id ${USERID}
if [ $? -eq 1 ]; then
    useradd -m --shell /bin/bash -g avni-media-user avni-media-user
    useradd -g avni-media-user ubuntu
    usermod -aG wheel avni-media-user
    echo "avni-media-user ALL = (ALL) NOPASSWD: ALL" | sudo EDITOR='tee -a' visudo
fi

#Stop and delete client and server
sudo su - avni-media-user << EOF
cd ~/
nvm use v19.8.1
pm2 stop all
pm2 delete all
rm -rf ~/avni-media
EOF

#Apply client and server artifacts
sudo su -u avni-media-user << EOF
mkdir -p ~/avni-media/client
mkdir -p ~/avni-media/server
tar -zxf /tmp/avni-media-client.tgz --directory ~/avni-media/client
tar -zxf /tmp/avni-media-server.tgz --directory ~/avni-media/server
EOF

#Run server
sudo su - avni-media-user << EOF
cd ~/avni-media/server
nvm use v19.8.1
pm2 start ./dist/main.js --name "avni-media-server" -p 3010
EOF

#Build client
sudo su - avni-media-user << EOF
cd ~/avni-media/client
nvm use v19.8.1
pm2 start npm --name "avni-media-client" -- run start -- -p 3000
EOF

#Persist apps to ensure they get restarted automatically
sudo su - avni-media-user << EOF
pm2 startup systemd
pm2 save
EOF