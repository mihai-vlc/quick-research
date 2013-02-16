/*
* ionutvmi
* yahoo grab search results
*/
(function($) {
  $.fn.ySearch = function(options) {
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
		
		$.ajax({
		  url: 'http://m.yahoo.com/w/search',
		  async: false,
		  data: {
			p: o.search_text,
		  },
		  success: function(data) {
			// var n = data.match(/<a href=\"\/rs\/(.+?)\">(.+?)<\/a>/g);
			var n = data.match(/<td class=\"blocks\">(.+?)<\/td>/g);
			//console.log(n);
			var results ='';
			$.each(n,function(index,d){
				if (d.indexOf("uic description last") < 0)
					if (d.indexOf("/rs/") >= 0)
						if (d.indexOf("uic link first") >= 0)
							results += "<tr class='result'>"+d.replace("uic link first","title").replace("uic small","snippet").replace("uic url small last","url-cache").replace("<a href=\"/rs","<a class=\"open\" href=\"http://m.yahoo.com/rs")+"</tr>" ;
				
			});
			jquery_object.html("<table>"+results+"</table>");
		  }
		});
	});
	
	
  };
  
	$.fn.ySearch.defaults =
	{
		// Search text
		search_text : ''
	}
})(jQuery);