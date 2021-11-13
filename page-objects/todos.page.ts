import { browser, element, by } from "protractor";
import { protractor } from "protractor/built/ptor";
import { click, hover, sleep } from "../shared/utils";
import { DEFAULT_TIMEOUT } from "../shared/config";
import * as env from "../shared/constants/environment-properties.json";
import * as webdriver from 'selenium-webdriver';


export class TodosPage {

    //Locators

    newTodoTextbox(){
        return element(by.id("new-todo"));
    }

    todoList(){
        return element(by.id("todo-list"));
    }

    mainSection(){
        return element(by.id("main"));
    }

    footerSection(){
        return element(by.id("footer"));
    }

    deleteItemBtn(index: number){
        return element.all(by.css(".destroy")).get(index);
    }

    todoCountLbl(){
        return element(by.id("todo-count")).element(by.css("strong"));
    }

    toggleAll(){
        return element(by.id("toggle-all"));
    }

    items(index: number){
        return this.todoList().all(by.css("li")).get(index);
    }

    itemsLbl(index: number){
        return this.items(index).element(by.css("label"));
    }

    clearCompletedBtn(){
        return element(by.id("clear-completed"));
    }





    //Actions

    navigateToTodosPage = async (): Promise<void> => {
        await browser.get(env.PROD.URL);

        let EC = protractor.ExpectedConditions
        browser.wait(
            EC.titleIs("Todo-Backend client"),
            DEFAULT_TIMEOUT
        );
        browser.sleep(2000); //TODO: Convert to wait for jquery/ajax
    }


    addTodoListItem = async (
        item: string
    ): Promise<void> => {
        //Note current count to compare later
        let count = await this.getCurrentCount();
        console.log("Count : " + count);

        await this.newTodoTextbox().clear();
        await this.newTodoTextbox().sendKeys(item);
        await this.newTodoTextbox().sendKeys(protractor.Key.ENTER);

        //Wait for the list to display
        // await browser.wait(this.waitForItemToAdd(count), DEFAULT_TIMEOUT);
    }

    getCurrentCount = async ():Promise<number>  => {
        try {
            return parseInt(await this.todoCountLbl().getText());
        } catch (error) {
            return 0;
        }
    }

    waitForItemToAdd = async (
        count: number
    ): webdriver.promise.Promise<boolean> => {
        console.log(await this.getCurrentCount());
        while(await this.getCurrentCount() !== ++count){
            sleep(500);
        }
        return true;
    }

    performItemsCleanUp = async (): Promise<boolean> => {
        try {
            while(await this.itemsLbl(0).isDisplayed()) {
                await hover(this.itemsLbl(0));
                await click(this.deleteItemBtn(0));
            }
        } catch (error) {
            return true;
        }
    }

    beforeAll = async (): Promise<void> => {
        browser.waitForAngularEnabled(false); //For non angular apps
        this.navigateToTodosPage();

        //Perform cleanup. Clear any added items in the list.
        browser.wait(this.performItemsCleanUp(), DEFAULT_TIMEOUT);
    }
}