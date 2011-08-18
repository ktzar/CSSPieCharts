(function($){
    $.fn.csspiechart = function(options) {

        var defaults = {
            values: [10,20,30],
            size: 300,
            colors: ['#fcc', '#cfc', '#ccf'],
        };

        var options = $.extend(defaults, options);

        return this.each(function() {
            obj = $(this);
            var body = obj.html();
            console.log(options.values);
            sum = 0;
            total = 0;
            for(val in options.values) {
                total+=options.values[val];
            }
            angles = new Array();
            obj.html('');
            for(val in options.values) {
                r = parseInt(Math.random()*255);
                g = parseInt(Math.random()*255);
                b = parseInt(Math.random()*255);
                angle = parseInt(36000*(options.values[val]/total))/100;
                angles.push(angle);
                //put 2
                if (angle > 180){
                    obj.append('<div style="-webkit-transform:rotate('+sum+'deg)" class="front"><div style="background:'+colors[val]+';-webkit-transform:rotate('+(180)+'deg)" class="pie"></div></div>');
                    obj.append('<div style="-webkit-transform:rotate('+(sum+180)+'deg)" class="front"><div style="background:'+colors[val]+';-webkit-transform:rotate('+(angle-180)+'deg)" class="pie"></div></div>');
                }else{
                    obj.append('<div style="-webkit-transform:rotate('+sum+'deg)" class="front"><div style="background:'+colors[val]+';-webkit-transform:rotate('+angle+'deg)" class="pie"></div></div>');
                }
                sum+=angle;
            }
            console.log(angles);
            obj.append('<div class="holder back"></div>');
        });
    };
})(jQuery);

