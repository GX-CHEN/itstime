git checkout deployment
git pull
sudo cp -r client/build/ /var/www/html/
sudo service nginx restart
echo 'succeed with frontend deployment'
