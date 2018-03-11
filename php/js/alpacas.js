var alpaca = '"But why alpacas?" you might just ask yourself. The answer is simple. ' + 
'Alpacas have been domesticated for thousands of years. The Moche people of northern Peru often used alpaca images in their art. '+
'There are no known wild alpacas, and its closest living relative, the vicuña (also native to South America), are believed to be the wild ancestor of the alpaca. ' +
'The alpaca is larger than the vicuña, but smaller than the other camelid species. ' +
'Along with camels and llamas, alpacas are classified as camelids. Of the various camelid species, the alpaca and vicuña are the most valuable fiber-bearing animals: ' +
'the alpaca because of the quality and quantity of its fiber, and the vicuña because of the softness, fineness and quality of its coat.' +
'Alpacas are too small to be used as pack animals. Instead, they are bred exclusively for their fiber and meat. Alpaca meat was once considered a ' + 
'delicacy by Andean inhabitants. Because of the high price commanded by alpaca on the growing North American market, illegal alpaca smuggling had become a growing problem as of 2005.' + 
'In 2014, a company was formed claiming to be the first to export US-derived alpaca products to China.' +
'Alpacas and llamas can successfully cross-breed. The resulting offspring are called huarizo, which are valued for their unique fleece and gentle dispositions.';

var i = 0;

var interval = setInterval(function() {
    $('#alpaca-description').append(alpaca.charAt(i));
    i++;
    if (i === alpaca.length) {
        clearInterval(interval);
    }
}, 50);

$('#send').click(function() {
    $.ajax({
        url: 'compliment.php',
        type: 'POST',
        data: {
            compliment: $('#form-compliment').val(),
            name: $('#form-name').val(),
        },
        success: function(msg) {
            alert('Compliment Sent');
        }               
    });
});