/*
* ionutvmi
* google image search
*/
(function($) {
  $.fn.imgSearch = function(options) {
		// Build main options before element iteration
		var o = $.extend({}, $.fn.gSearch.defaults, options);
		
		// Check it Search String Entered or Empty
		if(o.search_text == undefined) return this;
		if(o.search_text == "") return this;	
		
		
		
	return this.each(function() {
		// Set jQuery object			
		var jquery_object = $(this);
		// show the loading text
		jquery_object.html('<span style="text-decoration: blink;">Loading...</span>');

		$.getJSON("https://ajax.googleapis.com/ajax/services/search/images?callback=?", {
			q: o.search_text,
			v: '1.0',
			rsz:8
		}, function(data) {
			var result ='';
			$.each(data.responseData.results,function(index,val){
				result += "<a target='_blank' href='"+val.url +"'><img width='25%' src='"+val.tbUrl+"'></a>";
			});
			jquery_object.html(result);
		});
	

	});
	
	
  };
  
	$.fn.imgSearch.defaults =
	{
		// Search text
		search_text : ''
	}
})(jQuery);