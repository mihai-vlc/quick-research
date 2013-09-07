/**
* Simple translation plugin.
* Using Yandex api
* @author Mihai Ionut Vilcu (ionutvmi@gmail.com)
* September 2013
*/
;(function ( $, window, undefined ) {

  var pluginName = 'qTranslate',
      document = window.document,
      defaults = {
      	search_text: "",
        from: "en",
        to: "fr"
      };

  function Plugin( element, options ) {
    this.element = element;

    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype.init = function () {
  	var $elem = $(this.element).children('.result');
	console.log(this.options.from+"-"+this.options.to);
	jQuery.ajax({
	  url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
	  type: 'GET',
	  dataType: 'json',
	  data: {
	  		key: 'trnsl.1.1.20130903T194612Z.e65e2a8aaab73e64.cfbaa3b04e516ec65164fcf3f57a11f94ee2c17a',
	  		lang: this.options.from+"-"+this.options.to,
	  		text: this.options.search_text
		},
	  success: function(data, textStatus, xhr) {
	    	$elem.html(data.text[0]);
	  },
	  error: function(xhr, textStatus, errorThrown) {
	    if(errorThrown == 'Bad Request')
	    	$elem.html("This language commbination is not accepted ! The accepted one are: ru-en,ru-pl,ru-hu,ru-uk,ru-de,ru-fr,ru-be,ru-sq,ru-es,ru-it,ru-hy,ru-da,ru-pt,ru-sk,ru-sl,ru-nl,ru-bg,ru-ca,ru-hr,ru-cs,ru-el,ru-no,ru-mk,ru-sv,ru-fi,ru-et,ru-lv,ru-lt,ru-tr,ru-ro,ru-sr,ru-az,en-ru,en-hu,en-uk,en-de,en-fr,en-be,en-sq,en-es,en-it,en-da,en-pt,en-sk,en-sl,en-nl,en-ca,en-cs,en-el,en-no,en-mk,en-sv,en-fi,en-et,en-lv,en-lt,en-tr,pl-ru,pl-uk,pl-be,hu-ru,hu-en,uk-ru,uk-en,uk-pl,uk-de,uk-fr,uk-es,uk-it,uk-bg,uk-cs,uk-tr,uk-ro,uk-sr,de-ru,de-en,de-uk,de-fr,de-be,de-es,de-it,de-tr,fr-ru,fr-en,fr-uk,fr-de,fr-be,be-ru,be-en,be-pl,be-de,be-fr,be-es,be-it,be-bg,be-cs,be-tr,be-ro,be-sr,sq-ru,sq-en,es-ru,es-en,es-uk,es-de,es-be,it-ru,it-en,it-uk,it-de,it-be,hy-ru,da-ru,da-en,pt-ru,pt-en,sk-ru,sk-en,sl-ru,sl-en,nl-ru,nl-en,bg-ru,bg-uk,bg-be,ca-ru,ca-en,hr-ru,cs-ru,cs-en,cs-uk,cs-be,el-ru,el-en,no-ru,no-en,mk-ru,mk-en,sv-ru,sv-en,fi-ru,fi-en,et-ru,et-en,lv-ru,lv-en,lt-ru,lt-en,tr-ru,tr-en,tr-uk,tr-de,tr-be,ro-ru,ro-uk,ro-be,sr-ru,sr-uk,sr-be,az-ru");
	    else
	    	$elem.html("Some error camed up !");
	  }
	}); 	   
  };

  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
//      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
 //     }
    });
  }

}(jQuery, window));

