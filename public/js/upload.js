$(function(){

	$('#submit').click(function(){
		var imgname = 'images/' + $('#image').val().replace(/^.*[\\\/]/, '');
		if(imgname=='images/'){
			imgname = $('#imagetext').val();
		}
		var pdfname = 'images/pdf/' + $('#pdf').val().replace(/^.*[\\\/]/, '');
		var title = $('#title').val();
		var cat = $("#cat").find(":selected").text();
		var tags = $('#tags').val();
		console.log(title + ' ' + cat + ' ' +  imgname + ' ' + pdfname);

		//do a post here
		$.post( "http://woorecipes.azurewebsites.net/recipe/add", { name: title, image:imgname, pdf:pdfname, cat:cat, tags:tags} );
	});	

});
