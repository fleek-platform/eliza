#!/bin/bash

# Path to the installed_plugins.txt file
PLUGINS_FILE="./fleek/installed_plugins.txt"

# Check if the file exists
if [ ! -f "$PLUGINS_FILE" ]; then
    echo "Error: $PLUGINS_FILE not found!"
    exit 1
fi

# Read each line from the file and remove the plugin
echo "Starting to remove all plugins..."
while IFS= read -r plugin || [ -n "$plugin" ]; do
    # Skip empty lines
    if [ -z "$plugin" ]; then
        continue
    fi
    
    echo "Removing plugin: $plugin"
    npx elizaos plugins remove "$plugin"
    
    # Optional: add a small delay between operations
    sleep 0.5
done < "$PLUGINS_FILE"

echo "All plugins have been removed!" 