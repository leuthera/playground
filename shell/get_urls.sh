#!/usr/bin/bash

# get_urls.sh /path/to/search "search for"

path=${1:-./}
check_string=${2:-.+}

array=($(grep -roE 'href="([^"]+)"' $path | cut -d'"' -f2 | grep -iE "${check_string}"))
for url in "${array[@]}"; do
    echo "${url}"
done
