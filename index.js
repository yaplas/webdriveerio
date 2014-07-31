var $ = require('cheerio'),
    webdriverjs = require('webdriverjs'),
    _remote = webdriverjs.remote,
    _proto = Object.getPrototypeOf($()),
    _pause = 1;

// extend the prototype of cheerio object with this method 
// that return an "absolute" selector for the cheerio element
_proto.absolute = function(element, value) {
    
    element = element || this;

    var name = element[0].name,
        parent = element.parent(),
        hasParent = parent.length && name != 'body',
        prevCount = hasParent ? element.prevAll(name).length : 0;

    name = prevCount ? name + ':nth-of-type('+(prevCount+1)+')' : name;
    value = value ? name + '>' + value : name;

    return hasParent ? this.absolute(parent, value) : value;
};

// this function implement the webdriverJS "actions"
// extending the prototype of the cheerio objects
function implement(driver, name) {

    _proto[name] = function() {
        var args = Array.prototype.slice.call(arguments);
        args = [this.absolute()].concat(args);
        
        var _driver = driver;
        
        driver = driver.pause(_pause, function() { 
            _driver[name].apply(_driver, args); 
        });
        
        return driver;
    };
}

// reimplement the remote method 
// to call action implementations on cheerio objects
// and create the "query" driver command
webdriverjs.remote = function() {
    
    var args = Array.prototype.slice.call(arguments);
    var driver = _remote.apply(this, args);

    // webdriverJS actions
    implement(driver,'addValue');
    implement(driver,'buttonClick');
    implement(driver,'clearElement');
    implement(driver,'click');
    implement(driver,'doubleClick');
    implement(driver,'dragAndDrop');
    implement(driver,'moveToObject');
    implement(driver,'setValue');
    //implement(driver,'submitForm');
    //implement(driver,'waitFor');

    // webdriverJS status
    implement(driver,'isSelected');
    implement(driver,'isVisible');

    // selector = css selector
    // pause = milliseconds of pause between action posts to selenium <optional argument>
    // cb = callback function(err, $code, $)
    driver.addCommand('query', function(selector, a, b){

        var cb = typeof a == 'function' ? a : b;
        _pause = typeof a == 'number' ? a : 1;

        this.getSource(function(err, code){
            cb(err, $(code).find(selector), $);
        });
    });

    return driver;
};

module.exports = webdriverjs;
