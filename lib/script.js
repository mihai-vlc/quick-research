/*
* Mihai Ionut Vilcu (ionutvmi@gmail.com)
* Feb 2013
* chrome extension quick research
* Last Updated: Sep 2013
*/


$(document).ready(function(){	

	// some default settings
	if(!localStorage['tabs'])
	    localStorage['tabs'] = JSON.stringify([0,1,2,3,4]);

	if(!localStorage['suggest-lg'])
	    localStorage['suggest-lg'] = 'en';

	var prevq = [];// holds previous query


	$("body").bind("keypress", function(e) {
			$("#q").focus();
	});

	// update the content on page change
	$(document).on("click", ".gpage",function(){
		_google_search.gotoPage($(this).attr('data-page'));		
	});

	// get some search results
	function search(q,current_tab,r) {
		if(q == '')
			return;

		if(!current_tab)
			current_tab = $(".ui-tabs-active").attr("aria-controls");

		if(r == 1){ // force load
			prevq[current_tab] = '';
		}

		// we make sure we don't load the content again if the tab hasn't changed
		if(prevq[current_tab] == q)
			return;

		prevq[current_tab] = q;

		// google search
		if(current_tab == "tabs-1"){
			$("#tabs-1").gSearch({
				search_text : q
			});
		}
		// yahoo search
		if(current_tab == "tabs-2" ){
			$("#tabs-2").ySearch({
				search_text : q
			});
		}
		// youtube search
		// if you decide to use this jquery plugin please make your own free key at 
		//  http://code.google.com/apis/youtube/dashboard
		// you can find this plugin at http://tikku.com/jquery-jqtube-util
		if(current_tab == "tabs-3"){
			jQTubeUtil.init({ key:"AI39si7UL5dwpgXQHiDiJUlM3wGSpP3C2MkjlQBD74UsseYojISRRxM7PbQovp4oIwB413YS_qc-Dv2YdOLvZV6QghuCRGycDA"});
			
			$("#tabs-3").html('<span style="text-decoration: blink;">Loading...</span>');
			jQTubeUtil.search(q,function(response){ 
				var html = "";
				for(var vid in response.videos){
					var video = response.videos[vid];
					html += "<div class='result'>"+
					     "<div class='title'>" + video.title + "</div>"+
					     "<div data-id='"+ video.videoId +"' class='ytube'><img width='440' src='"+ video.thumbs[0].url +"' alt='"+video.title+"'><div class='play'></div></div>"+
					     "</div>";
				}
				$("#tabs-3").html(html);
			});
		}
		// yahoo search
		if(current_tab == "tabs-4" ){
			$("#tabs-4").imgSearch({
				search_text : q
			});
		}
		// translate page
		if(current_tab == "tabs-5" ){
			$("#tabs-5").qTranslate({
				search_text : q,
				from: $("#from").val(),
				to: $("#to").val()
			});
		}
		
	}
	

	suggest = [];
	
	$("#q").bind('keydown keypress',function(){
		var val = $("#q").val();
		// we get suggestions from google
		$.ajax({
		  url: 'https://clients1.google.com/complete/search',
		  dataType: 'jsonp',
		  async: false,
		  data: {
			q: val,
			nolabels: 't',
			client: "psy",
			ds: "",
			hl : localStorage['suggest-lg']
		  },
		  success: function(data) {
			$.map(data[1], function(item){
			  suggest.push(item[0]); // store them in an array
			});
		  }
		});
	});
	// we use t
	 $("#q").autocomplete({ // use jquery UI autocomplete
		source : suggest,
		select : function(event,ui){
			search(ui.item.value);
		},
		focus: function( event, ui ) {
			ui.item.value = ui.item.value.replace(/(<([^>]+)>)/ig,"");
		}

	 }).data("autocomplete")._renderItem = function (ul, item) {
         return $("<li></li>")
             .data("item.autocomplete", item)
             .append("<a>" + item.label + "</a>")
             .appendTo(ul);
     };
	// autogrow of the input as you type
	$('input#q').autoGrowInput({
		comfortZone: 50,
		minWidth: 200,
		maxWidth: 700
	});
	
	// jquery UI tabs
	$tabs = $("#tabs");
	$tabs.tabs({
	  select: function(e, ui) {
		var q = $("#q").val();
		search(q,ui.panel.id);
	  }
	});
    $tabs.find( ".ui-tabs-nav" ).sortable({
      axis: "x",
      stop: function() {
        $tabs.tabs( "refresh" );
      }
    });


	// remove unused tabs
	var tbs = JSON.parse(localStorage['tabs']);
    $('#tabs > ul > li').each(function(index, elem) {
    	if($.inArray(index, tbs) == -1) // if it's not in the array we remove the tab
    		$(this).remove();
	});

    // select the first active tab
    $tabs.tabs("select", tbs[0]);

	// on submiting the form update the content
	$("#search").submit(function(){
		var q = $("#q").val();
		search(q);
		return false;
	});
	// back to search results
	$(document).on("click", "#bsearch",function(){
		var q = $("#q").val();
		search(q,false,1);
		return false;
	});
	// previous page in iframe
	$(document).on("click", "#back",function(){
		// console.log(window.frames['if']);
		window.frames['if'].history.go(-1);
		return false;
	});
	// next page in iframe
	$(document).on("click", "#forward",function(){
		window.frames['if'].history.go(1);
		return false;
	});
	// open the app in a new window as a popup
	$(document).on("click", "#popup",function(){
		chrome.windows.create({'url': 'pop.html', 'type': 'popup'});		
		return false;
	});
	
	// open the web pages inside the div
	$(document).on('click', ".content .open",function(e){ 
	  e.preventDefault();
	  var URL = $(this).attr('href');
	  var parentFrame = $(this).closest(".content");
	  $("body").css({width: 777});
	  parentFrame.html("<iframe id='if' width='100%' height='75%' frameBorder='1' src='"+URL+"'></iframe>").prepend("<div class='info'><a href='#' id='bsearch'> &#171;&#171; Back to search results</a> | <a href='#' id='back'>&#171; Back</a> | <a href='#' id='forward'>Forward &#187; </a></div>");

	});	
	
	// add youtube iframe when click play
	$(document).on("click", ".ytube", function() {
		var videoId = $(this).attr("data-id");
		$(this).html("<iframe width=\"640\" height=\"360\" src=\"https://www.youtube.com/embed/"+videoId+"?feature=player_detailpage&autoplay=1\" frameborder=\"0\" allowfullscreen></iframe>");
	});

	// update the search when we change the translate countries
	$(".update").on("change", function(){
		var q = $("#q").val();
		search(q, 0, 1);
	});


	
});

