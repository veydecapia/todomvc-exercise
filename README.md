
<div id="top"></div>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#tools">Tools Used and Why</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Project contains Automated Test written in TypeScript/JavaScript using [Protractor](https://www.protractortest.org/#/infrastructure) as an open source automation testing framework. Also, comes with [Jasmine](https://jasmine.github.io/) that follows BDD framework, and Jasmine spec reporter, protractor beautiful reporter for real time generation of reports and html reports.

My task is to automate testing of [TodoMVC site](https://www.todobackend.com/client/index.html?https://todo-backend-django.herokuapp.com/), covering all the use cases.
The automated test covers the following test scenarios
* Go to the TodoMVC website
* Add a new Todo
* Mark all Todo items as complete
* Unmark all Todo items as complete
* Mark Todo items as complete
* Edit a Todo item
* Todo list filtering and data persistence

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Protractor](https://www.protractortest.org/#/infrastructure)
* [TypeScript](https://www.typescriptlang.org/)
* [Jasmine](https://jasmine.github.io/)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get automated test in your local copy up and running follow these simple example steps.


### Prerequisites
To publish and install packages to and from the public npm registry or a private npm registry, you must install Node.js and the npm command line interface using either a Node version manager or a Node installer.

Note: to download the latest version of npm, on the command line, run the following command:
   ```sh
   npm install -g npm
   ```
*Please refer to the following*
* [Download Node.js](https://nodejs.org/en/download/)
* [Downloading and installing node js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/veydecapia/todomvc-exercise.git
   ```
2. Install NPM packages. This downloads dependencies defined in a package.json file and generates a node_modules folder with the installed modules.
   ```sh
   npm run setup
   ```
   
   This is equivalent to the following command:
   ```sh
   npm install && node ./node_modules/protractor/bin/webdriver-manager update
   ```
   
   It would install first the required npm packages and then it will update the webdriver. This is written in package.json file under *scripts.*
   <br/>*Note: The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries.*

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. To run the created Automated test.
Run npm
   ```sh
   npm test
   ```
<br/><br/>
This will run the automated test that covers the following test scenarios: <br/>
* Go to the TodoMVC website
* Add a new Todo
* Mark all Todo items as complete
* Unmark all Todo items as complete
* Mark Todo items as complete
* Edit a Todo item
* Todo list filtering and data persistence

<br/>

2. While the test is running, the Jasmine Spec reporter will send updates of the test pass fail status on the command line in real time.<br/> 

![jasmine spec sample run](https://user-images.githubusercontent.com/6094567/141874714-5d1608fd-76fb-496b-8e8a-a4639e4b3dfd.png)<br/><br/>


3. After the browser is closed, you can look for the text **0 instance(s) of WebDriver still running**, and you know that the run is already completed.
```
[08:37:05] I/launcher - 0 instance(s) of WebDriver still running
[08:37:05] I/launcher - chrome #01 passed
```
<br/><br/>
4. After the test, go to **reports\testResults** folder.<br/>
  You should see a HTML Test Report, *SalesChampAutomationReport.html*. Open and see the summary result.<br/><br/>
  
  ![sample report](https://user-images.githubusercontent.com/6094567/141874826-1781dc44-e06a-44f4-a344-d8ce6a0bf6aa.png)
  
  You can view the screenshot for each of the test cases available. *(e.g.Should label contains Todo Test #3 & appends to the bottom of the list)* provides you a screenshot.<br/>

  ![image](https://user-images.githubusercontent.com/6094567/141874992-9e3cb138-485a-494e-afdf-96920820b3ba.png)
  
  ![image](https://user-images.githubusercontent.com/6094567/141875024-e65b6a9a-14c6-42a4-8fbb-9123d615e054.png)
 
  Sample generated report for reference: [reports.zip](https://github.com/veydecapia/todomvc-exercise/files/7542445/reports.zip)



<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Tools Used and Why

- **[Protractor]** - Test Framework/Test Runner
   - [x] It is built and runs on top of WebDriverJS, which also uses WebDriver API same as Selenium *giving all the advantages of Selenium.*
   - [x] Protractor is an open source automation testing framework that is writen using NodeJS. It also focuses on cross-browser automation; its value proposition is a single standard API that works across all major browsers.
   - [x] Protractor can automate the different browsers like chrome, firefox, IE, Edge, opera. A puppeteer can automate the chromium engine only, as of today Chrome and Microsoft Edge browsers are using the Chromium engine. 
   - [x] Unlike other test runners like Puppeteer, focuses and only works on a Chromium engine.
   - [x] *Protractor allows for automated parallel Cross Browser Testing*, so it saves time and resources. Hence, ensures Cross Browser compatibility.
   - [x] *Supports asynchronous Test Execution, uses callbacks, Promises, and Async/Await to improve performance and make the test run faster.*
   - [x] It supports **Jasmine** and Mocha as BDD test frameworks out of the box.
   - [x] *Working with packages is easier* in Protractor.
   - [x] Supports various cloud testing platforms like SauceLabs, and CrossBrowserTesting, etc.
   - [x] It can run in both a Real browser and headless browsers.


- **[Jasmine]** - Test Framework
   - [x] Follows BDD (Behavior-driven development).
   - [x] *All the syntax used in Jasmine framework is clean and obvious.*
   - [x] Have an easy to read syntax.
   - [x] Easy to implement.
   - [x] Capable of testing any kind of JavaScript application.
   - [x] Jasmine does not depend on any other JavaScript framework.
   - [x] Jasmine does not require any DOM.


- **[Visual Studio Code/ VSCode]** - IDE/Text Editor
   - [x] Visual Studio Code has a large catalog different extensions to extend its own capabilities.
   - [x] Visual Studio Code Supports debugging for Typescript/Javascript based applications.
   - [x] Visual Studio Code (VSCode) is the most popular development environment.


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Your Name - harveydecapia@gmail.com

Project Link: [https://github.com/veydecapia/todomvc-exercise.git](https://github.com/veydecapia/todomvc-exercise.git)

<p align="right">(<a href="#top">back to top</a>)</p>
