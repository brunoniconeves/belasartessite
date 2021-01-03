var lastIndex = 0;
var placeholderSide = 'left';
var messages = [
    '"Meu coração pulsa e dança. Porque não sei sentir sem ritmo."',
    'A dança: uma expressão perpendicular de um desejo horizontal."',
    '"Não é o ritmo nem os passos que fazem a dança. Mas a paixão que vai na alma de quem dança."',
    '"Dançar é sentir, sentir é sofrer, sofrer é amar... Tu amas, sofres e sentes. Dança!"',
    '"A dança é a linguagem escondida da alma."',
    '"Não dance para esquecer a vida, mas para lembrar que ela existe!"'
];

(function makeDiv(){
    var divsize = 0; 
    
    if($('.massage-placeholder-left').width() < 300){
        var divsize = $('.massage-placeholder-left').width().toFixed(); 
    }else{
        divsize = (300).toFixed();
    }
    
    
    var color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
    $newdiv = $('<div class="messages"/>').css({
        'width':divsize+'px',
        'height':divsize+'px',
    });
    

    if(placeholderSide == 'left'){
        placeholderSide = 'right';
    }else{
        placeholderSide = 'left';
    }

    var posx = (Math.random() * ($('.massage-placeholder-'+placeholderSide).width() - divsize)).toFixed();
    var posy = (Math.random() * ($('.massage-placeholder-'+placeholderSide).height() - divsize)).toFixed();
    
    var randomIndex = Math.floor(Math.random() * (messages.length - 1));
    while(lastIndex == randomIndex){
        randomIndex = Math.floor(Math.random() * (messages.length - 1));
    }
    lastIndex = randomIndex;
    
    $newdiv.html(messages[randomIndex]);

    $newdiv.css({
        'position':'absolute',
        'left':posx+'px',
        'top':posy+'px',
        'display':'none'
    }).appendTo('.massage-placeholder-'+placeholderSide).fadeIn(500).delay(5000).fadeOut(500, function(){
       $(this).remove();
       makeDiv(); 
    }); 
})();
