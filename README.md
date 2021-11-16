
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
    <li><a href="#tools-used-and-why">Tools Used and Why</a></li>
    <li><a href="#scenarios-and-test-cases">Scenarios and Test Cases</a></li>
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

1. To run the created Automated test. Run npm
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
  You should see a HTML Test Report, *TodoMVCAutomationReport.html*. Open and see the summary result.<br/><br/>
  
  ![sample report](https://user-images.githubusercontent.com/6094567/141874826-1781dc44-e06a-44f4-a344-d8ce6a0bf6aa.png)
  
  You can view the screenshot for each of the test cases available. *(e.g.Should label contains Todo Test #3 & appends to the bottom of the list)* provides you a screenshot.<br/>

  ![image](https://user-images.githubusercontent.com/6094567/141874992-9e3cb138-485a-494e-afdf-96920820b3ba.png)
  
  ![image](https://user-images.githubusercontent.com/6094567/141875024-e65b6a9a-14c6-42a4-8fbb-9123d615e054.png)
 
  Sample generated report for reference: [reports.zip](https://github.com/veydecapia/todomvc-exercise/files/7542445/reports.zip)


### Running using Browserstack
The project is also designed to run using browserstack testing service. This means that the project can also run against mobile browsers and can do cross browser testing for different operating system and devices.

Steps on Running using Browserstack
1. Create a *'.env'* file on the root folder.
2. Add the following details in the file. Copy your username and access key. 
   *Click [here](https://www.browserstack.com/docs/automate/selenium/reset-access-key) for reference on accessing your browserstack keys.*
   ```sh
   BROWSERSTACK_USERNAME=
   BROWSERSTACK_ACCESS_KEY=
   ```
   
3. Run npm run parallel
   ```sh
   npm run parallel
   ```
   
4. You should see the following in console. Which means that the automated test is currently running
![image](https://user-images.githubusercontent.com/6094567/141878269-cac13892-1508-416b-9fa5-4a9f0c7b0cf2.png)

5. Go to your browserstack sessions/builds. You should see your test is now running. 

   ![browserstack run](https://user-images.githubusercontent.com/6094567/141878454-e4a1c6e3-9b01-40de-82c4-db3c43032579.png)

6. After the test is completed. You should see a link to your test results build.
   ```sh
   [Chrome #21] [09:21:00] I/browserstack - BrowserStack results available at https://automate.browserstack.com/builds/0cb4ebd211d90e5857091d4d1234b3c542cb6943/sessions/aa46732d72f406363bff9e2f1454dc713b7f7b93
   ```
   
      ```sh
      [09:21:02] I/testLogger -
      [09:21:02] I/launcher - 0 instance(s) of WebDriver still running
      [09:21:02] I/launcher - Chrome #11 passed
      [09:21:02] I/launcher - Chrome #01 passed
      [09:21:02] I/launcher - Android #31 passed
      [09:21:02] I/launcher - iPhone #41 passed
      [09:21:02] I/launcher - Chrome #21 passed
   ```
   

### Updating Capabilities
1. Go to parallel.conf.js under conf folder
2. Update multiCapabilities object. Currently it is set to run the following browser, os, devices combinations.

![image](https://user-images.githubusercontent.com/6094567/141879438-be38279f-e689-4b40-a861-7630b5fcf975.png)

3. Click [here](https://www.browserstack.com/automate/capabilities) for reference on setting capabilities and choose NodeJS.

Here are my sample browserstack run.
| Browser/Device     | OS           | Browserstack link                                                                                                                                                                                               |
|--------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Firefox 94.0       | Windows 10   | https://automate.browserstack.com/builds/0cb4ebd211d90e5857091d4d1234b3c542cb6943/sessions/170f094a3658ce3ca1244234afd7b16e9fa7693e?auth_token=77a0650ebe71a05f50fcefbc055fd7de21984e52a1ab5a876475fe981224f0c4 |
| Chrome 95.0        | Windows 10   | https://automate.browserstack.com/builds/0cb4ebd211d90e5857091d4d1234b3c542cb6943/sessions/ddeefe04d3c765f208b51114cde7dd049e1ac1d3?auth_token=4119363f0bae818b6f67e97b51641d01c2999f0d407124733110c0b412da9ce2 |
| Safari 14.1        | OS X Big Sur | https://automate.browserstack.com/builds/0cb4ebd211d90e5857091d4d1234b3c542cb6943/sessions/aa46732d72f406363bff9e2f1454dc713b7f7b93?auth_token=69155e60a744af9c6fd2127ea77085820fe972c6d741f5dc0387481c83e1197f |
| Samsung Galaxy S20 | Android 10.0 | https://automate.browserstack.com/builds/0cb4ebd211d90e5857091d4d1234b3c542cb6943/sessions/7f19d13b969760335ff2ca31be603330b0fad25f?auth_token=081eb36e420ad54b3219d4cfd4f7697b790761d39d6fdede09fa836c1d62e32e |
| iPhone 12 Pro Max  | iOS 14.2     | https://automate.browserstack.com/builds/0cb4ebd211d90e5857091d4d1234b3c542cb6943/sessions/0316d466cfbe384d4031367bc03ee954721b4d7e?auth_token=9bccb2c0b8568cb5995cf120845590eb57aab95d2e14d483a69b58d9607ce5aa |




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


## Scenarios and Test Cases

### Covers the following Scenarios
This will run the automated test for TodoMVC website that covers the following test scenarios:

- Go to the TodoMVC website
- Add a new Todo
- Mark all Todo items as complete
- Unmark all Todo items as complete
- Mark Todo items as complete
- Edit a Todo item
- Todo list filtering and data persistence


### Contains the following Test Cases


1. Go to Todo website
    - Should have no items previously added
    - Should have zero number of todos in local storage
    - Should not display main and footer
    - Should have correct placeholder

2. Add new todo > Todo Item: Todo Test #1 *The test cases below applies to each of the test data present in json file*
    - Should label contains Todo Test #1 & appends to the bottom of the list
    - Should the text input field be blank/cleared
    - Should add one items left
    - Should display main and footer
    - Should have correct number of todos in local storage

3. Add new todo > Should trim the text input
4. Mark all todo items as complete
    - Should mark all items as complete
    - Should clear completed items in the list
    - Should not display main and footer
    - Should toggle all is not displayed
    - Should have zero number of todos in local storage
5. Unmark all todo items as complete
    - Should unmark all items as complete
    - Should clear completed is not displayed
    - Should have correct todo items left
    - Should have correct number of todos in local storage
6. Mark todo items as complete
    - Should mark an item 1 as complete
    - Should mark an item 2 as complete
    - Should unmark an item as complete
    - Should have correct number of todos in local storage
7. Edit a todo item
    - Should edit an item
    - Should complete and delete button not displayed when editing an item
    - Should save edits on enter
    - Should save edits on blur
    - Should trim input text
    - Should remove the item if input text is empty
    - Should cancel edit on escape
8. Todo list filtering
    - Should All filter be the default
    - Should display Active items
    - Should display Completed items
    - Should display All items
    - Should display previous filter on browser back
    - Should display correct filter on browser reload - Data Persistence
    - Should display correct filter on browser forward

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Your Name - harveydecapia@gmail.com

Project Link: [https://github.com/veydecapia/todomvc-exercise.git](https://github.com/veydecapia/todomvc-exercise.git)

<p align="right">(<a href="#top">back to top</a>)</p>
