#!/bin/bash

if curl -s http://tidebh.kaynuy.com | grep "King-Tide"
then
    echo "King-Tide Alert"
else
    echo "no alert"
fi



curl -s http://tidebh.kaynuy.com | grep -q “King-Tide” && echo “King-Tide Alert”


curl -L -s http://tidebh.kaynuy.com | grep -ioF "King-Tide" | echo "King-Tide Alert”


wget -qO- http://tidebh.kaynuy.com | grep -q "King-Tide" && echo "King-Tide Alert"


COUNT=$(wget -qO- http://tidebh.kaynuy.com | grep -c "King-Tide") | echo "Found $COUNT King-Tide"
