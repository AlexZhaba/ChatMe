var util = require('util');
var express = require('express');
var app = express();
var passport = require("passport");

var fs = require('fs');
var request = require('request');
const { Pool, Client } = require('pg')
const bcrypt= require('bcrypt')
const uuidv4 = require('uuid/v4');
//TODO
//Add forgot password functionality
//Add email confirmation functionality
//Add edit account page

app.use(express.static('public'));

const LocalStrategy = require('passport-local').Strategy;
//const connectionString = process.env.DATABASE_URL;

var currentAccountsData = [];

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'social_network',
	password: 'postgres',
	port: 5432,
	ssl: true
});

let userValidate = require('./userValidate');

module.exports = function (app) {
	app.get('/api/isAuthenticated', (req, res) => {
		console.log('user = ', req.user);
		if (req.isAuthenticated()) {
			res.json({errorCode:'1', data:'Ты и так зарегистрирован!', username: req.user.email})
			console.log('Пользователь зарегистрирован');
		} else {
			res.json({errorCode:'0', data:'Пользователь не зарегистрирован'});
			console.log('Пользователь не зарегистрирован');
		}
	});
	app.get('/api/getAuthenticatedStatus', (req, res) => {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		if (req.user) {
			res.json({isAuthenticated: true, userAuthenticatedId: req.user.email.replace(/\s+/g,'')})
		} else {
			res.json({isAuthenticated: false, userAuthenticatedId: null});
		}
	});
	app.post('/api/registration', async function (req, res) {
		console.log('req = ',req.body);

		try{
			console.log('Я вошёл в обработчик get запроса на end point /signup');
		//	var pwd = await bcrypt.hash(req.body.password, 5);
			var pwd = req.body.password;
			let userPasswordMessage = userValidate.checkPassword(pwd);
			if ( userPasswordMessage != 'OK' ) {
				res.json({errorCode: 1, data: userPasswordMessage});
				console.log('ПАРОЛЬ СЛИШКОМ МАЛЕНЬКИЙ!');
				return 0;
			}
			pool.connect(function (err, client, done) {
					client.query('SELECT id FROM users WHERE "email"=$1', [req.body.username], function(err, result) {
						console.log('Это все пользователи с почтой, указанной пользователем ',result.rows);
						if(result.rows[0] != null){
							console.log('Пользователь с данной почтой существует!');
		          res.json({errorCode: 1, data: 'Email not unique'});
						}
						else{
							let str = `INSERT INTO users VALUES ('${uuidv4()}', '${req.body.firstName}', '${req.body.lastName}', '${req.body.username}', '${pwd}')`;
							//console.log(str);
							//let str = ('INSERT INTO users (id, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5)', [uuidv4(), req.body.firstName, req.body.lastName, req.body.username, pwd]);
							console.log('str = ',str);
							console.log('Создаю пользователя...');
							console.log('pwd = ', pwd);
		          client.query(str, function(err, result) {
								done();
								//console.log('str = ', str);
								if(err){console.log(err);}
								else {

							    console.log('Пользователь создан');
									res.json({errorCode: 0, data: 'User was created', username: req.body.username});
								}
							});


						}

					});
			});
		}
		catch(e){
			console.log('ТЫ ДОЛБАЕБ БРАТИШКА!');
			throw(e)
		}
	});
	app.get('/api/account', function (req, res, next) {
		//console.log('АХУЕННЫЙ ПАСПОРТ = ');
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		console.log('cookie = ' + req.session.cookie.maxAge);
		console.log('account базарит, что ' + req.isAuthenticated());
		console.log( 'ВОТ БЛЯТЬ ЧТО В _userProperty ', req._passport.instance._userProperty);
		console.log('user = ' + req.user);
		console.log('session = ', req.session);
		if(req.isAuthenticated()){
			res.json({errorCode: 0, user: req.user})
		}
		else{
			res.json({errorCode: 1, data:'Ты не авторизован брат'});
		}
	});
	app.get('/api/account/:id', async function (req, res, next) {
		let ans = {
			myAccount: false,
			isAuthenticated: false,
			user: {},
			errorCode : 123,
			userAuthenticatedId : ''
		};
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		// console.log(req.user);
		// req.logout();
		// console.log(req.user);
		// res.json({errorCode :2})
		// return 0;
		// console.log('ДЕЛАЮ ЛОГАУТ ',req.user);

		pool.connect(function (err, client, done) {
				console.log('Я вошёл в обработчик get запроса на end point /ACCOUNT/:', req.params.id);
				if (req.user) {
					ans.isAuthenticated = true;
					ans.userAuthenticatedId = req.user.email;
					if (req.user.email.replace(/\s+/g,'') == req.params.id) {
						console.log('req.user = ', req.user);
						ans.myAccount = true;
						ans.isAuthenticated = true;
						ans.errorCode = 0;
					}
				}
				console.log('Пользователь, который авторизован = ', req.user);
				client.query('SELECT first_name, last_name, email FROM users WHERE email=$1', [req.params.id], function(err, result) {
					done();
					console.log('currentAccountsData = ', result.rows[0]);
					if (result.rows[0] == null) {
						ans.errorCode = 2;
						console.log('Пользователя с данным id не существует!');
						res.json(ans);
						return 0;
					}
					ans.errorCode = 0;
					ans.user = result.rows[0];
					res.json(ans);
				});
		});

	});
	app.post('/api/searchUsers', async function (req, res) {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		pool.connect((err, client, done) => {
			let str = `SELECT EMAIL, FIRST_NAME, LAST_NAME FROM USERS WHERE EMAIL LIKE '${req.body.searchText}%'`;
			client.query(str,(err, result) => {
				done();
				if (err) {
					throw err
				} else {
					console.log(result.rows);
					res.json({searchUsers: result.rows})
				}
			});
		});
	})
	app.post('/api/getAllPosts', async function (req, res) {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		console.log('GET POSTS');

		console.log('req.body = ', req.body);
		console.log('req.user = ', req.user);
		let username = req.body.username.replace(/\s+/g,'');
		let str = `SELECT * FROM USER_POSTS WHERE REPLACE(username, ' ','')='${username}'`;
		console.log(str);
		pool.connect(function (err, client, done) {
					console.log('client = ',err)
					client.query(str, (err, result) => {
						done();
						console.log(err)
						if (err) {
							res.json(err);

						} else {
							// console.log('Везвращаю посты пользователя ',username,' ',result.rows);
							res.json({posts: result.rows.reverse()});
						}
					});
				});

	});
	app.post('/api/following', async function (req, res) {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		pool.connect(function (err, client, done) {
				let subsciber = req.user.email.replace(/\s+/g,'');
				let username = req.body.username.replace(/\s+/g,'');
				let str = `SELECT * FROM USERS_SUBSCRIBERS WHERE REPLACE(username, ' ','')='${username}' AND REPLACE(subscriber, ' ','')='${subsciber}'`;
				console.log(str);
				client.query(str, (err, result) => {
					done();
					if (err) {
						console.log(err);
						res.json(err);
					} else {
						let following = false;
						if (result.rows[0] != null) {
							following = true;
						};
						console.log(following);
						res.json({following: following });
					}
				});
		});
	});
	app.get('/api/getSubscribers', async function (req, res) {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		let username = req.user.email.replace(/\s+/g,'');
		let str = `SELECT * FROM USERS_SUBSCRIBERS WHERE REPLACE(username,' ','') ='${username}'`;
		console.log(str);
		pool.connect(function (err, client, done) {
				client.query(str, (err, result) => {
					done();
					if (err) {
						throw err;
					} else {
						let subscribers = result.rows.map(e => e.subscriber);
						console.log(subscribers);
						console.log(result.rows);
						res.json({subscribers: subscribers});
					}
				});
		});
	});
	app.get('/api/getSubscribtions', async function (req, res) {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		let subscriber = req.user.email.replace(/\s+/g,'');
		let str = `SELECT * FROM USERS_SUBSCRIBERS WHERE REPLACE(subscriber,' ','') ='${subscriber}'`;
		console.log(str);
		pool.connect(function (err, client, done) {
				client.query(str, (err, result) => {
					done();
					if (err) {
						throw err;
					} else {
						let subscribtions = result.rows.map(e => e.username);
						console.log(subscribtions);
						console.log(result.rows);
						res.json({subscribtions: subscribtions});
					}
				});
		});
	});
	app.post('/api/setFollowing', async function (req, res) {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		let newFollowing = req.body.newFollowing;
		let subscriber = req.user.email.replace(/\s+/g,'');
		let username = req.body.username.replace(/\s+/g,'');
		if (newFollowing) {
			// if we need to add
			let str = `INSERT INTO USERS_SUBSCRIBERS VALUES('${username}','${subscriber}');`;
			pool.connect(function (err, client, done) {
					client.query(str, (err, result) => {
						done();
						if (err) {
							throw err;
						} else {
							console.log('ДОБАВЛЕН ПОДПИСЧИК');
							res.json({errorCode: 0});
						}
					});
			});
		} else {
			// if we need to delete column
			let str = `DELETE FROM USERS_SUBSCRIBERS WHERE username = '${username}' AND subscriber='${subscriber}'`;
			pool.connect(function (err, client, done) {
					client.query(str, (err, result) => {
						done();
						if (err) {
							throw err;
						} else {
							console.log('УДАЛЕН ПОДПИСЧИК');
							res.json({errorCode: 0});
						}
					});
			});
		}


	})
	app.post('/api/newPostValue', async function (req, res)  {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let data = new Date();
		let DATA_POST = data.getHours()+ ':' + data.getMinutes()  + ', '  + data.getUTCDate() + '.' + parseInt(data.getUTCMonth() + 1).toString() + '.' + data.getFullYear();
		console.log('req = ', req.user);
		let str = `INSERT INTO user_posts VALUES ('${req.user.email}', '3', '${req.body.newPostValue}', '0', '${DATA_POST}')`;
		console.log('str = ' + str)
		pool.connect(function (err, client, done) {
				client.query(str, (err, result) => {
					done();
					console.log('YA V QUERY');
					console.log(err);
					if (err) {
						res.json(err)
					} else {
						console.log(result)
						let newPost = [{
							text: req.body.newPostValue,
							publicdata : DATA_POST
						}];
						res.json({data: 'Posts was created', posts : newPost});
					}
				});
		});
	})
	app.get('/api/logout', function(req, res){
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		console.log(req.isAuthenticated());
		req.logout();
		console.log(req.isAuthenticated());
		req.flash('success', "Logged out. See you soon!");
		res.json({data:'logout is successful'});
	});


	app.post('/api/getuser', async function (req, res) {
		console.log('Чел хочет юзера ',req.body.email);
		pool.connect(function (err, client, done) {
				client.query('SELECT first_name, last_name, email, password FROM users WHERE email=$1', [req.body.email], function(err, result) {
					done();
					console.log('currentAccountsData = ', result.rows[0]);
					res.json(result.rows[0])
				});
		});
	});

	app.post('/api/signup',	passport.authenticate('local', {failureRedirect: '/failureLogin'}), function (req, res) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		console.log('Я КРОЧЕК АВТОРИЗИРОВАЛСЯ и вот мой req.user = ', req.user);
		console.log('ЩАС БУДУТ КУКИ');
		console.log('cookie = ' + req.session.cookie.maxAge);
			if (req.body.remember) {
				req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
				console.log('cookie = ' + req.session.cookie.maxAge);

			} else {
				req.session.cookie.expires = false;
			}
			req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
			res.json({
				errorCode: 0,
				data: 'User is authenticated',
				username: req.user.email
				});
	});
	app.get('/failureLogin', (req, res)=> {
		res.json({data: 'not correct email or password'});
	});
}


