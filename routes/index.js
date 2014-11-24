var express = require('express');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var router = express.Router();

//mongo set up
var mongoOptions = 
{ 
	db: {safe: true }, 
	server: { 
		auto_reconnect: true, 
		socketOptions: {keepAlive: 1}  
	} 
};

var connectionString = "mongodb://12345:12345@ds052837.mongolab.com:52837/recipes";
mongoose.connect(connectionString, mongoOptions);
var connection = mongoose.createConnection(connectionString);
autoIncrement.initialize(connection);

var recipeSchema = mongoose.Schema({
	name:String,
	image:String,
	pdf:String,
	cat:String,
	tags:String
});

recipeSchema.plugin(autoIncrement.plugin, { model: 'Recipe', startAt: 1 });

var Recipe = mongoose.model('Recipe', recipeSchema);

/* GET and POST */
router.get('/add', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req,res){
	var allRecipes;
	Recipe.find({}, function(err,allrecipes){
		res.render('recipes', {recipes:allrecipes});
		console.log(allrecipes);
	});
});

router.post('/recipe/add', function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var pdf = req.body.pdf;
	var cat = req.body.cat;
	var tags = req.body.tags;
	Recipe.findOne({name:name}, function(err, recipe){
		if(!recipe){
			var recipe = new Recipe();
			Recipe.nextCount(function(err,count){
				if(err) return;
				recipe.name = name;
				recipe.image = image;
				recipe.pdf = pdf;
				recipe.cat = cat;
				recipe.tags = tags;
				recipe.save();
				res.send('1');
			});
		}else{
			//recipe of that title already exists
			res.send(false);
		}
	});
});

router.get('/blog', function(req,res){
	res.render('blog');
});

router.get('/post', function(req,res){
	res.render('samplepost');
});

router.get('/post/add', function(req,res){
	res.render('postadd');
});

router.get('/blog/insta', function(req,res){
	res.render('bloginsta');
});

router.get('dice', function(req,res){
	res.render('dice');
});

module.exports = router;
