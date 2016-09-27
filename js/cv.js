/* Global variables */
var SUPPORTED_LANG = ["fr", "en"];
var DATA_PATH = "dist/assets/data/";
var LANG = window.location.hash.replace('#','') || navigator.language || navigator.userLanguage;
LANG = _.indexOf(SUPPORTED_LANG, LANG) === -1 ? "en" : LANG;

$.getJSON(DATA_PATH + LANG + "/data.json", _.bind(templating, this));

function templating(data) {
  $('.sidebar').html(this.tmpl.header(data.person));
  $('.content').html(this.tmpl.cv(data));
}

/* DOM Ready and events function */
$(document).ready(function() {
  console.log('ready');
});