passport.use('local', new  LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {

	loginAttempt();
	async function loginAttempt() {


		console.log('ЭТО ШО Я В ПАСПОРТЕ?');
		try{
			console.log('username = |', username);
			username = username.replace(/\s+/g,'');
			pool.connect(function (err, client, donePool) {
					client.query('SELECT id, first_name, last_name,  email, password FROM users WHERE email=$1', [username], function(err, result) {
						donePool(12);
						console.log('ТО Я КАРОЧЕ В ПАСПОРТЕ ДАТУ ПОЛУЧИЛ ', result.rows[0]);
						if(err) {
							return done(err)
						}
						if(result.rows[0] == null){
							req.flash('danger', "Oops. Incorrect login details.");
							console.log('НЕТ ТАКОГО ПОЛЬЗОВАТЕЛЯ!');
							return done(null, false, {message : 'user didnt found'});
						}
						else {
							let resPas = result.rows[0].password.replace(/\s+/g,'');
							console.log('resPas = ', resPas);
							if (password == resPas){
									console.log('НАКОНЕЦ-ТО ТЫ ДОЛБАЕБ ЗАШЕЛ ', {email: result.rows[0].email, first_name: result.rows[0].first_name});
									return done(null, {email: result.rows[0].email, first_name: result.rows[0].first_name});
								}
								else{
									console.log('КЛОУН БЛЯТЬ ЛОГИН НЕПРАВИЛЬНЫЙ');
									req.flash('danger', "Oops. Incorrect login details.");
									return done(null, false);
								}

						}
					});
			});
		}

		catch(e){throw (e);}
	};

}
))

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});
