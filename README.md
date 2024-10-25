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

### Packages
Before any packages can be installed you need to initiate ```package.json```: do this by opening the project folder and typing npm init in the terminal.

### Run

TODO: Explain how to run the project (client, server etc.).

## License

TODO: Add license and copyright notice.
