import { TodosPage } from "../page-objects/todos.page";
import { browser } from "protractor";
import { BrowserStack } from "protractor/built/driverProviders";


describe('TodoMVC Test', () => {
    let page: TodosPage;
    
    fdescribe('Go to Todo website', () => {

        beforeAll(() => {
            page = new TodosPage();
            browser.waitForAngularEnabled(false); //For non angular apps
            page.navigateToTodosPage();

            //TODO: Need to add wait for ajax/jquery calls to finish before continuing with the tests
        });
        
        //Check for fresh state of the website
        it('Should have no items previously added', async () => {
            // browser.executeScript("return window.sessionStorage.clear();");
            expect(await page.todoList().isDisplayed()).not.toBe(true);
        });


        //TODO: Need to find a way on how to test for element active
        xit('Should focus on the todo input textbox', async () => {
            // expect((await page.newTodoTextbox()).getWebElement()).toEqual(browser.driver.switchTo().activeElement())
            // expect(page.newTodoTextbox()).tobeActive();
        });

        it('Should have zero number of todos in local storage', async () => {
            
            /**
             * TODO: Get API request to fetch object value instead of session storage
             * e.g.
             * [{"title":"ITEM1","completed":false,"url":"https://todo-backend-django.herokuapp.com/1098",
             * "order":1},
             * {"title":"ITEM2","completed":false,"url":"https://todo-backend-django.herokuapp.com/1099","order":2},
             * {"title":"item3","completed":false,"url":"https://todo-backend-django.herokuapp.com/1100","order":3}]
             * https://todo-backend-django.herokuapp.com/#/
             */
            // const value = await browser.executeScript("return window.localStorage;");
            // console.log(value);

            // const test = await browser.executeScript("return window.location.search.substr(1);");
            // console.log(test);

        });

        it('Should have correct placeholder', async () => {
            expect(await page.newTodoTextbox().getAttribute("placeholder"))
                            .toBe("What needs to be done?");
        });

        it('Should not display main and footer', async () => {
            expect(await page.mainSection().isDisplayed()).not.toBe(true);
            expect(await page.footerSection().isDisplayed()).not.toBe(true);
        });
        
    });


    describe('Add new todo', () => {
    
        beforeAll(() => {
            //Make sure no items stored in local storage.
            //Clear any previous added items if there are any
        });

        afterAll(() => {
            //Perform cleanup. Clear any added items in the list.
        });

        //TODO: Data driven test, use for each loop to go through todo items
        describe('Label #' + 'Item # here', () => {
           it('Should label contains', () => {
               
           }); 

           it('Should append one item to the botoom of the list', () => {
               
           });

           it('Should have added one todo in local storage', () => {
               
           });

           it('Should the text input field be blank/cleared', () => {
               
           });

           it('Should trim the text input', () => {
               
           });

           it('Should add Todo count', () => {
               
           });

           it('Should dipslay main and footer', () => {
               
           });

           it('Should have correct number of todos in local storage', () => {
               
           });
        });
    });


    describe('Mark all todo items as complete', () => {

        //TODO: Can be created as a function
        beforeAll(() => {
            //Make sure no items stored in local storage.
            //Clear any previous added items if there are any
        });

        //TODO: Can be created as a function
        afterAll(() => {
            //Perform cleanup. Clear any added items in the list.
        });

        it('Should mark all items as complete', () => {
            //Arrange: Add items

            /**
             * Assert for
             * All items have Strike through text (class destroy)
             * All items is checked (class completed)
             * 0 items left (todo-count)
             * Clear completed is displayed
             */
        });

        it('Should clear completed items in the list', () => {
            
            //Fresh state
            /**
             * No todo items displayed
             */
        });

        it('Should main and footer is not displayed', () => {
            
        });

        it('Should toggle all is not displayed', () => {
            
        });

        it('Should have zero number of todos in local storage', () => {
            
        });

        
    });


    describe('Unmark all todo items as complete', () => {
        
        beforeAll(() => {
            //Make sure no items stored in local storage.
            //Clear any previous added items if there are any
        });

        afterAll(() => {
            //Perform cleanup. Clear any added items in the list.
        });


        it('Should unmark all items as complete', () => {
            
            /**
             * Assert for negative of the below
             * All items have Strike through text (class destroy)
             * All items is checked (class completed)
             * 0 items left (todo-count) / correct # of items left is displayed
             * Clear completed is displayed
             */
        });

        it('Should clear completed is not displayed', () => {
            
        });

        it('Should toggle all is not checked', () => {
            
        });

        it('Should have correct number of todos in local storage', () => {
            
        });


    });


    describe('Mark todo items as complete', () => {
        
        beforeAll(() => {
            //Make sure no items stored in local storage.
            //Clear any previous added items if there are any
        });
    
        afterAll(() => {
            //Perform cleanup. Clear any added items in the list.
        });

        it('Should mark an item 1 as complete', () => {
            //TODO: Add a function for create todo
            //Arrange: Add items

            //Act: Check item 1

            //Assert
            /**
             * Item 1 should be checked
             * Item 2 should not be checked
             */
        });

        it('Should mark an item 2 as complete', () => {
        
        });

        it('Should unmark an item as complete', () => {
            
        });


        //TODO: Create a function for checking local storage
        it('Should have correct number of todos in local storage', () => {
            
        });


    });


    describe('Edit a todo item', () => {
        
        it('Should edit an item', () => {
            
        });

        it('Should toggle complete and delete button not displayed', () => {
            
            /**
             * class toggle and destroy not displayed
             * class editing
             * class contain focus-visible
             */
        });

        it('Should save edits on enter', () => {
            
        });

        it('Should save edits on blur', () => {
            
            /**
             * Click on other button or element
             * If possible send blur event
             */
        });

        it('Should trim input text', () => {
            
        });

        it('Should remove the item if input text is empty', () => {
        
            //getNumber of Todos in Local Storage
        });

        it('Should cancel edit on escape', () => {
            
        });

    });


    describe('Todo item count', () => {
        
        beforeAll(() => {
            //Make sure no items stored in local storage.
            //Clear any previous added items if there are any
        });

        afterAll(() => {
            //Perform cleanup. Clear any added items in the list.
        });

        //TODO: To remove, already covered in add new todo and mark as complete scenarios
        it('Should display correct number of todo items', () => {
            
        });

    });

    describe('Todo list filtering', () => {

        beforeAll(() => {
            //Make sure no items stored in local storage.
            //Clear any previous added items if there are any
        });

        afterAll(() => {
            //Perform cleanup. Clear any added items in the list.
        });


        it('Should display Active items', () => {
            //Arrange: Add items
            //Complete at least 1 item
            
            //Highlight current filter
        });

        it('Should display Completed items', () => {
            //Highlight current filter
        });

        it('Should display All items', () => {
            //Highlight current filter
        });

        it('Should display previous filter on browser back', () => {
            
        });

        it('Should display correct filter on browser reload', () => {
            
        });

        it('Should display correct filter on browser forward', () => {
            
        });
    });

    //TODO: Data Persistence


    
})