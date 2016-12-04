# test-node
Simple API built with node.js and express framework<br />
Behind this there is a MongoDB database hosted on https://mlab.com/<br />

# Up and running
* Get sources: https://github.com/1475963/test-node.git<br />
* Install / update dependencies: "$> npm install"<br />
* Set the environment variable "NODE_ENV" to "development"<br />
* Run "$> npm start"<br />

# Usage
* Send http requests to this endpoint: http://localhost/user
* A postman collection is available under the folder /test, you can import it and play with it
* Available actions:
* Create a new user
* Show a single user, filtering by name or id (mongodb id)
* Show all users
* Update a user's data (name or age)
* Remove a user
