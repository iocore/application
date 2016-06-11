#!/bin/sh
cd ../framework
./node_modules/.bin/babel ./src --optional runtime --presets stage-0,es2015 -d ./
cd ../application
npm run-script start-nix

