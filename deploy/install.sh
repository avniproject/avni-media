#!/bin/sh
set -e -x


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
    echo "avni-media-user ALL = (ALL) NOPASSWD: ALL" | sudo EDITOR='tee -a' visudo
fi

# ----- Start of comment------
# Refer to https://serverfault.com/questions/936746/bashrc-is-not-sourced-on-ssh-command, for fix when remote ssh commands fail on new machine
# Comment the following lines in .bashrc of ubuntu and avni-media-user
## If not running interactively, don't do anything
##case $- in
##    *i*) ;;
##      *) return;;
##esac
# ----- END of comment------

#Configure NVM
sudo su - avni-media-user << EOF
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
          export NVM_DIR="$HOME/.nvm"
          [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" || true  # This loads nvm
          [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" || true   # This loads nvm bash_completion
EOF

#Stop and delete client and server
sudo su - avni-media-user << EOF
cd ~/
nvm install 19.8.1
nvm use v19.8.1
npm i -g @nestjs/cli
npm install pm2@latest -g
EOF

#Stop and delete client and server
sudo su - avni-media-user << EOF
cd ~/
nvm use v19.8.1
pm2 stop all
pm2 delete all
rm -rf ~/avni-media
EOF

#Apply client and server artifacts
sudo -H -u avni-media-user bash << EOF
mkdir -p ~/avni-media/client
mkdir -p ~/avni-media/server
tar -zxf /tmp/avni-media-client.tgz --directory ~/avni-media/client --totals --checkpoint=1000
tar -zxf /tmp/avni-media-server.tgz --directory ~/avni-media/server --totals --checkpoint=1000
EOF

#Run server
sudo su - avni-media-user << EOF
source ~/.profile  ###Env variables are configure from here
cd ~/avni-media/server
nvm use v19.8.1
pm2 start ./dist/main.js --name "avni-media-server" -p 3010
EOF

#Build client
sudo su - avni-media-user << EOF
source ~/.profile  ###Env variables are configure from here
cd ~/avni-media/client
nvm use v19.8.1
pm2 start npm --name "avni-media-client" -- run start -- -p 3000
EOF

#Persist apps to ensure they get restarted automatically
sudo su - avni-media-user << EOF
pm2 startup systemd
sudo env PATH=$PATH:/home/avni-media-user/.nvm/versions/node/v19.8.1/bin /home/avni-media-user/.nvm/versions/node/v19.8.1/lib/node_modules/pm2/bin/pm2 startup systemd -u avni-media-user --hp /home/avni-media-user
pm2 save
EOF
