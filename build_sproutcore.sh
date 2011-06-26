#!/bin/bash

## script taken from: https://github.com/joachimhs/EurekaJ/blob/master/EurekaJ.View/build_dev.sh
## blog: http://haagen.name/2011/01/17/Integrating_a_SproutCore_client_in_a_deployable_war_file.html

rm -rf ./src/main/sproutcore/tmp
cd ./src/main/sproutcore
/usr/bin/sc-build --build -v