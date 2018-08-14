#/bin/bash

IFS=$'\n' 
root_path=$(pwd)
project=$(basename $root_path)
base_path=$(git rev-parse --show-toplevel)
storage_path=~/Desktop/unused_files

find . -type f -printf "%T@ %p\n" | sort -nr | cut -d\  -f2- | xargs -I{} basename {} > $storage_path/${project}_files

for file in `cat $storage_path/${project}_files` 
do
    ack $file $base_path | grep ${project}
    if [ $? -ne 0 ]; then
        echo "$file" >> $storage_path/${project}_unused_files
    fi
done

#cat $storage_path/${project}_unused_files | xargs -I{} find $root_path -name {} | xargs git rm
