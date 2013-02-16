/*
* Mihai Ionut Vilcu (ionutvmi@gmail.com)
* Feb 2013
* chrome extension quick research
*/
$(document).ready(function(){
	var prevq;	var prevq2;	var prevq3;	var prevq4;
	// get some search results
	function search(q,current_tab,r) {
		
		if(r == 1){
			prevq = '';	prevq2 = '';	prevq3 = '';	prevq4 = '';
		}

		
		if(!current_tab)
			current_tab = $(".ui-tabs-active").attr("aria-controls");

		// google search
		if(current_tab == "tabs-1" && q != prevq){
			prevq=q;
			$("#tabs-1").gSearch({
				search_text : q
			});
		}
		// yahoo search
		if(current_tab == "tabs-2"  && q != prevq2){
			prevq2=q;
			$("#tabs-2").ySearch({
				search_text : q
			});
		}
		// youtube search
		// if you decide to use this jquery plugin please make your own free key at 
		//  http://code.google.com/apis/youtube/dashboard
		// you can find this plugin at http://tikku.com/jquery-jqtube-util
		if(current_tab == "tabs-3" && q != '' && q != prevq3){
			prevq3=q;
			jQTubeUtil.init({ key:"AI39si7UL5dwpgXQHiDiJUlM3wGSpP3C2MkjlQBD74UsseYojISRRxM7PbQovp4oIwB413YS_qc-Dv2YdOLvZV6QghuCRGycDA"});
			
			$("#tabs-3").html('<span style="text-decoration: blink;">Loading...</span>');
			jQTubeUtil.search(q,function(response){ 
				var html = "";
				for(var vid in response.videos){
					var video = response.videos[vid];
					// console.log(video); 
					html += "<div class='result'><div class='title'>" + video.title + "</div><iframe width=\"640\" height=\"360\" src=\"https://www.youtube.com/embed/"+video.videoId+"?feature=player_detailpage\" frameborder=\"0\" allowfullscreen></iframe></div>";
				}
				$("#tabs-3").html(html);
			});
		}
		// yahoo search
		if(current_tab == "tabs-4"  && q != prevq4){
			prevq4=q;
			$("#tabs-4").imgSearch({
				search_text : q
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
			ds: ""
		  },
		  success: function(data) {
			$.map(data[1], function(item){
			  suggest.push(item[0].replace("<b>","").replace("</b>","")); // store them in an array
			});
		  }
		});
	});
	// we use t
	 $("#q").autocomplete({ // use jquery UI autocomplete
		source : suggest,
		select : function(event,ui){
			search(ui.item.value);
		}
	 });
	// autogrow of the input as you type
	$('input#q').autoGrowInput({
		comfortZone: 50,
		minWidth: 200,
		maxWidth: 700
	});
	
	// jquery UI tabs
	$("#tabs").tabs();
	$("#tabs").tabs({
	  select: function(e, ui) {
		var q = $("#q").val();
		search(q,ui.panel.id);
	  }
	});
    $("#tabs").find( ".ui-tabs-nav" ).sortable({
      axis: "x",
      stop: function() {
        $("#tabs").tabs( "refresh" );
      }
    });
	// on submiting the form update the content
	$("#search").submit(function(){
		var q = $("#q").val();
		search(q);
		return false;
	});
	// back to search results
	$("#bsearch").live("click",function(){
		var q = $("#q").val();
		search(q,false,1);
		return false;
	});
	// previous page in iframe
	$("#back").live("click",function(){
		window.frames['if'].history.go(-1);
		return false;
	});
	// next page in iframe
	$("#forward").live("click",function(){
		window.frames['if'].history.go(1);
		return false;
	});
	// open the app in a new window as a popup
	$("#popup").live("click",function(){
	chrome.windows.create({'url': 'pop.html', 'type': 'popup'});		
		return false;
	});
	
	// open the web pages inside the div
	$(".content .open").live('click',function(e){ 
	  e.preventDefault();
	  var URL = $(this).attr('href');
	  var parentFrame = $(this).closest(".content");
	  $("body").css({width: 777});
	  parentFrame.html("<iframe id='if' width='100%' height='75%' frameBorder='1' src='"+URL+"'></iframe>").prepend("<div class='info'><a href='#' id='bsearch'> &#171;&#171; Back to search results</a> | <a href='#' id='back'>&#171; Back</a> | <a href='#' id='forward'>Forward &#187; </a></div>");

	});	
	

	
	
});

