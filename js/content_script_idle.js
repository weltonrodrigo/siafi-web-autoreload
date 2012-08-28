var mimlupa = 'https://siafi.tesouro.gov.br/'
							+ 'siafi2012/cpr-dochabil/weblets/'
							+ 'weblets/siafi-cpr-dadosApoio-pesquisa/'
							+ 'js/lupa.js?';

// 45 segundos para manter a sessÃ£o ativa.
var code = "console.log('Extensão injetada.') ;setInterval( function(){jQuery.get( '" + mimlupa + "' ) } ,45000);"

var script = $('<script type=text/javascript>').html(code);

$('head').append(script);
