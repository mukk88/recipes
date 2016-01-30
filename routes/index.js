var express = require('express');
var mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');
var router = express.Router();

//mongo set up
// var mongoOptions = 
// { 
// 	db: {safe: true }, 
// 	server: { 
// 		auto_reconnect: true, 
// 		socketOptions: {keepAlive: 1}  
// 	} 
// };

// var connectionString = "mongodb://12345:12345@ds052837.mongolab.com:52837/recipes";
// mongoose.connect(connectionString, mongoOptions);
// var connection = mongoose.createConnection(connectionString);
// autoIncrement.initialize(connection);

// var recipeSchema = mongoose.Schema({
// 	name:String,
// 	image:String,
// 	pdf:String,
// 	cat:String,
// 	tags:String
// });

// recipeSchema.plugin(autoIncrement.plugin, { model: 'Recipe', startAt: 1 });

// var Recipe = mongoose.model('Recipe', recipeSchema);

/* GET and POST */
router.get('/add', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req,res){
	res.render('recipes');

	// var allRecipes;
	// Recipe.find({}, function(err,allrecipes){
	// 	res.render('recipes', {recipes:allrecipes});
	// 	console.log(allrecipes);
	// });
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


router.get('/dice', function(req,res){
	res.render('dice');
});


var azure = require('azure-storage');
var tableSvc = azure.createTableService('mukk', "+Y9jXjGoCAK13UK/GZTFDrx/x4oLA9ERbkQvDkbDy000Nfr9beDm+ri8Y1tToacRXfydUID44gcKDIvl8lWgxQ==");


var Pace = { 
  PartitionKey: {'_':'kids'},
  RowKey: {'_': 'Pace'},
  description: {'_':'random'},
  spouse: {'_':'Val'},
  to: {'_':''},
  given: {'_':false}
};

var Val = { 
  PartitionKey: {'_':'kids'},
  RowKey: {'_': 'Val'},
  description: {'_':'random'},
  spouse: {'_':'Pace'},
  to: {'_':''},
  given: {'_':false}
};

var Andrew = { 
  PartitionKey: {'_':'kids'},
  RowKey: {'_': 'Andrew'},
  description: {'_':'random'},
  spouse: {'_':'Katherine'},
  to: {'_':''},
  given: {'_':false}
};

var Kat = { 
  PartitionKey: {'_':'kids'},
  RowKey: {'_': 'Katherine'},
  description: {'_':'random'},
  spouse: {'_':'Andrew'},
  to: {'_':''},
  given: {'_':false}
};

var Mark = { 
  PartitionKey: {'_':'kids'},
  RowKey: {'_': 'Mark'},
  description: {'_':'random'},
  spouse: {'_':'Isabelle'},
  to: {'_':''},
  given: {'_':false}
};

var Belle = { 
  PartitionKey: {'_':'kids'},
  RowKey: {'_': 'Isabelle'},
  description: {'_':'random'},
  spouse: {'_':'Mark'},
  to: {'_':''},
  given: {'_':false}
};

var Cheryl = { 
  PartitionKey: {'_':'kids'},
  RowKey: {'_': 'Cheryl'},
  description: {'_':'random'},
  spouse: {'_':''},
  to: {'_':''},
  given: {'_':false}
};

var batch = new azure.TableBatch();

batch.updateEntity(Val, {echoContent: true});
batch.updateEntity(Pace, {echoContent: true});
batch.updateEntity(Andrew, {echoContent: true});
batch.updateEntity(Kat, {echoContent: true});
batch.updateEntity(Mark, {echoContent: true});
batch.updateEntity(Belle, {echoContent: true});
batch.updateEntity(Cheryl, {echoContent: true});

// tableSvc.executeBatch('mytable', batch, function (error, result, response) {
//   if(!error) {
//   		console.log('reset');
//     // Batch completed
//   }
// });



var query = new azure.TableQuery()
  .top(7)
  .where('PartitionKey eq ?', 'kids');

// tableSvc.queryEntities('mytable',query, null, function(error, result, response) {
// 	if(!error){
// 		var all = response.body.value;
// 		for(var i=0;i<all.length;i++){
// 			console.log(all[i].RowKey + ' ' + all[i].to + ' ' + all[i].given + ' ' + all[i].spouse);
// 		}
// 	}
// });


router.get('/santa', function(req,res){
	var url = req.url;
	var person = url.split("=")[1];
	if(person){
		// find first not given to person that is not spouse, give to that person, update that person
		tableSvc.queryEntities('mytable',query, null, function(error, result, response) {
		  if(!error) {
		  	var all = response.body.value;
		  	var personToGive = '';

		  	//check if already giving to someone
		  	tableSvc.retrieveEntity('mytable', 'kids', person, function(error, result, response){
			  if(!error){
			    if(response.body.to==''){
		  			for(var i=0;i<all.length;i++){
				  		if(all[i].RowKey==person || all[i].spouse==person || all[i].given){
				  			continue;
				  		}
				  		personToGive = all[i].RowKey;
				  		var tasktoChange = { 
						  PartitionKey: {'_':'kids'},
						  RowKey: {'_': personToGive},
						  given: {'_':true}
						};
						tableSvc.mergeEntity('mytable', tasktoChange, function(error, result, response){
						  if(!error) {
						  	console.log('changed');
						  }
						});
						var tasktoChange2 = { 
						  PartitionKey: {'_':'kids'},
						  RowKey: {'_': person},
						  to: {'_': personToGive}
						};
						tableSvc.mergeEntity('mytable', tasktoChange2, function(error, result, response){
						  if(!error) {
						  	console.log('changed');
						  }
						});
				  		break;
			  		}
					res.render('santa', {person:personToGive});
			    }else{
			    	res.render('santa', {person:response.body.to});
			    }
			  }
			});
		  }
		});
	}else{
		res.render('santa', {person:person});
	}

});


module.exports = router;
