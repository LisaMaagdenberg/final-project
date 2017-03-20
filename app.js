const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://' + 
	process.env.POSTGRES_USER + ':' + 
	process.env.POSTGRES_PASSWORD + '@localhost/finalproject'); 
const express = require('express');
const app = express();
const pg = require('pg');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}));  
app.use(bodyParser.json());
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('statics'));

// setting the tables
var Webshopitem = sequelize.define('webshopitem', {
	productname: Sequelize.STRING,
	price: Sequelize.STRING,
	description: Sequelize.STRING
})

var Freepattern = sequelize.define('freepattern', {
	title: Sequelize.STRING,
	body: Sequelize.TEXT
})

var Jarofideas = sequelize.define('jarofideas', {
	title: Sequelize.STRING,
	body: Sequelize.TEXT
})

var User = sequelize.define('user', {
	name: Sequelize.STRING,
	email: Sequelize.STRING
})

// get home/index page
app.get('/', (req, res) =>{
	res.render('index');
})

// get jar of ideas page
app.get('/jar-of-ideas', (req, res) =>{
	res.render('jar-of-ideas');
})

// get free patterns page
app.get('/free-patterns', (req, res) =>{
	res.render('free-patterns');
})

// get webshop page
app.get('/webshop', (req, res) =>{
	res.render('webshop');
})

// get welcome page
app.get('/welcome', (req, res) =>{
	res.render('welcome');
})

// get checkout page
app.get('/checkout', (req, res) =>{
	res.render('checkout');
})

sequelize.sync({force:true})
	.then(function(){
		Freepattern.create({
			title: "Wolf",
			body: "This wolf is inspired by the fox from someone else. I changed the color and the ears a bit. On the top of this post I need to add the photo, I have to add the link to the pattern and I have to write the pattern beneath."
		})
	})
	.then(function(){
		Freepattern.create({
			title: "Umbreon",
			body: "I made the pattern from *this site* bigger, so credits go there. On top comes a photo, beneath this text comes the pattern. Also, the link has to work."
		})
	})
	.then(function(){
		Jarofideas.create({
			title: "Rome",
			body: "When the word I pulled out of my Jar of Ideas was 'Rome', I was stuck for a while. I didn't want to do the obvious and go with a gladiator, the Colosseum or other touristic buildings. After a long brainstorm, it finally hit me: I should make something inspired by the origin story of Rome. So I went online and searched for a crochet pattern for a wolf. I had one color of grey yarn, so it couldn't be too detailed or have different shades of grey and/or brown. Finally, I found one. Because this was my second amigurumi ever, I didn't want it to be too difficult. The result is very cute, even though I had to make some little changes to the pattern. Like I said, I wasn't used to crocheting little parts, so mostly the ears were difficult. I changed the pattern a bit, so it would be easier for me to make it. The result: a very cute little wolf! The pattern was originally by *vrouwke*, you can find my version on the Free Patterns page or by clicking *this link*.</p>"
		})
	})
	.then(function(){
		Jarofideas.create({
			title: "Amsterdam",
			body: "What to make based on 'Amsterdam'? Because I was about to go away for the weekend, I couldn't bring paint or pencils. The Amazing Mike suggested that I could write a short story, since a notebook wouldn't take up to much space. But what to write about Amsterdam? Was it going to be romantic, or scary, or maybe in the future? If you continue reading, you will find out... Dutch version: *put story here*"
		})
	})
	.then(function(){
		Webshopitem.create({
			productname: "Bulbasaur pattern",
			price: "3,99",
			description: "Make this cute Bulbasaur with this pattern! Pokédex #1, 150 to go..."
		})
	})
	.then(function(){
		app.listen(3000, () => {
			console.log('server has started');
		});
	})
