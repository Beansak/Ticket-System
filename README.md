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

## License

MIT License

Copyright (c) 2024 Beansak

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
