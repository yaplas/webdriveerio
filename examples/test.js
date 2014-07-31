var wd = require('webdriveerio');

var options = { desiredCapabilities: { browserName: 'chrome' } };

var driver = wd.remote(options);


// EXAMPLE:
// we will check only checkbox with an amount of things between 5 and 12;


driver
    .init()
    .url('http://github.com/yaplas/webdriveerio/blob/master/examples/checkbox-list.html')
    .query('form input', function(err, $inputs, $) {
        
        $inputs.each(function(i,e){
        	
        	var $field = $(e);
            var amount = $field.next().text().split(' ')[0];

            if (amount > )


 
        });
    }) 
    .pause(10000, function(){})
    .end();

