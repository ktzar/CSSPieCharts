/*!
 * CSSPieChart jQuery plugin
 * Copyright 2011, Miguel L Gonzalez
 * Licensed under the GPL Version 3 license.
 * http://mentadreams.com
 *
 * csspiechart jQuery function, takes object options as argument with properties:
 * values: absolute values to be represented in the pieChart
 * size: size of the pie chart (width and height)
 * colors: array of valid CSS colors, i.e. #ff0, rgb(255,40,40). For now it's not recommended to use non-opaque colours
 * TODO: modify the CSS for width and height
 * TODO: accept an option for explicit percentage values
 * 
 */
(function($){
    $.fn.csspiechart = function(options) {

        //Default values
        var defaults = {
            values: [10,20,30],
            size: 200,
            colors: ['red','orange','yellow','green','#0ff', 'blue','purple'], //the rainbow colors as default
        };

        //Merge the default options witht the values in the params
        var options = $.extend(defaults, options);

        //Do for all the elements
        return this.each(function() {
            obj = $(this);
            var body = obj.html();
            sum = 0;
            total = 0;
            //Get the sum of values
            for(val in options.values) {
                //fix NaN values
                if (isNaN(options.values[val]))
                    options.values[val] = 0;
                total+=options.values[val];
            }
            angles = new Array();
            obj.html('');
                console.log(options.values);
            for(val in options.values) {
                angle = parseInt(36000*(options.values[val]/total))/100;
                angles.push(angle);
                console.log(sum);
                //If the angle of this slice is > 180 degrees we need 2 divs for displaying that
                if (angle > 180){
                    obj.append('<div style="-moz-transform:rotate('+sum+'deg);-webkit-transform:rotate('+sum+'deg)" class="front"><div style="background:'+options.colors[val]+';-moz-transform:rotate('+(180)+'deg);-webkit-transform:rotate('+(180)+'deg)" class="pie"></div></div>');
                    obj.append('<div style="-moz-transform:rotate('+(sum+179)+'deg);-webkit-transform:rotate('+(sum+179)+'deg)" class="front"><div style="background:'+options.colors[val]+';-moz-transform:rotate('+(angle-179)+'deg);-webkit-transform:rotate('+(angle-179)+'deg)" class="pie"></div></div>');
                }else{
                    obj.append('<div style="-moz-transform:rotate('+sum+'deg);-webkit-transform:rotate('+sum+'deg)" class="front"><div style="background:'+options.colors[val]+';-moz-transform:rotate('+angle+'deg);-webkit-transform:rotate('+angle+'deg)" class="pie"></div></div>');
                }
                sum+=angle;
            }
            //The back of the Pie, for the border and shadow
            obj.append('<div class="holder back"></div>');
        });
    };
})(jQuery);

