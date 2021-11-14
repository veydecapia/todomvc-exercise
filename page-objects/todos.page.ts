import { browser, element, by } from "protractor";
import { protractor } from "protractor/built/ptor";
import { click, hover, waitForAjax } from "../shared/utils";
import { DEFAULT_TIMEOUT } from "../shared/config";
import * as env from "../shared/constants/environment-properties.json";


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

    itemsCount(){
        return this.todoList().all(by.css("li")).count();
    }

    itemsLbl(index: number){
        return this.items(index).element(by.css("label"));
    }

    clearCompletedBtn(){
        return element(by.id("clear-completed"));
    }

    markAsCompleteChkbox(index: number){
        return this.items(index).element(by.css(".toggle"));
    }





    //Actions

    navigateToTodosPage = async (): Promise<void> => {
        await browser.get(env.PROD.URL);

        let EC = protractor.ExpectedConditions
        browser.wait(
            EC.titleIs("Todo-Backend client"),
            DEFAULT_TIMEOUT
        );

        //Wait for ajax call to finish
        await waitForAjax();
    }


    addTodoListItem = async (
        item: string
    ): Promise<void> => {
        await this.newTodoTextbox().clear();
        await this.newTodoTextbox().sendKeys(item);
        await this.newTodoTextbox().sendKeys(protractor.Key.ENTER);

        //Wait for ajax call to finish
        await waitForAjax();
    }

    performItemsCleanUp = async (): Promise<boolean> => {
        try {
            while(await this.items(0).isDisplayed()) {
                await hover(this.itemsLbl(0));
                await click(this.deleteItemBtn(0));
            }
        } catch (error) {
            return true;
        }
    }

    beforeAll = async (): Promise<void> => {
        browser.waitForAngularEnabled(false); //For non angular apps
        await this.navigateToTodosPage();

        //Perform cleanup. Clear any added items in the list.
        browser.wait(this.performItemsCleanUp(), DEFAULT_TIMEOUT);
    }
}