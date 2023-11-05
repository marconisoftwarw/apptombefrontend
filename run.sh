#!/bin/bash

clear
clear

lsof -ti:3006 | xargs kill

open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials


npm start
