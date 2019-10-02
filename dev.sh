#!/bin/bash
RESTORE='\033[0m'
RED='\033[00;31m'
GREEN='\033[00;32m'
YELLOW='\e[0;33m'
HOST_PROD=3.130.167.180

# Because nobody wants to be memorizing commands all the time
# Instructions:
# 1) ". dev.sh"
# 2) "devhelp"
# 3) Be happy


# workon reactMock  # Change this to your project's name

export PROJ_BASE="$(dirname "${BASH_SOURCE[0]}")"
CD=$(pwd)
cd $PROJ_BASE
export PROJ_BASE=$(pwd)
cd $CD

#. ci/funcs.sh

function devhelp {
    echo -e "${GREEN}devhelp${RESTORE}           Prints this ${RED}help${RESTORE}"
    echo -e ""       
    echo -e "${GREEN}dkbuild${RESTORE}           Builds a ${RED}docker image${RESTORE} for this project"
    echo -e ""
    echo -e "${GREEN}dknpminstall${RESTORE}      Download node dependencies to ${RED}./node_modules/${RESTORE}"
    echo -e ""    
    echo -e "${GREEN}dkrun_dev${RESTORE}        Starts Frontend (dockerized) in dev mode."
    echo -e ""    
    echo -e "${GREEN}dk <command>${RESTORE}      Runs ${RED}<command>${RESTORE} inside main container"
    echo -e "                  Example:"
    echo -e "                   dk ${RED}bash${RESTORE}"
    echo -e ""  
    
}

function dkbuild {
    CD=$(pwd)
    cd $PROJ_BASE
    docker build -t react .
    exitcode=$?
    cd $CD
    return $exitcode
}

function dknpminstall {
    CD=$(pwd)
    cd $PROJ_BASE
    docker run -it --rm -v $(pwd):/app -w /app/frontend -e NODE_ENV=development react npm install
    exitcode=$?
    cd $CD
    return $exitcode
}

function dkrun_dev {
    docker stop react
    docker rm react
    docker run -it --restart unless-stopped --name react -p 3000:3000 -p 3001:3001 react start_dev.sh
}

function dk {
    docker exec -it react $@
}

function echo_red {
    echo -e "\e[31m$1\e[0m";
}

function echo_green {
    echo -e "\e[32m$1\e[0m";
}

function echo_yellow {
    echo -e "${YELLOW}$1${RESTORE}";
}

echo_green "Welcome to reactMock's dev env"
echo_green "Hint: autocomplete works for the commands below ;)"
echo_red   "------------------------------------------------------------------------"
devhelp
