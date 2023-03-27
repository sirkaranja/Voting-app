# Favourite Animal Voting App
This is a web application that allows users to vote for their favorite animal out of a list of animals. The application uses a  API to fetch the list of animals and update the votes for each animal.

# Installation
To use this application, you will need to have Node.js and npm installed on your system. Once you have those installed, you can follow these steps:

1. Clone this repository to your local machine.
2. Open a terminal in the project directory and run the command npm install to install the required dependencies.
3. Start the application by running the command npm start.
The application should now be running on http://localhost:3000.

# Usage
When you visit the application in your web browser, you will see a list of animals. Clicking on an animal will display more details about that animal, including an image and a button to vote for the animal.

>> Clicking the "Vote for [animal name]" button will increase the number of votes for that animal by 1. You can also reset the vote count for an animal by clicking the "Reset for [animal name]" button.

>> You can reset the vote count for all animals by clicking the "Reset All Votes" button at the bottom of the page.

# API
The application uses an API to fetch the list of animals and update the vote count for each animal. The API endpoints are:

GET /characters: Returns a list of animals.
PATCH /characters/:id: Updates the vote count for the animal with the specified ID.

# License
This project is licensed under the MIT License. See the LICENSE file for details.
