#!/bin/sh
cd ../framework
#npm uninstall -g iocore; npm install . -g
cd ../application
npm uninstall iocore; npm install
npm run-script start-nix

