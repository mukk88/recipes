$(function(){

	$('#submit').click(function(){
		var imgname = 'images/' + $('#image').val().replace(/^.*[\\\/]/, '');
		var pdfname = 'pdf/' + $('#pdf').val().replace(/^.*[\\\/]/, '');
		var title = $('#title').val();
		var cat = $("#cat").find(":selected").text();
		var tags = 'n/a';
		console.log(title + ' ' + cat + ' ' +  imgname + ' ' + pdfname);

		//do a post here
		$.post( "http://woorecipes.azurewebsites.net/recipes/add", { name: "John", image: "2pm", pdf:"pdf", cat:"cat", tags:"tags"} );

		alert('submit');
	});	

});
