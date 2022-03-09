#!/bin/bash

if hash nethogs 2>/dev/null; then
        echo "Program is starting..."
        echo "Interface connected..."
        echo "Runnig Diagnostics & Analysis..."
        pingVal=`ping -s 20 -c 2 google.com | sed -n '$p' | awk -F/ '{print $6}'`
        echo "Ping to server: $pingVal ms"
        int=${pingVal%.*}
        if [ $int -gt 500 ]; then
            echo "Slow response...Bandwidth allocation executing!"
        else
            echo "Good response...No tempering is needed!"
            echo "Terminating Program!"
            exit 0
        fi
        echo "Creating info file..."
        
        sudo nethogs -d 8 -t 2>&1 -c 2 | sed '1,5d;/Refreshing:/d;s_\t_ _g' > info.txt
        echo "info.txt added!"
        echo "Top 3 bandwidth consuming programs are:- "
        grep -v 'unknown\|Ethernet' info.txt | rev\
        | cut -d' ' -f3\
        | rev | rev | cut -d/ -f2\
        | rev | sed -r '/^\s*$/d'\
        | head -3 > pid.txt

        cat pid.txt
        grep -v 'unknown\|Ethernet' info.txt\
        | awk BEGIN{'FS=" "}{print $1}'\
        | sed -r '/^\s*$/d'\
        | head -3 > pname.txt

        echo "Would you like to Freeze these program for 15 Seconds? (Y/N)"
        cat pname.txt
        read choice
        if [ "$choice" = "y" ];then
            echo "Freezeing programs!"
            input="/home/siddharth/temp/pid.txt"
            while IFS= read -r line
            do
            kill -STOP $line
            done < "$input"
            sleep 15
            echo "Resuming programs!"
            input2="/home/siddharth/temp/pid.txt"
            while IFS= read -r line
            do
            kill -CONT $line
            done < "$input2"
        fi
        echo "Terminating Program!"

    else
        echo "Pre-requisites are not installed....enter password to install! press ctrl+C to abort"
        sudo apt-get -qq install nethogs
        sudo apt-get -qq install ping
        echo "Program is starting..."
        echo "Interface connected..."
        echo "Runnig Diagnostics & Analysis..."
        pingVal=`ping -s 20 -c 2 google.com | sed -n '$p' | awk -F/ '{print $6}'`
        echo "Ping to server: $pingVal ms"
        int=${pingVal%.*}
        if [ $int -gt 500 ]; then
            echo "Slow response...Bandwidth allocation executing!"
        else
            echo "Good response...No tempering is needed!"
            echo "Terminating Program!"
            exit 0
        fi
        echo "Creating info file..."
        
        sudo nethogs -d 8 -t 2>&1 -c 2 | sed '1,5d;/Refreshing:/d;s_\t_ _g' > info.txt
        echo "info.txt added!"
        echo "Top 3 bandwidth consuming programs are:- "
        grep -v 'unknown\|Ethernet' info.txt | rev\
        | cut -d' ' -f3\
        | rev | rev | cut -d/ -f2\
        | rev | sed -r '/^\s*$/d'\
        | head -3 > pid.txt

        cat pid.txt
        grep -v 'unknown\|Ethernet' info.txt\
        | awk BEGIN{'FS=" "}{print $1}'\
        | sed -r '/^\s*$/d'\
        | head -3 > pname.txt

        echo "Would you like to Freeze these program for 15 Seconds? (Y/N)"
        cat pname.txt
        read choice
        if [ "$choice" = "y" ];then
            echo "Freezeing programs!"
            input="/home/siddharth/temp/pid.txt"
            while IFS= read -r line
            do
            kill -STOP $line
            done < "$input"
            sleep 15
            echo "Resuming programs!"
            input2="/home/siddharth/temp/pid.txt"
            while IFS= read -r line
            do
            kill -CONT $line
            done < "$input2"
        fi
        echo "Terminating Program!"
fi