const inquirer = require('inquirer');
const {writeFile, copyFile} = require('./utils/generate-site.js');
const generatePage = require('./src/page-template.js');

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
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => confirmAbout
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
=================
Add a New Project
=================
    `);
    if(!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if(!descriptionInput)
                    console.log('You need to enter a project description!');
                
                return descriptionInput ? true : false;
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript','HTML','CSS','ES6','jQuery','Bootstrap','Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if(!linkInput) 
                    console.log('You need to enter a project GitHub link')
                
                return linkInput ? true : false;
            }
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
            message: 'Would you like to enter another project?',
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

promptUser().then(promptProject)
            .then(portfolioData => {
                return generatePage(portfolioData);
            }).then(pageHTML => {
                return writeFile(pageHTML);
            }).then(writeFileResponse => {
                console.log(writeFileResponse);
                return copyFile();
            }).then(copyFileResponse => {
                console.log(copyFileResponse);
            }).catch(err => {console.log(err)});

