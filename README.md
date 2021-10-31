
# Chatwrite
A simple React-based chat app demo for Appwrite

This is a simple instant message chat app with persistent message storage. Users
are able to send messages without having to make accounts. Just pick a name and
join a room.

## Running Chatwrite
1. Install Appwrite (https://appwrite.io/docs/installation)
2. Open the Appwrite console and make a new project.
3. Scroll to the bottom of the dashboard and add a new web app platform, typing
   in your local IP address (not `localhost`).
4. Click on "Database" and make a new collection called "chatMessages" (or
   something similar).
5. Go to the collection's settings and add these rules (with data types):
     - roomName (text)
     - sender (text)
     - messageData (text)
     - timestamp (numeric)
   For each rule, put "`*`" (wildcard) in both the read and write permissions
   list.
6. Clone this repo, `cd` into it, and run `npm i` to install dependencies
7. Edit `config.js` to include the relevant project's API endpoint and ID and
   the messages collection's ID.
8. Run `npm start` to build the web app and start the web server (on port 80 --
   be sure to check your computer's firewall if it doesn't work).

### Troubleshooting
 - (As mentioned before) Your computer's firewall may block incoming connections
   to some or all network ports. Check your firewall settings if necessary.
 - To work around a CORS issue, make sure you are accessing the web app on the
   same host name as the one entered as the `apiEndpoint` in `config.js`.
 - If something is still broken, make an issue on this GitHub repo and I'll see
   if I can fix it.

## How it works
 - A user picks a name, types in a room name, joins the room and starts sending
   messages.
 - In the database, each message is stored as a document in a collection. All
   messages, across all rooms, are stored in the same collection.  
 - When the user sends a message, the client app sends a request to the server,
   which creates a document that has these fields:
   - `roomName` - the room name the user typed in
   - `sender` - the name the user typed in
   - `messageData` - the message the user sent
   - `timestamp` - unix ms timestamp
 - When a user joins a room, the client queries the server for all messages with
   the matching `roomName` field. Additionally, the client subscribes to updates
   to get other such messages.

## To do
 - When the user leaves a room, the username and room name they previously typed
   in should be kept in the input form.
 - Trigger the CORS dialog as soon as CORS errors are detected, instead of only
   when "Start Chatting" is clicked

