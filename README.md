webdriveerio (webdriverJS + cheerio)
====================================

This module is a cheerio JQuery core implementation binded with a webdriverJS driver. With webdriveerio you can iterate (like JQuery) HTML element from page source code and then trigger actions (for example "click") to the page web site thru webdriverJS over selenium server.

You have a webdriverJS driver with a new command called "query". You can call this command with a selector and a callback that receive a "list" of element getting from the page that driver load. Each of this elements are extended with the action methods that the webdriverJS driver has:

    addValue
    buttonClick
    clearElement
    click
    doubleClick
    dragAndDrop
    moveToObject
    setValue

This method are the same as dirver method but without selector argument (css selector), because the target element is defined by the cheerio element that has the method, so you do not need to pass a selector.
This allow you to write algoritms to determinate wich elements has to be target of actions instead of being limited by a css selector.

How to install it
=================

npm install webdriveerio
