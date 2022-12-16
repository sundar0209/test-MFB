#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 755 /var/www/html/sundar

#navigate into our working directory where we have all our github files
cd /var/www/html/sundar

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm install --unsafe --perm

#npm take build 
npm run build 
cd build 
mv * /var/www/html/sundar
cd ../

#start our node app in the background
#node app.js > app.out.log 2> app.err.log < /dev/null & 

#start ui in linux server .
serve -s sundar &>> out.log &

