#!/bin/bash
# Script to update the chores application

set -e # Exit immediately if a command exits with a non-zero status.

echo "--- Pulling latest code from GitHub ---"
git pull

echo ""
echo "--- Updating Frontend ---"
cd frontend
npm install --silent
npm run build
echo "Copying frontend build to /var/www/gergel.casa..."
sudo cp -r dist/* /var/www/gergel.casa/
sudo chown -R www-data:www-data /var/www/gergel.casa

echo ""
echo "--- Updating Backend ---"
cd ../backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt --quiet
python manage.py migrate
python manage.py collectstatic --noinput

echo ""
echo "--- Restarting Services ---"
sudo systemctl restart chores-backend
sudo systemctl restart nginx

echo ""
echo "Update complete! Application is running at https://gergel.casa"
