var lang = navigator.language || navigator.userLanguage;

var template = this.tmpl.cv;
$('.content').html(template({}));

/* DOM Ready and events function */
$(document).ready(function(){
	console.log('ready');
});