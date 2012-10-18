# livedata-osc4node

### data viz for OSCGroups with Node.js

- install node.js and npm
- than, access `livedata-osc4node` directory and run:

      npm install
        
- after the dependencies installation, you can run:

      node app.js

- the node.js app listen `2244` port, so you have to start both OscGroupServer and OscGroupClient
-  you won't receive your own messages (limitation of OscGroups), but you can run another client from the same machine to make tests, using other ports:

       OscGroupClient localhost 22242 22247 22245 22246 USER PASS GROUP GROUPPASS
       
- website is running at `http://localhost:3000`