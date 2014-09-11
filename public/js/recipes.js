var options = {
  valueNames: [ 'name' , 'tags']
};

var breakfastList = new List('breakfast', options);
var appetizerList = new List('appetizer', options);
var dessertList = new List('dessert', options);
var mainList = new List('main', options);

$( document ).ready(function() {
	var main = $("#mainsearch");
	$("#totalsearch").keyup(function() {
	    mainList.search(this.value);
	    dessertList.search(this.value);
	    breakfastList.search(this.value);
	    appetizerList.search(this.value);
	});
});