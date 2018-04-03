### Use the following commands to build and run the app

## In local
npm install -g nodemon
npm install -g server 

cd itstime-be
npm install

cd ../itstime-fe
npm install

cd ../itstime-web
npm install

# global command to host all the files
npm start

# to server the React file in production mode
For environments using Node, the easiest way to handle this would be to install serve and let it handle the rest:

npm install -g serve
serve -s build
The last command shown above will serve your static site on the port 5000. Like many of serve’s internal settings, the port can be adjusted using the -p or --port flags.

Run this command to get a full list of the options available:

serve -h