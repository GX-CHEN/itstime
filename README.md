[![Build Status](https://travis-ci.com/GX-CHEN/itstime.svg?branch=master)](https://travis-ci.com/GX-CHEN/itstime)

# itstime (It's time)

## What is this?

- A web application designed to manage daily plan and schedule, to maintain healthy life style.
- UI is optimized for both computer browser and mobile devices. Support add "App Icon" on Android or iOS devices.
- A few recommended schedules will be pre-populated when a new user is registered and login. These schedules are fully customizable.

## Demo website

- https://itstime.life
- Demo Account: test/test
- You can also register an account, no email or personal info are required, totally free and anonymous.

## What can it do?

### Schedule list view

After login, user will see all available schedule list (each new user will have 4 pre-populated default ones).

<p float="left">
<img src="screenshots/schedule_list.jpg" alt="Schedule List"  width="260"/>
<img src="screenshots/sidebar.jpg" alt="Schedule List Sidebar" width="260" />
</p>
<div style="clear: both;"></div>

### Schedule view

Users are able to add, view, edit or delete schedules

<p float="left">
<img src="screenshots/add_schedule.jpg" alt="Add Schedule" width="260" />
<img src="screenshots/delete_schedule.jpg" alt="Delete Schedule" width="260" />
</p>
<div style="clear: both;"></div>

### Event list (calendar) view, and event view

Each schedule have a list of events, which can be viewed in a calendar.
You can click on any event on the calendar, to view details, or edit/delete it. You can also click the "plus" button on the bottom right of the calendar view to add a new event.

<p float="left">
<img src="screenshots/events_table.jpg" alt="Event Table" width="260" />
<img src="screenshots/edit_event.jpg" alt="Edit Events" width="260" />
<div style="clear: both;"></div>
</p>

## How to build

### Install app dependencies

```bash
# install global npm package which helps run the app
npm install -g nodemon
npm install -g serve

# install dependencies for both server and client side
cd server
npm install

cd ../client
npm install
```

### Run in local dev mode

```bash
# Assume you're in the root directory

# Go to server directory first, run server-side first
cd server
npm start

# Then go to client directory, run client-side
cd ../client
npm install
```

### Run in production mode

- For the client side, production ready bundle file can be achieved by running `npm run build`, then you can serve it use the web-server of your choice (Nginx or Apache)
- For the server side, there are few options to run it, and keep it running. I would recommend a tool called PM2 which can help manage Node processes very easily

## Tech Stacks

- Server-side: NodeJS, Express, MongoDB
- Client-side: React, Redux, Ant Design
