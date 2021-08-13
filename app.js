const inquirer = require('inquirer');

// console.log(inquirer);

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if(nameInput)
                    return true;
                else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};

const promptProject = () => {
    if(!portfolioDta.projects) {
        portfolioData.projects = [];
    }
    console.log(`
=================
Add a New Project
=================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript','HTML','CSS','ES6','jQuery','Bootstrap','Node']
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            defalt: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter anotehr project?',
            default: false
        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser().then(answers => console.log(answers))
            .then(promptProject)
            .then(projectAnswers => console.log(projectAnswers));
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// fs.writeFile('index.html', generatePage(name, github), err => {
//     if(err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!')
// });