# script analyse logs which format matches:
# [dd.mm. hh:mm:s] <status> <package::method> <line> <id> [<session>] - Method <method> took <response in s> sec
# 
# Usage:
# cat log.soap | grep "took" | grep "\[16.04." | soap_responsetime_overview.sh
# 
# fyi..
# grep "took" - be safe to only grep lines which measure time
# grep "\[.." - to filter for a date
# 

LC_NUMERIC="C" awk '
BEGIN { 
    printf("%-50s %-10s %-10s %-10s %-10s\n" ,
    #printf("%s;%s;%s;%s;%s\n" ,
        "method", "count", "max", "min", "avg");
}
{
    sum[$10]+=$12
    if ( !($10 in min) || (min[$10]>$12) )
        min[$10]=$12;
    if (!($10 in max) || (max[$10]<$12) )
        max[$10]=$12;
    count[$10]++
}
END {
    for ( element in sum )
        printf( "%-50s %-10.f %-10.2f %-10.2f %-10.2f\n",
        #printf( "%s;%f;%f;%f;%f;\n",
            element, count[element], max[element], min[element], sum[element]/count[element] )
}' $1
