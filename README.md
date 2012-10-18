# livedata-osc4node

### data viz for OSCGroups with Node.js

Install node.js and npm then access `livedata-osc4node` directory and run:

      npm install

        
After the dependencies installation, you can run:

      node app.js
      
The node.js app listen `22244` port, so you have to start both OscGroupServer and OscGroupClient  you won't receive your own messages (limitation of OscGroups), but you can run another client from the same machine to make tests, using other ports:

       OscGroupClient localhost 22242 22247 22245 22246 USER PASS GROUP GROUPPASS
       
Website is running at `http://localhost:3000`