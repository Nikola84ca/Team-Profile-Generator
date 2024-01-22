const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const team = [];

// This function will gather the information about the team manager

function promptManager() {
    inquirer
      .prompt([
       
            {
                type: 'input',
                name: 'name',
                message: 'Enter your name:',
              },
              {
                type: 'input',
                name: 'id',
                message: 'Enter your Employee ID:',
              },
              {
                type: 'input',
                name: 'email',
                message: 'Enter your email address:',
              },
              {
                type: 'input',
                name: 'officeNumber',
                message: 'Enter your office number:',
              },
        
        ])
      .then((answers) => {
        const manager = new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.officeNumber
        );
        team.push(manager);
        promptUser();
      });
  }


  // Function to prompt user for team members
function promptUser() {
    inquirer
      .prompt([
        {
          type: 'checkbox',
          name: 'newmember',
          message: 'Select an option:',
          choices: [
            'Add a new engineer',
            'Add a new intern',
            'Finish building the team',
          ],
        },
      ])
      .then((data) => {
        if (data.newmember.includes('Add a new engineer')) {
          promptEngineer();
        } else if (data.newmember.includes('Add a new intern')) {
          promptIntern();
        } else if (data.newmember.includes('Finish building the team')) {
          generateHTML();
        }
      });
  }
  
