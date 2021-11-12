import { browser } from "protractor";
import { protractor } from "protractor/built/ptor";
import { DEFAULT_TIMEOUT } from "../shared/config";
import * as env from "../shared/constants/environmentProperties.json";


export class TodosPage {


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