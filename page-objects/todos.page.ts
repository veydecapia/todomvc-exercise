import { browser, element, by } from "protractor";
import { protractor } from "protractor/built/ptor";
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





    //Actions

    navigateToTodosPage = async (): Promise<void> => {
        await browser.get(env.PROD.URL);

        let EC = protractor.ExpectedConditions
        browser.wait(
            EC.titleIs("Todo-Backend client"),
            DEFAULT_TIMEOUT
        );
    }
}