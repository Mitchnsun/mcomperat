/* Global variables */
var SUPPORTED_LANG = ["fr", "en"];
var DATA_PATH = "dist/assets/data/";
var LANG = navigator.language || navigator.userLanguage;

$.getJSON(DATA_PATH + LANG + "/data.json", _.bind(templating, this));

function templating(data) {
  var headerTmpl = this.tmpl.header;
  $('.sidebar').html(headerTmpl(data.person));
  var cvTmpl = this.tmpl.cv;
  $('.content').html(cvTmpl(data));
}

/* DOM Ready and events function */
$(document).ready(function() {
  console.log('ready');
});