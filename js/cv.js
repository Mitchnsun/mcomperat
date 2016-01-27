var lang = navigator.language || navigator.userLanguage;

var headerTmpl = this.tmpl.header;
$('.sidebar').html(headerTmpl({}));
var cvTmpl = this.tmpl.cv;
$('.content').html(cvTmpl({}));

/* DOM Ready and events function */
$(document).ready(function(){
	console.log('ready');
});