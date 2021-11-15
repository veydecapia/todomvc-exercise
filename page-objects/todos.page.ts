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

    itemsCount = async (): Promise<number> =>{
        return await this.todoList().all(by.css("li")).count();
    }

    itemsCompleteCount = async (): Promise<number> =>{
        return await this.todoList().all(by.css("li.completed")).count();
    }

    itemsActiveCount = async (): Promise<number> =>{
        return await this.todoList().all(by.css("li:not(.completed.hidden)")).count();
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

    editTextbox(index: number){
        return this.items(index).element(by.css(".edit"));
    }

    activeFilterLink(){
        return element(by.linkText("Active"));
    }

    completedFilterLink(){
        return element(by.linkText("Completed"));
    }

    allFilterLink(){
        //TODO: Need to update to a more stable locator
        return element(by.linkText("All"));
        // return element(by.css("#footer a[href='#/']"));
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


    editTodoListItem = async (
        index: number, //Index item
        text: string //Value to type
    ) => {

        await browser.actions()
            .mouseMove(this.items(index))
            .doubleClick()
            .sendKeys(protractor.Key.chord(protractor.Key.CONTROL,"a"))
            .sendKeys(protractor.Key.BACK_SPACE)
            .sendKeys(text)
            .perform();
    }


    performItemsCleanUp = async (): Promise<boolean> => {
        try {
            while(await this.items(0).isDisplayed()) {
                await hover(this.itemsLbl(0));
                await click(this.deleteItemBtn(0));
            }
        } catch (error) {
            await waitForAjax();
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