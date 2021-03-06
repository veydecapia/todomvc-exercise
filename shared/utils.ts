import { browser, ElementFinder, element, Locator } from "protractor"
import { DEFAULT_TIMEOUT, DEFAULT_RETRIES } from "./config"
import * as webdriver from 'selenium-webdriver';
import { protractor } from "protractor/built/ptor";



export function hover(
    target: ElementFinder,
    timeout: number = DEFAULT_TIMEOUT
):  webdriver.promise.Promise<void> {
    const e: ElementFinder = getElementFinder(target);
    return waitToBeDisplayed(target, timeout)
        .then(() => {
            return browser.actions().mouseMove(e).perform();
        })
        .catch(() => {
            // Fallback for
            // https://github.com/angular/protractor/issues/4687
            // log('Fallback for hover element');
            return browser.executeScript((element: HTMLElement) => {
                const event = new MouseEvent('mouseenter', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                });

                element.dispatchEvent(event);
            }, e);
        })
        .then(() => {
            return sleep(500);
        });
}


export function click(
    target: ElementFinder,
    timeout: number = DEFAULT_TIMEOUT,
    tryCount: number = DEFAULT_RETRIES
): webdriver.promise.Promise<void> {
    const e: ElementFinder = getElementFinder(target);

    return waitToBeDisplayed(target, timeout)
        .then(() => {
            return browser.wait(
                protractor.ExpectedConditions.elementToBeClickable(e),
                timeout,
                `Element ${e.locator()} not clickable`
            );
        })
        .then(() => e.click())
        .then(
            () => {},
            (error: any) => {
                if (tryCount > 0) {
                    console.log(`Click error: ${error}`);
                    console.log(
                        `Click retry ${tryCount} on target ${e.locator()}`
                    );
                    tryCount = tryCount - 1;
                    return click(target, timeout, tryCount);
                } else {
                    console.error(`Error while clicking on ${e.locator()}`);
                    throw error;
                }
            }
        );
}


export function getElementFinder(
    target: ElementFinder
): ElementFinder {

    if (target.hasOwnProperty('parentElementArrayFinder')) {
        return target as ElementFinder;
    }
    return element(target as Locator);
}


export function waitToBeDisplayed(
    target: ElementFinder,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<boolean> {
    let e: ElementFinder = getElementFinder(target);
    // Don't use EC.visibilityOf(e), here because it doesn't return a promise which we can catch
    return browser.wait(
        (): webdriver.promise.Promise<boolean> => {
            e = getElementFinder(target);
            // log(`Element ${e.locator()} waitToBeDisplayed`);
            return e
                .isPresent()
                .then(
                    (value: boolean) => {
                        if (!value) {
                            return false;
                        }
                        return e.isDisplayed();
                    },
                    () => false
                )
                .then(
                    (value: boolean) => value,
                    () => false
                );
        },
        timeout,
        `Element ${e.locator()} is not present nor displayed`
    );
}


export function sleep(
    time: number,
    message?: string
): webdriver.promise.Promise<void> {
    if (!message) {
        message = 'Sleeping';
    }
    message += `: ${(time / 1000).toFixed(2)}s`;
    if (time > 5000) {
        console.log(message);
    }
    return browser.sleep(time);
}


export const waitForAjax = async ()
: Promise<void> => {
    // const request = env.PROD.requestURL;
    // console.log("Request: " + request);

    browser.executeAsyncScript(function() {
            var callback = arguments[arguments.length - 1];
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "https://todo-backend-django.herokuapp.com/", true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                        callback(xhr.responseText);
                        }
                    };
                    xhr.send('');
                }).then( (str: any) => {
                // console.log("item name: " + str);
            });
}


export const getLocalStorage = async ()
: Promise<number> => {
    return browser.executeAsyncScript(function() {
            var callback = arguments[arguments.length - 1];
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "https://todo-backend-django.herokuapp.com/", true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                        callback(xhr.responseText);
                        }
                    };
                    xhr.send('');
                }).then( (item: any) => {
                // console.log(item);
                let count = JSON.parse(item).length;
                return count;
            });
}