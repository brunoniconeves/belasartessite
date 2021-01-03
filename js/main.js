$(document).ready(function(){

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    
    if(isMobile.any()){
        $('#concurso').removeClass('flex');
    }

    if(window.top.location.hash.substr(1) == 'mensagemenviada'){
        alertOpen('Mensagem enviada com sucesso!', 'Nossa equipe irá responder sua mensagem em breve.'); // show response from the php script.
    }

    //remove marcador do widget
    var removeBrandInterval = setInterval(() => {
        var $element = $('.instagram-gallery a').not('.eapps-instagram-feed-posts-item-link')
        
        if($element.length > 0){
            $element.remove();

            //custom title 
            $('.eapps-instagram-feed-title').append('<br/><a href="https://www.instagram.com/belasartesdanca" target="_blank" title="Ver no Instagram">@belasartesdanca</a>');

            clearInterval(removeBrandInterval);
        }
    }, 1000);


    var removeBrandInterval2 = setInterval(() => {
        var $element = $('[href="https://widgetwhats.com"]');
        
        if($element.length > 0){
            $element.remove();
            clearInterval(removeBrandInterval2);
        }
    }, 1000);
    

    $(document).scroll(function() {
        var scrollPosition = $(document).scrollTop();
        console.log(scrollPosition);
        if(scrollPosition > 80){
            $('.header-container').removeClass('dark').addClass('light');
        }else{
            $('.header-container').removeClass('light').addClass('dark');
        }
      });

      AOS.init();
    
});

function navTo(selector, duration, offset){
    $([document.documentElement, document.body]).animate({
        scrollTop: $(selector).offset().top + (offset ? offset : 0)
    }, duration);
}

function menuToggle() {
    $menu = $('.side-bar');
    if ($menu.hasClass('no-show')) {
        $menu.removeClass('no-show');
        $('body').append('<div class="menu-overlay"></div>');
        $('.menu-overlay').click(function () {
            menuToggle();
        });
    } else {
        $menu.addClass('no-show');
        $('.menu-overlay').remove();
    }
};

function sendMail(){
    var form = $('#contato');
	
	var contato = {
		name: $('#nome').val(),
		email: $('#replyto').val(),
		whatsapp: $('#telefone').val(),
		message: $('#mensagem').val(),
	}
	
	console.log(contato);

    $.ajax({
        type: "POST",
        url: 'https://balletbelasartes.com.br/api/contact',
        data: JSON.stringify(contato),
        success: function(data)
        {
            if(data != 'error'){
                alertOpen('Mensagem enviada com sucesso!', 'Nossa equipe irá responder sua mensagem em breve.'); // show response from the php script.
            } else{
                alertOpen('Erro ao enviar mensagem!', 'Poxa, sua mensagem não pode ser enviada. Que tal nos contatar pelo telefone ou diretamente pelo e-mail <a href="mailto:contato@balletbelasartes.com.br">contato@balletbelasartes.com.br</a>'); // show response from the php script.
            }
        }
      });
}

function alertOpen(title, message){
    
    $('body').append('<div class="modal-overlay"></div>');
    $('body').append('<div class="modal-alert"><div class="header"><h4></h4><div class="close-modal"><i class="fas fa-times"></i></div></div><div class="body"></div><div class="footer"></div></div>');
    
    if(title){
        $('.modal-alert .header h4').html(title);
    }

    $('.modal-alert .body').html('<p>' + message + '</p>');

    $('.modal-alert .footer').html('<button type="button" class="btn btn-default btn-small">Fechar</button>');

    $('.modal-overlay, .modal-alert .close-modal, .modal-alert .footer .btn').click(function () {
        alertClose();
    });


}

function alertClose(){
    $('.modal-overlay').remove();
    $('.modal-alert').remove();
}