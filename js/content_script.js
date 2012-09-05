var timeout = 60000;

// chrome.extension.sendMessage are assynchronous.

function saveText(text){
    chrome.extension.sendMessage({'cmd': 'saveText', 'data': text});
}

function getText(callback){
    chrome.extension.sendMessage({'cmd' : 'getText'}, callback);
}

function reloudi(){
	chrome.extension.sendMessage({'cmd': 'autorize'}, function(response){
		var active = response.data;

		if (active){
			var rememberThis = $('#frmMenu :text').val();
			saveText(rememberThis);

			$('#frmMenu\\:acessoRapido').val('freeeeeia!');
			$('#frmMenu :button').click();

		}else{
			window.setTimeout(reloudi, timeout);
		}
	});
}

// Recover saved field value.
getText(function(response){ 
	$('#frmMenu :text').val(response.data);
});

// Set timeout for the first reload.
var timeoutId = window.setTimeout(reloudi, timeout);
