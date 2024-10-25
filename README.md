# Ticket system

Introduction: This is a program that allows for users to create tickets and for Agents to se and respond to the tickets. 
Allowing for an easier comunication between users and the IT-department.

This program is using node.js so you need to install node JS, you can do this here: https://nodejs.org/en
### Database:

To acces the database you will use MariaDB:
To use MariaDB follow this guide to configure the config ticket.json file: https://mariadb.com/get-started-with-mariadb/

in the config/ticket.json file change:
* host
* user
* password

These configs must match your own databse to establish a connection.

### Email

In the file config/email.json you have to config the email adress the notifications will be sent from.

### Auth0

The third party SSO the program uses is Auth0, set up your own Auth0 by following this guide: https://auth0.com/docs/get-started

Keep in mind that the port the program is running on is 1337

In config/SSO.json you have to configure the settings for the log in function to work:
* secret (64 character long random string)
* Client ID
* issuerBaseURL

### File limits
In the config/file_upload file you can change the limits of the amout of files and the size of files uploaded for each ticket the start amount is 5 files and 5 mb max size per file:

* file_amout
* file_size_mb
 Keep the variables as numbers.

### Packages
Before any packages can be installed you need to initiate ```package.json```: do this by opening the project folder and typing ```npm init``` in the terminal.

After this you will need to install these packages:
* express
* jsonwebtoken
* multer
* ejs
* promise-mysql
* node-cron
* nodemailer
* express-openid-connect

To install these packages you need to enter the project folder and type this command for every package:
```npm install "package"``` #example: ```npm install express```

### Starting roles

At the start there exists two roles hard-coded into the system:
* admin@gmail.com
* user@gmail.com

Create an account with Auth0 with the email admin@gmail.com and you can then create more users/admins with the admin tools in the program.
### Testing
The system has no integrated test so to test the system you have to start it upp and manually test it. 
Testing various outputs can be done using ```console.log("Example");``` to allow for viewing exactly what is sent.

## License

Copyright © 2024 Isak Klaesson

This work (source code) is licensed under [MIT](./LICENSE).
