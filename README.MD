# Kanban API and Front

## Table of Contents
- [Kanban API and Front](#kanban-api-and-front)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Technologies Used](#technologies-used)
  - [Description of features](#description-of-features)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Project Status](#project-status)
  - [Room for Improvement](#room-for-improvement)
  - [Acknowledgements](#acknowledgements)
  - [Contact](#contact)



## About
  This is a training project allowing an user to organize his activities alone or in a team. Classic Kanban.
  This project highlights my ability to set up a REST API (CRUD) and exploiting this API from the front.
  The visual is "minimalist" powered by BulmaCSS.


## Technologies Used

- *Front-end*
  
  - HTML5 / CSS3 / JavaScript
  - Bulma CSS - version 0.7.2
  - SortableJS - version 1.15

- *Back-end*
  
  - Postgres - version 12
  - Node JS - version 16
  - Express - version 4.18.2
  - Sequelize - version 6.28

## Description of features

The main intention of this project is to implement the classic features of a simple Kanban such as :
  - Creation of a new List, New Cards and New Labels
  - A card can be assigned to a list and a label can be assigned to a card

The user is free to organize his Kanban according to his wishes by modifying the position of the list or the position of a card in a list with Drag&Drop. Very smooth and useful.

The user can also choose to rename a list, a card or a label. He can also change the background's color of the card by clicking on the buttons provided. Only lists and labels can be renamed by double clicking on their name.

Moreover, the user can finally choose to delete a list, a card or a label as well as the associated data. So be careful.

## Setup
Clone this repo to your desktop and run `npm install` to install all the dependencies.
Create an `.env` file and change the data necessary for the connection.
You must create and import the database present in the 'data' folder. 

## Usage
After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed and Database configure, you can run  `npm run dev` to start the application. You will then be able to access it at localhost:3000

## Project Status
Project is: _finish_

## Room for Improvement

Room for improvement:
- Deploy the application
- Create a better front

## Acknowledgements
Give credit here.
- This project was inspired by Ecole O'Clock


## Contact
Developed by [@lenny-zanotelli](https://www.linkedin.com/in/lenny-zanotelli/) - feel free to contact me!

