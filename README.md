# node-oscgroups

### OSCGroups with Node.js

You have to start both OscGroupServer and OscGroupClient on your computer.

The node.js app listen `22244` port and get all incoming messages.


Install node.js and npm then access the directory and run:

      npm install

        
After the dependencies installation, you can run:

      node app.js
      

Website is running at `http://localhost:3000`

You won't receive your own messages (limitation of OscGroups),
but you can run another client from the same machine to make tests, using other ports:

       OscGroupClient localhost 22242 22247 22245 22246 USER PASS GROUP GROUPPASS

### data viz

the homepage now is a simple data-viz from the data flow.

the idea is to extend this app and create more visualizations,
integration with MongoDB for saving data and create an admin area for acessing this data.
