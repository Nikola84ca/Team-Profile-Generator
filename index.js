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

// This function will gather the information about the team manager, I decided to implement the validation inside the inquirer to optimise the function

function promptManager() {
    inquirer
      .prompt([
       
        {
            type: 'input',
            name: 'name',
            message: 'Enter the manager\'s name:',
            validate: (input) => {
                const isValid = /^[a-zA-Z\s]+$/.test(input.trim());
                return isValid || 'Please enter a valid name containing only letters.';
              }},
          {
            type: 'input',
            name: 'id',
            message: 'Enter the manager\'s employee ID:',
            validate: (input) => {
              const isValid = /^\d+$/.test(input);
              return isValid || 'Please enter a valid numeric employee ID.';
            },
          },
          {
            type: 'input',
            name: 'email',
            message: 'Enter the manager\'s email:',
            validate: (input) => {
              const isValid = /\S+@\S+\.\S+/.test(input);
              return isValid || 'Please enter a valid email address.';
            },
          },
          {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter the manager\'s office number:',
            validate: (input) => {
              const isValid = /^\d+$/.test(input);
              return isValid || 'Please enter a valid numeric office number.';
            },
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


  // Function to prompt user for team members, I used a checkbox so that the user can select the correct option
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
  
  // Function to prompt user for engineer details, in this case as well I decided to implement the validation inside the inquirer to optimise the function
  function promptEngineer() {
    inquirer
      .prompt([
                
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the engineer:',
            validate: (input) => {
                const isValid = /^[a-zA-Z\s]+$/.test(input.trim());
                return isValid || 'Please enter a valid name containing only letters.';
              }
          },
          {
            type: 'input',
            name: 'id',
            message: 'Enter the ID of the engineer:',
            validate: (input) => {
              const isValid = /^\d+$/.test(input.trim());
              return isValid || 'Please enter a valid ID (numeric characters only).';
            },
          },
          {
            type: 'input',
            name: 'email',
            message: 'Enter the email address of the engineer:',
            validate: (input) => {
              const isValid = /\S+@\S+\.\S+/.test(input.trim());
              return isValid || 'Please enter a valid email address.';
            },
          },
          {
            type: 'input',
            name: 'github',
            message: 'Enter the GitHub profile of the engineer:',
            validate: (input) => {
              if (/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(input.trim())) {
                return true;
              }
              return 'Please enter a valid GitHub username.';
            },
          },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.name,
          answers.id,
          answers.email,
          answers.github
        );
        team.push(engineer);
        promptUser(); // Here I call the promptUser to continue adding team members
      });
  }
  
  // Function to prompt user for intern details, here too I decided to implement the validation inside the inquirer to optimise the function
  function promptIntern() {
    inquirer
      .prompt([
           
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the intern:',
            validate: (input) => {
                const isValid = /^[a-zA-Z\s]+$/.test(input.trim());
                return isValid || 'Please enter a valid name containing only letters.';
              }
          },
          {
            type: 'input',
            name: 'id',
            message: 'Enter the ID of the intern:',
            validate: (input) => {
              const isValid = /^\d+$/.test(input.trim());
              return isValid || 'Please enter a valid ID (numeric characters only).';
            },
          },
          {
            type: 'input',
            name: 'email',
            message: 'Enter the email address of the intern:',
            validate: (input) => {
              const isValid = /\S+@\S+\.\S+/.test(input.trim());
              return isValid || 'Please enter a valid email address.';
            },
          },
          {
            type: 'input',
            name: 'school',
            message: 'Enter the school of the intern:',
            validate: (input) => {
              if (input.trim() !== '') {
                return true;
              }
              return 'Please enter a valid school name.';
            },
          },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school
        );
        team.push(intern);
        promptUser(); // Here I call the promptUser to continue adding team members
      });
  }

  function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
}

  
  // Function to generate HTML and write it to a file
function generateHTML() {
    const htmlContent = render(team);
    
    writeToFile('team.html', htmlContent);
      
    console.log('team.html successfully generated!');

  }
  
  // Finally I start the application by prompting for the team manager's information
  promptManager();