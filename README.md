# Team-Profile-Generator


Project and development of a node.js application that will allow users to quickly create a team html page through the prompt.


## About Me 
Born and raised in Italy, I moved to the UK in 2015. I have always been interested in new technologies and IT, as I studied IT in my A levels back in Italy. After 5 years working in content management for a website, I decided to make the step of learning Front-End Development thanks to the edX course, and on my gitHub profile I showcase not only my progress in Front-End Development as a student but also a journey that hopefully will lead to new exciting projects in this field.

## Usage

To use this app, simply follow the instructions in the Installation paragraph below, then lounch the prompt, go in the project directory where the index.js file is, and write the command:

```bash
node index.js
```
Once the program has been lounched just follow the instructions and input the data you want to complete your Team. Here is an example of the prompt to generate an html file for your team:

![Gif animation of how to use the ReadMe File Generator app](/Images/TEAMhtml-Prompt.JPG)

## Installation
First, make sure that Git and Git Bash are installed on your system. To download this project on your machine click [HERE](https://github.com/Nikola84ca/Team-Profile-Generator) to go to the repository on GitHub. Click on the green CODE button, and copy the link of the repository. In your machine, open gitBash and create a new folder where you will clone the project using the command below:

```bash
Git mkdir your-project-folder
```
navigate inside the new folder, and clone the project files with the following comands

```bash
cd your-project-folder
Git clone url-copied-on-repository
git pull
```

Open your editor with the command

```bash
code .
```

alternatively download the zip file in GitHub after pressing the Code button, unzip it and copy it in your project folder. Navigate to the folder using the cd command on gitbash and lounch your editor as shown above with the "code . " command.

## App Description 

The Team file generator app will run in the prompt of commands allowing users to quickly generate and complete their Team page simply launching the index.js file and following the shown instruction, writing the names and information for each team member etc information that will be then ordered and written into the generated team.html file. 

## My Process

* The first thing that was required was to implement the class Employee, which is the main class that will then be inherited by the specific employees (Manager, Intern, Engineer).

```JavaScript
class Employee {
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }
  
    getName() {
      return this.name;
    }
  
    getId() {
      return this.id;
    }
  
    getEmail() {
      return this.email;
    }
  
    getRole() {
      return 'Employee';
    }
  }
  
  module.exports = Employee;

```

* I then created a class for each specific emloyee, making sure they inherit the main constructors from Employee. Here is an example, this is the class Engineer, that inherits Employee class, as you can see, each specific employee has some extra info, in this case we have the GitHib profile:

```JavaScript
const Employee = require('./Employee');

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return 'Engineer';
  }
}

module.exports = Engineer;
```

* After I created all the classes, I started implementing the index.js file, the main file that will run the application. The first thing I implemented is making sure the object team is declared

```JavaScript
const team = [];
```

* Then I started with the first function that prompts the user the questions to input the data for the Team Manager. This funcn will gather the information about the team manager, and I decided to implement the validation inside the inquirer to optimise the function, it will then pass the answers to the consta manager, which is a "new" manager element that will be pushed into the team object. Here is the code: 

```JavaScript
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
```

* I first struggled a bit with the validation process, I researched online and found very useful articles on the [DEV](https://dev.to/bolouie/how-do-you-check-for-valid-email-input-3b3j) and [stack overflow](https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript?page=2&tab=scoredesc) websites. These expressions make sure that the user inputs are more or less similar to the expression indicated in the const isValid. Here is an example of the email validation expression:

```JavaScript
validate: (input) => {
              const isValid = /\S+@\S+\.\S+/.test(input);
              return isValid || 'Please enter a valid email address.';
              }
```

* At the end of each function to prompt the team mebers I need to ask if the user wants to insert  nea member of stop and create the html file. So I created the promptUser function. This function asks user for team members, I used a checkbox so that the user can select the correct option. Here is the code:

```JavaScript
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
```

* Similarly to promptManager function, I created the promptIntern and promptEngineer functions. Then, once I gathered all the data into the team object I needed to create the html file. First I needed a function to write the file:

```JavaScript
  function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
}
```

* I used the writeToFile function to create the team.html file passing to the constant htmlContent the object team containing all the user inputs.

```JavaScript
function generateHTML() {
    const htmlContent = render(team);
    
    writeToFile('team.html', htmlContent);
      
    console.log('team.html successfully generated!');

  }
```

* Finally I start the application by prompting for the team manager's information

```JavaScript
promptManager();
```



## Credits

I would like to thank all the teachers and TA of the EdX bootcamp for all the content provided and study materials. I found the information needed to implement the checkbox in the [www.npmjs.com](https://www.npmjs.com/package/inquirer) website. I also found fundamental information about the validation expressions, I researched online and found these useful articles on the [DEV](https://dev.to/bolouie/how-do-you-check-for-valid-email-input-3b3j) and [stack overflow](https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript?page=2&tab=scoredesc) websites. I then adapted them to my project to make sure the inputs from the users were correct.

## Project Status and Upcoming Improvements

The app is functional and easy to launch and use, the user can easily create the Team.html file and add all the descriptions and data needed for each team member needed. The next step will be to improve the web page created with a more user friendly html/css structure.

## Collaborations and Contributions

I welcome all the brilliant coders out there to join me in this project. Join effort can result in a fundamental learning experience for a beginner coder like me, so feel free to reach out with tips and advice. If you want to contribute to this project, pull requests are welcome, but if you want to make major changes, please open an issue first so that we can discuss what you would like to change. You can contact me on my GitHub profile [HERE](https://github.com/Nikola84ca) and visit this project repository by clicking [HERE](https://github.com/Nikola84ca/Team-Profile-Generator).

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)