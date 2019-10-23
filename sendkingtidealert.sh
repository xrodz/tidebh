#!/bin/bash

if curl -s http://tidebh.kaynuy.com | grep "King-Tide"
then
    echo "King-Tide Alert"
else
    echo "no alert"
fi
