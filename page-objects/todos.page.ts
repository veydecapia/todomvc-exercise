import { browser, element, by } from "protractor";
import { protractor } from "protractor/built/ptor";
import { click, hover } from "../shared/utils";
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

    itemsLbl(index: number){
        return this.todoList().all(by.css("label")).get(index);
    }

    deleteItemBtn(index: number){
        return element.all(by.css(".destroy")).get(index);
    }

    todoCountLbl(){
        return element(by.id("todo-count")).element(by.css("strong"));
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
        await this.newTodoTextbox().clear();
        await this.newTodoTextbox().sendKeys(item);
        await this.newTodoTextbox().sendKeys(protractor.Key.ENTER);
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
}