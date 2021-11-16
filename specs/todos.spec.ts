import { TodosPage } from "../page-objects/todos.page";
import { browser } from "protractor";
import * as todo from "../test-data/todo.json";
import { DEFAULT_TIMEOUT } from "../shared/config";
import { click, getLocalStorage, sleep, waitForAjax } from "../shared/utils";
import { protractor } from "protractor/built/ptor";
import { fail } from "assert";



describe('TodoMVC Test', () => {
    let page: TodosPage;
    page = new TodosPage();

    const EC = protractor.ExpectedConditions;
    
    describe('Go to Todo website', () => {

        beforeAll( async () => {
            page.beforeAll();
        });

        //Check for fresh state of the website
        it('Should have no items previously added', async () => {
            expect(await page.todoList().isDisplayed()).not.toBe(true);
        });

        //TODO: Need to find a way on how to test for element active
        xit('Should focus on the todo input textbox', async () => {
            // expect((await page.newTodoTextbox()).getWebElement()).toEqual(browser.driver.switchTo().activeElement())
            // expect(page.newTodoTextbox()).tobeActive();
        });

        it('Should have zero number of todos in local storage', async () => {
            await waitForAjax();
            expect(await getLocalStorage()).toBe(0);
        });

        it('Should not display main and footer', async () => {
            expect(await page.mainSection().isDisplayed()).not.toBe(true);
            expect(await page.footerSection().isDisplayed()).not.toBe(true);
        });

        it('Should have correct placeholder', async () => {
            expect(await page.newTodoTextbox().getAttribute("placeholder"))
                            .toBe("What needs to be done?");
        });
        
    });


    describe('Add new todo', () => {

        beforeAll( async () => {
            page.beforeAll();
        });

        afterAll( async () => {
            //Perform cleanup. Clear any added items in the list.
            browser.wait(page.performItemsCleanUp(), DEFAULT_TIMEOUT);
        });

        //TODO: Data driven test, use for each loop to go through todo items
        todo.forEach( async (item, index) => {
            describe('Todo Item: ' + item, () => {
                let itemCount  = index + 1;

                beforeAll( async () => {
                    await page.addTodoListItem(item);
                });

                it('Should label contains ' + item + ' & appends to the bottom of the list', async () => {
                    expect(await page.itemsLbl(index).getText()).toBe(item);
                }); 
     
                it('Should the text input field be blank/cleared', async () => {
                    expect(await page.newTodoTextbox().getText()).toBe("");
                });
     
                it('Should add one items left', async () => {
                    browser.wait(EC.presenceOf(page.todoCountLbl()));
                    expect(await page.todoCountLbl().getText()).toBe(itemCount.toString());
                });
     
                it('Should display main and footer', async () => {
                    expect(await page.mainSection().isDisplayed()).toBe(true);
                    expect(await page.footerSection().isDisplayed()).toBe(true);
                });
     
                it('Should have correct number of todos in local storage', async () => {
                    await waitForAjax();
                    expect(await getLocalStorage()).toBe(itemCount);
                });

             });
        });


        it('Should trim the text input', async () => {
            //Arrange
            browser.wait(page.performItemsCleanUp(), DEFAULT_TIMEOUT);
            
            //Act
            const todoText = todo[0];
            await page.addTodoListItem(`    ${todoText}    `);

            //Assert
            expect(await page.itemsLbl(0).getText()).toBe(todoText); // Check first item
        });
        
    });


    describe('Mark all todo items as complete', () => {

        beforeAll(() => {
            page.beforeAll();
        });

        afterAll(() => {
            //Perform cleanup. Clear any added items in the list.
            browser.wait(page.performItemsCleanUp(), DEFAULT_TIMEOUT);
        });

        it('Should mark all items as complete', async () => {
            //Arrange: Add items
            for await (const item of todo) {
                await page.addTodoListItem(item);
            }

            //Act
            await click(page.toggleAll());


            /**
             * Assert for
             * All items is checked (class completed)
             * 0 items left (todo-count)
             * Clear completed is displayed
             */
            
            //Assert
            for( let i = 0; i < todo.length; i++){
                expect(await page.items(i).getAttribute('class')).toBe('completed');
            }

            browser.wait(EC.presenceOf(page.todoCountLbl()));
            expect(await page.todoCountLbl().getText()).toBe('0');
            expect(await page.clearCompletedBtn().isDisplayed()).toBe(true);

        });

        it('Should clear completed items in the list', async () => {
            //Act
            await click(page.clearCompletedBtn());

            await waitForAjax();

            //Assert

            //Fresh state
            /**
             * No todo items displayed
             */
             expect(await page.todoList().isDisplayed()).not.toBe(true);
        });

        it('Should not display main and footer', async () => {
            expect(await page.mainSection().isDisplayed()).not.toBe(true);
            expect(await page.footerSection().isDisplayed()).not.toBe(true);
        });

        it('Should toggle all is not displayed', async () => {
            expect(await page.toggleAll().isDisplayed()).not.toBe(true);
        });

        it('Should have zero number of todos in local storage', async () => {
            await waitForAjax();
            expect(await getLocalStorage()).toBe(0);
        });

        
    });


    describe('Unmark all todo items as complete', () => {
        
        beforeAll( async () => {
            page.beforeAll();
        });

        afterAll(() => {
            //Perform cleanup. Clear any added items in the list.
            browser.wait(page.performItemsCleanUp(), DEFAULT_TIMEOUT);
        });


        it('Should unmark all items as complete', async () => {
            //Arrange: Add items
            for await (const item of todo) {
                await page.addTodoListItem(item);
            }
            //Mark all as complete
            await click(page.toggleAll());


            //Act
            //Unmark all
            await click(page.toggleAll());
            
            /**
             * Assert for negative of the below
             * All items is checked (class completed)
             * 0 items left (todo-count) / correct # of items left is displayed
             * Clear completed is displayed
             */
            
            //Assert
            for( let i = 0; i < todo.length; i++){
                expect(await page.items(i).getAttribute('class')).not.toBe('completed');
            }

            browser.wait(EC.presenceOf(page.todoCountLbl()));
            expect(await page.todoCountLbl().getText()).not.toBe('0');
        });

        it('Should clear completed is not displayed', async () => {
            if(!EC.invisibilityOf(page.clearCompletedBtn())){
                fail("Clear completed button still visible.");
            }
        });

        it('Should have correct todo items left', async () => {
            browser.wait(EC.presenceOf(page.items(0)));
            browser.wait(EC.presenceOf(page.todoCountLbl()));
            expect((await page.itemsCount()).toString())
                    .toBe(await page.todoCountLbl().getText());
        });

        it('Should have correct number of todos in local storage', async() => {
            await waitForAjax();
            expect(await getLocalStorage()).toBe(todo.length);
        });


    });


    describe('Mark todo items as complete', () => {
        
        beforeAll( async () => {
            page.beforeAll();
        });

        afterAll(() => {
            //Perform cleanup. Clear any added items in the list.
            browser.wait(page.performItemsCleanUp(), DEFAULT_TIMEOUT);
        });

        it('Should mark an item 1 as complete', async () => {
            //Arrange: Add items
            for await (const item of todo) {
                await page.addTodoListItem(item);
            }

            //Act: Check item 1
            await click(page.markAsCompleteChkbox(0));
            await waitForAjax();

            //Assert
            /**
             * Item 1 should be checked
             * Item 2 should not be checked
             */

            expect(await page.items(0).getAttribute("class")).toBe("completed");
            expect(await page.items(1).getAttribute("class")).not.toBe("completed");
        });

        it('Should mark an item 2 as complete', async () => {
            //Act: Check item 2
            await click(page.markAsCompleteChkbox(1));
            await waitForAjax();

            //Assert
            /**
             * Item 1 should be checked
             * Item 2 should not be checked
             */

            expect(await page.items(0).getAttribute("class")).toBe("completed");
            expect(await page.items(1).getAttribute("class")).toBe("completed");
        });

        it('Should unmark an item as complete', async () => {
            //Act: Check item 1
            await click(page.markAsCompleteChkbox(0));
            await waitForAjax();

            //Assert
            /**
             * Item 1 should be checked
             * Item 2 should not be checked
             */

            expect(await page.items(0).getAttribute("class")).not.toBe("completed");
            expect(await page.items(1).getAttribute("class")).toBe("completed");
        });

        it('Should have correct number of todos in local storage', async () => {
            await waitForAjax();
            expect(await getLocalStorage()).toBe(todo.length);
        });


    });


    describe('Edit a todo item', () => {

        beforeAll( async () => {
            page.beforeAll();
        });

        afterAll(() => {
            //Perform cleanup. Clear any added items in the list.
            browser.wait(page.performItemsCleanUp(), DEFAULT_TIMEOUT);
        });

        let assertCount = 0;
        
        it('Should edit an item', async () => {
            //Arrange: Add items
            for await (const item of todo) {
                await page.addTodoListItem(item);
            }

            const editedText = "EDITED ITEM 1";
            //Act: Edit item 1
            await page.editTodoListItem(0, editedText);
            

            await click(page.newTodoTextbox()); //Blur
            await waitForAjax();

            //Assert
            expect(await page.itemsLbl(0).getText()).toBe(editedText);
        });

        it('Should complete and delete button not displayed when editing an item', async () => {
            
            //Act: Edit item 1
            await browser.actions()
                            .mouseMove(page.items(0))
                            .doubleClick()
                            .perform();
            /**
             * class toggle and destroy not displayed
             * class editing
             * class contain focus-visible
             */

             if(!EC.invisibilityOf(page.markAsCompleteChkbox(0))){
                fail("Mark as complete checkbox control still visible.");
            }

            if(!EC.invisibilityOf(page.deleteItemBtn(0))){
                fail("Mark as complete checkbox control still visible.");
            }

            //Teardown
            await click(page.newTodoTextbox()); //Blur
            await waitForAjax();
        });

        it('Should save edits on enter', async () => {
            const editedText = "EDITED ITEM 2";

            //Act: Edit item 2
            await page.editTodoListItem(1, editedText);

            await page.editTextbox(1).sendKeys(protractor.Key.ENTER);
            await waitForAjax();

            //Assert
            expect(await page.itemsLbl(1).getText()).toBe(editedText);
        });

        it('Should save edits on blur', async () => {
            const editedText = "EDITED ITEM 3";

            //Act: Edit item 3
            await page.editTodoListItem(2, editedText);

            await click(page.newTodoTextbox()); //Blur
            await waitForAjax();

            //Assert
            expect(await page.itemsLbl(2).getText()).toBe(editedText);
        });

        it('Should trim input text', async () => {
            const editedText = "      EDITED ITEM 1 WITH TRAILING SPACES     ";

            //Act: Edit item 1
            await page.editTodoListItem(0, editedText);

            await click(page.newTodoTextbox()); //Blur
            await waitForAjax();

            //Assert
            expect(await page.itemsLbl(0).getText()).toBe("EDITED ITEM 1 WITH TRAILING SPACES");
        });

        it('Should remove the item if input text is empty', async () => {
            //Get current count
            let count = await page.itemsCount();
            const editedText = "";

            //Act: Edit item 1
            await page.editTodoListItem(0, editedText);
            

            await click(page.newTodoTextbox()); //Blur
            await waitForAjax();

            //Assert
            assertCount = count - 1;
            browser.wait(EC.presenceOf(page.todoCountLbl()));
            expect(await page.todoCountLbl().getText()).toBe(assertCount.toString());
            expect(await getLocalStorage()).toBe(assertCount);
        });

        it('Should cancel edit on escape', async () => {

            const editedText = "TEST EDIT FOO";

            //Act: Edit item 1
            await page.editTodoListItem(0, editedText);

            await page.editTextbox(0).sendKeys(protractor.Key.ESCAPE);
            await waitForAjax();

            //Assert
            expect(await page.itemsLbl(0).getText()).not.toBe(editedText);
            expect(await getLocalStorage()).toBe(assertCount);
        });

    });

    describe('Todo list filtering', () => {

        beforeAll( async () => {
            page.beforeAll();
        });

        afterAll(() => {
            //Perform cleanup. Clear any added items in the list.
            browser.wait(page.performItemsCleanUp(), DEFAULT_TIMEOUT);
        });

        it('Should All filter be the default', async () => {
            //Arrange: Add items
            for await (const item of todo) {
                await page.addTodoListItem(item);
            }

            //Assert
            expect(await page.allFilterLink().getAttribute('class')).toBe('selected');
        });


        const itemToComplete = 0; //index of the item to be completed
        let assertCount = todo.length;

        it('Should display Active items', async () => {
            //Act: Click active filter
            await click(page.activeFilterLink());

            //Assert
            browser.wait(EC.presenceOf(page.todoCountLbl()));
            expect(await page.todoCountLbl().getText()).toBe(assertCount.toString());
            expect(await page.activeFilterLink().getAttribute('class')).toBe('selected');

            //Act: Complete at least 1 item
            await click(page.markAsCompleteChkbox(itemToComplete)); //Complete row 1
    
            //Assert
            assertCount = assertCount - 1;
            browser.wait(EC.presenceOf(page.todoCountLbl()));
            expect(await page.todoCountLbl().getText()).toBe(assertCount.toString());
            expect(await page.itemsLbl(itemToComplete).getText()).not.toBe(todo[itemToComplete]); //Verify if the item is removed
            expect(await page.itemsActiveCount()).toBe(2);
        });

        it('Should display Completed items', async () => {
            //Act
            await click(page.completedFilterLink());

            //Assert
            browser.wait(EC.presenceOf(page.todoCountLbl()));
            expect(await page.completedFilterLink().getAttribute('class')).toBe('selected');
            expect(await page.todoCountLbl().getText()).toBe(assertCount.toString());
            expect(await page.itemsLbl(itemToComplete).getText()).toBe(todo[itemToComplete]);
            expect(await page.itemsCompleteCount()).toBe(1);
        });

        it('Should display All items', async () => {
            
            //Act
            await click(page.allFilterLink());
            await waitForAjax();

            //Assert
            expect(await page.allFilterLink().getAttribute('class')).toBe('selected');
            expect(await page.itemsCount()).toBe(todo.length);
        });

        it('Should display previous filter on browser back', async () => {
            //Act
            browser.navigate().back();

            //Assert
            expect(await page.completedFilterLink().getAttribute('class')).toBe('selected');
        });


        it('Should display correct filter on browser reload - Data Persistence', async () => {
            //Act
            browser.waitForAngularEnabled(false);
            browser.refresh();
            
            browser.wait(
                EC.titleIs("Todo-Backend client"),
                DEFAULT_TIMEOUT
            );
    
            //Wait for ajax call to finish
            await waitForAjax();

            browser.wait(EC.elementToBeClickable(page.completedFilterLink()));

            //Assert
            expect(await page.itemsCount()).toBe(todo.length);
            expect(await page.itemsCompleteCount()).toBe(1);
            expect(await page.completedFilterLink().getAttribute('class')).toBe('selected');
        });

        it('Should display correct filter on browser forward', async () => {
            //Act
            browser.navigate().forward();

            //Assert
            expect(await page.allFilterLink().getAttribute('class')).toBe('selected');
        });
    });
})