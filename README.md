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

These methods are the same as dirver method but without selector argument (css selector), because the target element is defined by the cheerio element that has the method, so you do not need to pass a selector.
This allow you to write code to determinate wich elements has to be action targets instead of being limited by a css selector.

How to install it
=================

npm install webdriveerio

Example
========

In the examples folder you'll find test.js file that search into checkbox-list.html some checkboxes and click the ones that match a rule (amount of "things" between 5 and 12).


```js

var wd = require('webdriveerio');

var options = { desiredCapabilities: { browserName: 'chrome' } };

var driver = wd.remote(options);


// EXAMPLE:
// we will clck only checkboxes with an amount of things between 5 and 12;


driver
    .init()
    .url('file:///' + __dirname + '/checkbox_list.html') 
    .query('form input', function(err, $inputs, $) { 
        // you could add a pause between actions, calling "query" like this:
        // .query('form input', 500, function(err, $inputs, $) { 
        // 500 = milliseconds of pause between actions ("click" action in this example)
        
        $inputs.each(function(i,e){
        	
        	var $field = $(e);
            var amount = parseInt($field.next().text().split(' ')[0]);

            if (amount >= 5 && amount <= 12 ) {
                
                // just call click over the element and driver will click the element in the real browser
                $field.click(); 
            
            }
        });
    }) 
    .pause(10000, function(){})
    .end();

```

The above code click a selection of items, and the selection was made by iterating over inputs and programatically decide wich has to be clicked depending on the weight of a number into the text of the label. It could not be posible using css selectors only.

The list of checkboxes is like this:

```html
    ...
    
	<form>
		<input type="checkbox"></input><label>12 things</label><br>
		<input type="checkbox"></input><label>20 things</label><br>
		<input type="checkbox"></input><label>3 things</label><br>
		<input type="checkbox"></input><label>5 things</label><br>
		<input type="checkbox"></input><label>8 things</label><br>
		<input type="checkbox"></input><label>14 things</label><br>
	</form>

    ...
```

So test.js will click on "12 things", "5 things" and "8 things" checkboxes.
