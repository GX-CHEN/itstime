# itstime (It's time)

An web application to manage daily plan and schedule. Support for view on mobile, and export with app icon on phone screens.

## Demo Website

* https://itstime.mobi
* Demo Account: test/test
* You can also register an account, no email or personal info are required. Totally free and anonymous

## Application Screenshots

### Schedule Views. After login, user will see all available schedule list (each new user will have 4 default ones).

<p float="left">
<img src="screenshots/schedule_list.jpg" alt="Schedule List"  width="260"/>
<img src="screenshots/sidebar.jpg" alt="Schedule List Sidebar" width="260" />
</p>
<div style="clear: both;"></div>

### Add & Delete Schedule

<p float="left">
<img src="screenshots/add_schedule.jpg" alt="Add Schedule" width="260" />
<img src="screenshots/delete_schedule.jpg" alt="Delete Schedule" width="260" />
</p>
<div style="clear: both;"></div>

### Each Schedule have a list of events can be viewed in calendar. Each event support add/edit/delete

<p float="left">
<img src="screenshots/events_table.jpg" alt="Event Table" width="260" />
<img src="screenshots/edit_event.jpg" alt="Edit Events" width="260" />
<div style="clear: both;"></div>
</p>

## Use the following commands to build and run the app

### In local
```
npm install -g nodemon
npm install -g server

cd itstime-be
npm install

cd ../itstime-fe
npm install

cd ../itstime-web
npm install
```
### global command to host all the files
```
npm start
```
### to server the React file in production mode

For environments using Node, the easiest way to handle this would be to install serve and let it handle the rest:
```
npm install -g serve
serve -s build
```
The last command shown above will serve your static site on the port 5000. Like many of serve’s internal settings, the port can be adjusted using the -p or --port flags.

Run this command to get a full list of the options available:

serve -h
