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
app.use(express.static('statics/js'))

// setting the tables
var Webshopitem = sequelize.define('webshopitem', {
	productname: Sequelize.STRING,
	price: Sequelize.STRING,
	description: Sequelize.STRING,
	body: Sequelize.TEXT,
	delivery: Sequelize.STRING,
	img: Sequelize.STRING,
	type: Sequelize.STRING,
	size: Sequelize.STRING,
	link: Sequelize.STRING
})

var Freepattern = sequelize.define('freepattern', {
	title: Sequelize.STRING,
	description: Sequelize.STRING,
	body: Sequelize.TEXT,
	img: Sequelize.STRING,
	link: Sequelize.STRING
})

var Jarofideas = sequelize.define('jarofideas', {
	title: Sequelize.STRING,
	body: Sequelize.TEXT,
	img: Sequelize.STRING
})

var User = sequelize.define('user', {
	name: Sequelize.STRING,
	email: Sequelize.STRING
})

var Word = sequelize.define('word', {
	word: Sequelize.STRING
})

// get home/index page
app.get('/', (req, res) =>{
	res.render('index');
})

// get jar of ideas page
app.get('/jar-of-ideas', (req, res) =>{
	Jarofideas.findAll({ order: [["id", "DESC"]]})
	.then(function(JOI){
		res.render('jar-of-ideas', {jarofideas: JOI});
	})
})

app.get('/getyourword', (req, res)=>{
	Word.find({
  		order: [
    		Sequelize.fn( 'RANDOM' ),
  		]
	})
	.then(function(result){
		res.send(result)
	})
})

// get free patterns page
app.get('/free-patterns', (req, res) =>{
	Freepattern.findAll({order:[['id', 'DESC']]})
	.then(function(freepatterns){
		res.render('free-patterns', {freepatterns: freepatterns});
	})
})

app.get('/pattern/:pattern', (req, res)=>{
	Freepattern.findOne({where: {link: req.params.pattern}})
	.then(function(result){
		res.render('pattern', {pattern: result})
	})
})

// get webshop page
app.get('/webshop', (req, res) =>{
	Webshopitem.findAll({order:[['id', 'DESC']]})
	.then(function(result){
		res.render('webshop', {webshopitems:result});
	})
})

app.get('/item/:item', (req, res)=>{
	Webshopitem.findOne({where: {link: req.params.item}})
	.then(function(item){
		res.render('webshop-item', {item: item})
	})
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
			description: "This cute little wolf was inspired by the word 'Rome' and a little fox... ",
			body: "This wolf is inspired by the fox from someone else. I changed the color and the ears a bit. On the top of this post I need to add the photo, I have to add the link to the pattern and I have to write the pattern beneath.",
			img: "rome",
			link: "wolf"
		})
	})
	.then(function(){
		Freepattern.create({
			title: "Umbreon",
			description: "I choose you! After a long time searching for a nice pattern, I found this one and made it bigger.",
			body: "I made the pattern from *this site* bigger, so credits go there. On top comes a photo, beneath this text comes the pattern. Also, the link has to work.",
			img: "umbreon",
			link: "umbreon"
		})
	})
	.then(function(){
		Freepattern.create({
			title: "Snowman",
			description: "Do you wanna crochet a snowman, Elsa?",
			body: "Breiclub made a book with free patterns! You can download them here. This snowman is also in it. I love it!",
			img: "snowman",
			link: "snowman"
		})
	})
	.then(function(){
		Jarofideas.create({
			title: "Rome",
			body: "When the word I pulled out of my Jar of Ideas was 'Rome', I was stuck for a while. I didn't want to do the obvious and go with a gladiator, the Colosseum or other touristic buildings. After a long brainstorm, it finally hit me: I should make something inspired by the origin story of Rome. So I went online and searched for a crochet pattern for a wolf. I had one color of grey yarn, so it couldn't be too detailed or have different shades of grey and/or brown. Finally, I found one. Because this was my second amigurumi ever, I didn't want it to be too difficult. The result is very cute, even though I had to make some little changes to the pattern. Like I said, I wasn't used to crocheting little parts, so mostly the ears were difficult. I changed the pattern a bit, so it would be easier for me to make it. The result: a very cute little wolf! The pattern was originally by *vrouwke*, you can find my version on the Free Patterns page or by clicking *this link*.",
			img: "rome"
		})
	})
	.then(function(){
		Jarofideas.create({
			title: "Amsterdam",
			body: "What to make based on 'Amsterdam'? Because I was about to go away for the weekend, I couldn't bring paint or pencils. The Amazing Mike suggested that I could write a short story, since a notebook wouldn't take up to much space. But what to write about Amsterdam? Was it going to be romantic, or scary, or maybe in the future? If you continue reading, you will find out... Dutch version: *put story here*",
			img: "amsterdam"
		})
	})
	.then(function(){
		Webshopitem.create({
			productname: "Bobble scarf",
			price: "69,99",
			description: "Handmade scarf with bobbles.",
			body: "This scarf will keep you warm all winter! It is super comfy and has a nice thickness. Because it is handmade, you will be unique this winter! Other colors are optional.",
			size: "30 x 220 cm",
			delivery: "4 weeks",
			img: "webshop-scarf",
			type: "scarf -- finished product",
			link: "bobble-scarf"
		})
	})
	.then(function(){
		Webshopitem.create({
			productname: "Bear and Ducky",
			price: "29,99",
			description: "Perfect for in the baby's room: this cute handmade bear and ducky.",
			body: "A cute little bear and his ducky: the perfect decoration! Because this product makes use of safety eyes, this bear and ducky are completely safe for small children. Other colors optional.",
			size: "height 20 cm",
			delivery: "3 days",
			img: "webshop-bear-ducky",
			type: "amigurumi -- finished product",
			link: "bear-and-ducky"
		})
	})
	.then(function(){
		Webshopitem.create({
			productname: "Heart keychains",
			price: "19,99",
			description: "Two keychains with hearts. Different colors possible.",
			size: "10 x 15 x 5 cm",
			body: "One for you, one for your loved one? This is not only a perfect gift for Valentine's! Express your love with these keychains. Other colors are optional.",
			delivery: "3 days",
			img: "webshop-keychainheart",
			type: "keychain -- finished product",
			link: "heart-keychains"
		})
	})
	.then(function(){
		Webshopitem.create({
			productname: "Eevee",
			price: "34,99",
			description: "What will this Eevee evolve into? Your new favorite stuffed animal!",
			size: "30 x 15 x 25 cm",
			delivery: "1 week",
			body: "Eevee must be the biggest competator of Pikachu in the first generation of Pokémon. With its soft fur and big, cute eyes, it is hard to resist this little guy! What will it evolve in?",
			img: "eevee",
			type: "amigurumi -- finished product",
			link: "eevee"
		})
	})
	.then(function(){
		Word.create({
			word: "Amsterdam"
		})
	})
	.then(function(){
		Word.create({
			word: "Rome"
		})
	})
	.then(function(){
		Word.create({
			word: "Donald Duck"
		})
	})
	.then(function(){
		Word.create({
			word: "Sandwich"
		})
	})
	.then(function(){
		Word.create({
			word: "Chicken"
		})
	})
	.then(function(){
		Word.create({
			word: "Ball"
		})
	})
	.then(function(){
		Word.create({
			word: "Tea"
		})
	})
	.then(function(){
		app.listen(3000, () => {
			console.log('server has started');
		});
	})
