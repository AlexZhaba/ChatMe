var util = require('util');
var express = require('express');
var app = express();
var passport = require("passport");

var fs = require('fs');
var request = require('request');
var multer = require('multer');
var compress_images = require('compress-images');
const { Pool, Client } = require('pg')
const bcrypt= require('bcrypt')
const uuidv4 = require('uuid/v4');
const path = require('path')

app.use(express.static('public'));

const LocalStrategy = require('passport-local').Strategy;
//const connectionString = process.env.DATABASE_URL;

var MY_IP = require('./config').MY_IP;

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

let storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname,'public/avatars'));
		},
		filename: (req, file, cb) => {
			console.log('file = ',file);
			let p = file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length + 1);
			cb(null, req.user.email.replace(/\s+/g,'') + p);
		}
});

let storageImagePost = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname,'public/image_post'));
	},
	filename: (req, file, cb) => {
		console.log('FILE ', req.post_id);
		let p = file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length + 1);
		cb(null, req.user.email.replace(/\s+/g,'') + '_' + req.params.id + p);
	}
});

let upload = multer({ storage: storage }).single('file');
let uploadImagePost = multer({ storage: storageImagePost }).single('file');

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
	app.get('/api/avatar/:id', (req, res) => {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let username = req.params.id.slice(0, req.params.id.indexOf('@'));
		// let usernameNameImage = `${username}`{

		// }
		console.log('AVATAR')
		if (fs.existsSync(path.join(__dirname, '/public/build/avatars', username + '.jpg'))) {
			res.sendfile(path.join(__dirname, '/public/build/avatars', username + '.jpg'));
		} else {
			if (fs.existsSync(path.join(__dirname, '/public/build/avatars', username + '.png'))) {
				res.sendfile(path.join(__dirname, '/public/build/avatars', username + '.png'));
			}
			else if (username) res.sendfile(path.join(__dirname, '/public/avatars', 'default.jpg'));
		}
	})
	app.get('/api/getAuthenticatedStatus', (req, res) => {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
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
				if (err) throw err;
					client.query('SELECT *  FROM users WHERE "email"=$1', [req.body.username], function(err, result) {
						console.log('Это все пользователи с почтой, указанной пользователем ',result.rows);
						if(result.rows[0] != null){
							console.log('Пользователь с данной почтой существует!');
		          res.json({errorCode: 1, data: 'Email not unique'});
						}
						else{
							let str = `INSERT INTO users (first_name, last_name, email,password, postsCount, likesCount, subscribersCount, subscribtionsCount, avatar,
							status, country, datebirthday)
							VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.username}', '${pwd}', 0, 0, 0, 0, 0, '', '', '')`;
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
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
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
			userAuthenticatedId : null
		};
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
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
						ans.myAccount = true;
						ans.isAuthenticated = true;
						ans.errorCode = 0;
					}
				}
				if (err) throw err;
				client.query(`SELECT first_name, last_name, email, status, datebirthday,
											country, about, postsCount, likesCount, subscribersCount, subscribtionsCount
											FROM users WHERE email=$1`, [req.params.id], function(err, result) {
					done();
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
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		pool.connect((err, client, done) => {
			let str = `SELECT EMAIL, FIRST_NAME, LAST_NAME FROM USERS WHERE EMAIL LIKE '%${req.body.searchText}%'`;
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
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		// console.log('GET POSTS');

		// console.log('req.body = ', req.body);
		// console.log('req.user = ', req.user);
		let username = req.body.username.replace(/\s+/g,'');
		console.log('USERNAME = ', username)
		let str = `SELECT * FROM USER_POSTS WHERE REPLACE(username, ' ','')='${username}' ORDER BY POST_ID DESC`;
		// console.log(str);
		pool.connect(function (err, client, done) {
					// console.log('client = ',err)
					client.query(str, (err, result) => {
						if (err) throw err;
						// done();
						// console.log(err)
						// if (err) {
						// 	res.json(err);
						//
						// } else {
						// 	// console.log('Везвращаю посты пользователя ',username,' ',result.rows);
						// 	res.json({posts: result.rows.reverse()});
						// }
						let postsCount = result.rows.length;
						let ans = [];
						for (let i = 0; i < postsCount; i++) {
							let post = result.rows[i];
							client.query(`SELECT * FROM POSTS_LIKES WHERE username='${username}' AND post_id=${post.post_id} AND liker='${req.user.email}'`, (err, result) => {
								if (err) throw err;
								post.liked = (result.rows.length == 0) ? false : true;
								ans.push(post);
								if (i == postsCount - 1) {
									done();
									console.log('ЭТО ПОСТЫ ', username)
									res.json({posts: ans});
								}
							});
						}
						if (postsCount == 0) {
							done();
							res.json({posts: []});
						}
					});
				});

	});
	app.post('/api/following', async function (req, res) {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		pool.connect(function (err, client, done) {
				let subsciber = req.user.email.replace(/\s+/g,'');
				let username = req.body.username.replace(/\s+/g,'');
				let str = `SELECT * FROM USERS_SUBSCRIBERS WHERE REPLACE(username, ' ','')='${username}' AND REPLACE(subscriber, ' ','')='${subsciber}'`;
				// console.log(str);
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
						// console.log(following);
						res.json({following: following });
					}
				});
		});
	});
	app.get('/api/getSubscribers', async function (req, res) {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		let username = req.user.email.replace(/\s+/g,'');
		let str = `SELECT * FROM USERS_SUBSCRIBERS WHERE REPLACE(username,' ','') ='${username}'`;
		// console.log(str);
		pool.connect(function (err, client, done) {
				client.query(str, (err, result) => {
					// done();
					if (err) {
						throw err;
					} else {
						let ans = [];
						let userCount = result.rows.length;
						console.log(userCount);
						console.log(result.rows)
						for (let i = 0; i < userCount; i++) {
							let str = `SELECT first_name, last_name, email FROM USERS WHERE email='${result.rows[i].subscriber}'`;
							client.query(str, (err, result) => {
								console.log('err = ', err);
								console.log(str)
								console.log(i,' - ', result.rows[0])
								ans.push(result.rows[0]);
								if (ans.length == userCount) {
									done();
									console.log('я отправил ', ans)
									res.json({subscribers: ans});
									return 0;
								}
							});
						};
						if (userCount == 0) {
							done();
							res.json({subscribers: []});
							return 0;
						}
					}
				});
		});
	});
	app.post('/api/uploadAvatar', (req, res) => {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		console.log('req.user = ',req.user);
		let com_img = (INPUT_PATH, OUTPUT_PATH) => {
			console.log('OP = ' + OUTPUT_PATH)
			compress_images(INPUT_PATH, OUTPUT_PATH, {compress_force: false, statistic: true, autoupdate: true}, false,
																											{jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
																											{png: {engine: 'pngquant', command: ['--quality=20-50']}},
																											{svg: {engine: 'svgo', command: '--multipass'}},
																											{gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, function(error, completed, statistic){
											console.log('-------------');
											console.log(error);
											console.log('completed ' + completed);
											console.log(statistic);
											console.log('-------------');

									return res.json({message: 'NICE'})
				});
		}
		let fullUpload = (INPUT_PATH, OUTPUT_PATH) => {
			upload(req, res, function (err) {
				console.log('ЗАГРУЗИЛИ ДЕФОЛТ');
				if (err instanceof multer.MulterError) {
					return res.json({message: err})
				} else if (err) {
					 return res.json({message: err})
				}
				let expansion;
				if (fs.existsSync(INPUT_PATH + `.jpg`)) {
					expansion = '.jpg'
				} else expansion = '.png';
				console.log('expansion = ', expansion)
				console.log('dELETE PATH = ' + OUTPUT_PATH + `${req.user.email.replace(/\s+/g,'')}.jpg`)
				if (fs.existsSync(OUTPUT_PATH + `${req.user.email.replace(/\s+/g,'')}.jpg`)) {
					console.log('УДАЛЯЕМ В АУТПУТЕ JPG')
					fs.unlink(OUTPUT_PATH + `${req.user.email.replace(/\s+/g,'')}.jpg`, (err) => {
						com_img(INPUT_PATH + expansion, OUTPUT_PATH);
					})
				} else
				if (fs.existsSync(OUTPUT_PATH + `${req.user.email.replace(/\s+/g,'')}.png`)) {
					console.log('УДАЛЯЕМ В АУТПУТЕ PNG')
					fs.unlink(OUTPUT_PATH + `${req.user.email.replace(/\s+/g,'')}.png`, (err) => {
						com_img(INPUT_PATH + expansion, OUTPUT_PATH);
					})
				} else com_img(INPUT_PATH + expansion, OUTPUT_PATH );
			})
		}
		let INPUT_PATH = path.join(__dirname, `public/avatars/${req.user.email.replace(/\s+/g,'')}`);
		// let INPUT_PATH = path.join(__dirname,`public/avatars/justdoit.jpg`);
		let OUTPUT_PATH = path.join(__dirname, 'public/build/avatars/');
		// console.log('req   ==' ,req)
		if (fs.existsSync(INPUT_PATH + '.jpg')) {
			console.log('УДАЛЯЕМ JPG')
			fs.unlink(INPUT_PATH + '.jpg', (err) => {
				if (err) throw err;
				fullUpload(INPUT_PATH, OUTPUT_PATH)
			})
		} else if (fs.existsSync(INPUT_PATH + '.png')) {
			fs.unlink(INPUT_PATH + '.png', (err) => {
				if (err) throw err;
				fullUpload(INPUT_PATH, OUTPUT_PATH)
			})
		} else fullUpload(INPUT_PATH, OUTPUT_PATH);
	// res.json({message:'NICE'})
	})
	app.get('/api/getSubscribtions', async function (req, res) {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		let subscriber = req.user.email.replace(/\s+/g,'');
		let str = `SELECT * FROM USERS_SUBSCRIBERS WHERE REPLACE(subscriber,' ','') ='${subscriber}'`;
		console.log(str);
		pool.connect(function (err, client, done) {
				client.query(str, (err, result) => {
					// done();
					if (err) {
						throw err;
					} else {
						let ans = [];
						let userCount = result.rows.length;
						console.log(userCount);
						console.log('rows = ', result.rows)
						for (let i = 0; i < userCount; i++) {
							let str = `SELECT first_name, last_name, email FROM USERS WHERE email='${result.rows[i].username}'`;
							client.query(str, (err, result) => {
								console.log('err = ', err);
								console.log(str)
								console.log(i,' - ', result.rows[0])
								ans.push(result.rows[0]);
								if (ans.length == userCount) {
									done();
									console.log('я отправил ', ans)
									res.json({subscribtions: ans});
									return 0;
								}
							});
						};
						if (userCount == 0) {
							done();
							res.json({subscribtions: []});
							return 0;
						}
						// let subscribtions = result.rows.map(e => e.username);
						// console.log(result.rows);
						// console.log('ans = ', ans)

					}
				});
		});
	});
	app.get('/api/getAllInfoAuthenticatedUser', async function (req, res) {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		if (!req.user) {
			res.json({errorCode: 1})
		}
		else {
			let username = req.user.email.replace(/\s+/g,'');
			let str = `SELECT * FROM USERS WHERE EMAIL='${username}'`;
			pool.connect((err, client, done) => {
				client.query(str, (err, result) => {
					done();
					if (err) throw err
					else {
						console.log('ВОТ КАРОЧЕ МОЙ ЮЗЕР ', result.rows[0]);
						res.json({user: result.rows[0]})
					}
				})
			})
		}
	});
	app.post('/api/acceptSettings', async function (req, res) {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let str = `UPDATE USERS SET first_name='${req.body.first_name}',
										last_name='${req.body.last_name}',
										password='${req.body.password}',
										email='${req.body.username}',
										status='${req.body.status}',
										datebirthday='${req.body.birthday}',
										country='${req.body.country}',
										about='${req.body.about}' WHERE email='${req.body.username}'`;
		console.log(str);
		pool.connect((err, client, done) => {
			client.query(str, (err, result) => {
				done();
				if (err) throw err
				else {
					console.log('ДАННЫЕ ОБНОВЛЕНЫ!');
					res.json({message: 'Settings was update'});
				}
			})
		})
	});
	app.post('/api/setFollowing', async function (req, res) {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
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
						// done();
						if (err) throw err;
						client.query(`UPDATE USERS SET subscribtionscount=subscribtionscount+1 WHERE email='${subscriber}'`, (err, result) => {
							if (err) throw err;
							client.query(`UPDATE USERS SET subscriberscount=subscriberscount+1 WHERE email='${username}'`, (err, result) => {
								done();
								if (err) throw err;
								console.log('ДОБАВЛЕН ПОДПИСЧИК');
								res.json({errorCode: 0});
							})
						})
					});
			});
		} else {
			// if we need to delete column
			let str = `DELETE FROM USERS_SUBSCRIBERS WHERE username = '${username}' AND subscriber='${subscriber}'`;
			pool.connect(function (err, client, done) {
					client.query(str, (err, result) => {
						// done();
						if (err) throw err;
						client.query(`UPDATE USERS SET subscribtionscount=subscribtionscount-1 WHERE email='${subscriber}'`, (err, result) => {
							if (err) throw err;
							client.query(`UPDATE USERS SET subscriberscount=subscriberscount-1 WHERE email='${username}'`, (err, result) => {
								done();
								if (err) throw err;
								console.log('УДАЛЕН ПОДПИСЧИК');
								res.json({errorCode: 0});
							})
						})
					});
			});
		}


	})
	app.get('/api/getImagePost/:username/:post_id', (req, res) => {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let username = req.params.username;
		let post_id = req.params.post_id.slice(0, req.params.post_id.indexOf('@'));
		// let username = req.params.id.slice(0, req.params.id.indexOf('@'));
		console.log('ПРИВЕТ ПРИВЕТ ПРИВЕТ')
		let fileName = path.join(__dirname, '/public/build/image_post', username + '_' + post_id);
		if (fs.existsSync(fileName + '.jpg')) {
			res.sendfile(fileName + '.jpg');
		} else res.sendfile(fileName + '.png');
		// res.sendfile();
		// if (fs.existsSync(path.join(__dirname, '/public/avatars', username))) {
		// 	res.sendfile(path.join(__dirname, '/public/avatars', username));
		// } else {
		// 	if (username) res.sendfile(path.join(__dirname, '/public/avatars', 'default.jpg'));
		// }
	});

	app.post('/api/uploadImagePost/:id', (req, res) => {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		console.log('---------------------------------------------------------------', req.params);
		pool.connect((err, client, done) => {
			client.query(`UPDATE USER_POSTS SET imagecount=1 where username='${req.user.email}' AND post_id=${req.params.id}`, (err, result) => {
				if (err) throw err;
				done();
			})
		});
		let com_img = (INPUT_PATH, OUTPUT_PATH) => {
			console.log('OP = ' + OUTPUT_PATH)
			compress_images(INPUT_PATH, OUTPUT_PATH, {compress_force: false, statistic: true, autoupdate: true}, false,
																											{jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
																											{png: {engine: 'pngquant', command: ['--quality=20-50']}},
																											{svg: {engine: 'svgo', command: '--multipass'}},
																											{gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, function(error, completed, statistic){
											console.log('-------------');
											console.log(error);
											console.log('completed ' + completed);
											console.log(statistic);
											console.log('-------------');

									return res.json({message: 'NICE'})
				});
		}
		let fullUpload = (INPUT_PATH, OUTPUT_PATH) => {
			uploadImagePost(req, res, function (err) {
				console.log('ЗАГРУЗИЛИ ДЕФОЛТ');
				if (err instanceof multer.MulterError) {
					return res.json({message: err})
				} else if (err) {
					 return res.json({message: err})
				}
				let expansion;
				if (fs.existsSync(INPUT_PATH + `.jpg`)) {
					expansion = '.jpg'
				} else expansion = '.png';
				com_img(INPUT_PATH + expansion, OUTPUT_PATH );
			})
		}
		let fileName = req.user.email.replace(/\s+/g,'') + '_' + req.params.id;
		let INPUT_PATH = path.join(__dirname, `public/image_post/${fileName}`);
		// let INPUT_PATH = path.join(__dirname,`public/avatars/justdoit.jpg`);
		let OUTPUT_PATH = path.join(__dirname, 'public/build/image_post/');
		// console.log('req   ==' ,req)
		fullUpload(INPUT_PATH, OUTPUT_PATH);
		// let nameFile = req.user.email + '_' + req.params.id;
		// uploadImagePost(req, res, function (err) {
		// 			console.log(err);
		// 			 if (err instanceof multer.MulterError) {
		// 				 return res.json({message: err})
		// 			 } else if (err) {
		// 					return res.json({message: err})
		// 			 }
		// 	return res.json({message: 'NICE'})
		// });
	})
	app.post('/api/newPostValue', async function (req, res)  {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let data = new Date();
		let DATA_POST = data.getHours()+ ':' + data.getMinutes()  + ', '  + data.getUTCDate() + '.' + parseInt(data.getUTCMonth() + 1).toString() + '.' + data.getFullYear();
		console.log('req = ', req.user);
		let str = `INSERT INTO user_posts VALUES ('${req.user.email}', '3', '${req.body.newPostValue}', '0', '${DATA_POST}', ${Date.now()})`;
		console.log('str = ' + str)
		// pool.connect(function (err, client, done) {
		// 		client.query(str, (err, result) => {
		// 			done();
		// 			console.log('YA V QUERY');
		// 			console.log(err);
		// 			if (err) {
		// 				res.json(err)
		// 			} else {
		// 				console.log(result)
		// 				let newPost = [{
		// 					text: req.body.newPostValue,
		// 					publicdata : DATA_POST
		// 				}];
		// 				res.json({data: 'Posts was created', posts : newPost});
		// 			}
		// 		});
		// });
		pool.connect((err, client, done) => {
			if (err) throw err;
			client.query(`SELECT postscount FROM USERS WHERE EMAIL='${req.user.email}'`, (err, result) => {
				if (err) throw err;
				let postsCount = parseInt(result.rows[0].postscount);
				let data = new Date();
				let DATA_POST = data.getHours()+ ':' + data.getMinutes()  + ', '  + data.getUTCDate() + '.' + parseInt(data.getUTCMonth() + 1).toString() + '.' + data.getFullYear();
				let str = `INSERT INTO user_posts VALUES ('${req.user.email}', '${postsCount + 1}', '${req.body.newPostValue}', '0', '${DATA_POST}', '0', ${Date.now()})`;
				client.query(str, (err, result) => {
					if (err) throw err;
					client.query(`UPDATE USERS SET POSTSCOUNT=POSTSCOUNT+1 WHERE EMAIL='${req.user.email}'`, (err, result) => {
						done();
						if (err) throw err;
						let newPost = [{
								text: req.body.newPostValue,
								publicdata : DATA_POST,
								id: postsCount + 1
							}];
						console.log('newPost = ', newPost)
						res.json({data: 'Posts was created', posts : newPost, post_id: newPost[0].id});
					})
				})
			});
		})
	})
	app.post('/api/likePost', (req, res) => {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		// console.log('НУ ДА ХОТЯТ ЛАЙКНУТЬ ПОСТ')
		let profile_id = req.body.username;
		let post_id = req.body.post_id;
		let username = req.user.email;
		let likesCount = req.body.likesCount;
		console.log(req.body);
		pool.connect((err, client, done) => {
			if (err) throw err;
			client.query(`SELECT * FROM POSTS_LIKES WHERE username='${profile_id}' AND post_id=${post_id} AND liker='${username}'`, (err, result) => {
				if (err) throw err;
				if (result.rows.length == 0) { // IF WE DON'T LIKE IT EARLEY
								client.query(`UPDATE USER_POSTS SET likescount=likescount+1 WHERE username='${profile_id}' AND post_id=${post_id}`, (err, result) => {
									if (err) throw err;
									client.query(`INSERT INTO POSTS_LIKES VALUES ('${profile_id}', ${post_id}, '${username}')`, (err, result) => {
										if (err) throw err;
										client.query(`UPDATE USERS SET likescount=likescount+1 WHERE email='${profile_id}'`, (err, result) => {
											if (err) throw err;
											done();
											res.json({message: "POSTS WAS LIKED"});
										})
									});
								});
				} else {
								client.query(`UPDATE USER_POSTS SET likescount=likescount-1 WHERE username='${profile_id}' AND post_id=${post_id}`, (err, result) => {
									if (err) throw err;
									client.query(`DELETE FROM POSTS_LIKES WHERE username='${profile_id}' AND post_id=${post_id} AND liker='${username}' `, (err, result) => {
										if (err) throw err;
										client.query(`UPDATE USERS SET likescount=likescount-1 WHERE email='${profile_id}'`, (err, result) => {
											if (err) throw err;
											done();
											res.json({message: "POSTS WAS DISLIKED"});
										})
									});
								});
				}
			});
		});
	});
	app.post('/api/sendComment', (req, res) => {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let profile_id = req.body.profile_id;
		let post_id = req.body.post_id;
		let commentText = req.body.commentText;
		let commentator = req.user.email;
		pool.connect((err, client, done) => {
			if (err) throw err;
			client.query(`INSERT INTO POSTS_COMMENTS VALUES('${profile_id}', ${post_id}, '${commentator}', '${commentText}')`, (err, result) => {
				if (err) throw err;
				// done();
				client.query(`UPDATE USER_POSTS SET commentscount=commentscount+1 WHERE username='${profile_id}' AND post_id=${post_id}`, (err, result) => {
					if (err) throw err;
					done();
					res.json({
						newComment: {
							commentator: commentator,
							commenttext: commentText,
							username: profile_id
							}
						});
				});
			});
		});
	})
	app.post('/api/getComments', (req, res) => {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let profile_id = req.body.profile_id;
		let post_id = req.body.post_id;
		pool.connect((err, client, done) => {
			if (err) throw err;
			client.query(`SELECT * FROM POSTS_COMMENTS WHERE username='${profile_id}' AND post_id=${post_id}`, (err, result) => {
				if (err) throw err;
				done();
				console.log('ВОТ КОММЕНТЫ ', result.rows);
				res.json({comments: result.rows});
			})
		});
	})
	app.post('/api/getNews', (req, res) => {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let authenticatedUser = req.user.email;
		let limitN = req.body.limitN;
		let lastDatePost = req.body.lastDatePost;
		let start = req.body.start;
		pool.connect((err, client, done) => {
			if (err) throw err;
			let expression = start ? '<=' : '>';
			console.log('expression = ' + expression);
			client.query(` SELECT * FROM USER_POSTS WHERE USERNAME IN (SELECT USERNAME FROM USERS_SUBSCRIBERS WHERE
			SUBSCRIBER='${authenticatedUser}') AND DATEINT ${expression} ${lastDatePost}
			ORDER BY DATEINT DESC LIMIT ${limitN} `, (err, result) => {
				if (err) throw err;
				// done();
				// console.log('Я ОТПРАВИЛ НОВОСТИ')
				// res.json({posts: result.rows});
				let postsCount = result.rows.length;
				let ans = [];
				for (let i = 0; i < postsCount; i++) {
					let post = result.rows[i];
					client.query(`SELECT * FROM POSTS_LIKES WHERE username='${post.username}' AND post_id=${post.post_id} AND liker='${req.user.email}'`, (err, result) => {
						if (err) throw err;
						post.liked = (result.rows.length == 0) ? false : true;
						ans.push(post);
						if (i == postsCount - 1) {
							done();
							console.log(ans)
							res.json({posts: ans});
						}
					});
				}
				if (postsCount == 0) {
					done();
					res.json({posts: []});
				}
			});//end
		});
	});
	app.get('/api/logout', function(req, res){
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
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

	app.get('/api/getDialogs', (req, res) => {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let authenticatedUser = req.user.email.replace(/\s+/g,'');
		pool.connect((err, client, done) => {
			if (err) throw err;
			client.query(`SELECT username_secondary FROM DIALOGS WHERE username_main='${authenticatedUser}'`, (err, result) => {
				if (err) throw err;
				done();
				console.log('ДИАЛОГИ С ', result.rows)
				res.json({dialogs: result.rows})
			})
		})
	});

	app.post('/api/getMessages', (req, res) => {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let authenticatedUser = req.user.email.replace(/\s+/g,'');
		let member_user = req.body.id;
		console.log(authenticatedUser,' ', member_user)
		pool.connect((err, client, done) => {
			if (err) throw err;
			client.query(`SELECT * FROM MESSAGES WHERE (user_to='${authenticatedUser}' AND user_from='${member_user}')OR
			(user_to='${member_user}' AND user_from='${authenticatedUser}')`, (err, result) => {
				if (err) throw err;
				// done();
				console.log('СОБЩЕНИЯ - ', result.rows)
				res.json({messages: result.rows});
			})
		});
	})
	app.post('/api/getNewMessages', (req,res) => {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let user_to = req.body.id;
		let user_from = req.user.email.replace(/\s+/g,'');
		let lastDate = req.body.lastDate;

		pool.connect((err, client, done) => {
			if (err) throw err;
			client.query(`SELECT * FROM MESSAGES WHERE ((user_to='${user_to}' AND user_from='${user_from}')OR
			(user_to='${user_from}' AND user_from='${user_to}')) AND dateint > ${lastDate} `, (err, result) => {
				if (err) throw err;
				done();
				console.log(user_to,' ', user_from, '  ',result.rows)
				res.json({newMessages: result.rows})
			});
		})
	});
	app.post('/api/sendMessage', (req, res) => {
		res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		console.log(req.body);
		let text = req.body.text;
		let user_to = req.body.user_to;
		let user_from = req.user.email.replace(/\s+/g,'');
		let messagesCount = req.body.messagesCount;
		pool.connect((err, client, done) => {
			let data = new Date();
			let DATA_MESSAGE = data.getHours()+ ':' + data.getMinutes()  + ', '  + data.getUTCDate() + '.' + parseInt(data.getUTCMonth() + 1).toString() + '.' + data.getFullYear();
			if (err) throw err;
			client.query(`INSERT INTO MESSAGES VALUES('${user_to}', '${user_from}', '${text}', ${Date.now()}, '${DATA_MESSAGE}')`, (err, result) => {
				if (err) throw err;
				res.json({data: 'SEND ACCESS'})
				if (messagesCount == 0) {
					client.query(`INSERT INTO DIALOGS VALUES('${user_to}', '${user_from}')`, (err, result) => {
						if (err) throw err;
						client.query(`INSERT INTO DIALOGS VALUES('${user_from}', '${user_to}')`, (err, result) => {
							if (err) throw err;
							done();
							console.log('СОЗДАЛСЯ ДИАЛОГ!')
						});
					});
				} else done();
			})
		})
		// res.json({data: 'hello'})
	})
	app.post('/api/signup',	passport.authenticate('local', {failureRedirect: '/failureLogin'}), function (req, res) {
	res.header('Access-Control-Allow-Origin', `http://${MY_IP}:3000`);
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
					if (err) throw err;
					client.query('SELECT  first_name, last_name,  email, password FROM users WHERE email=$1', [username], function(err, result) {
						donePool();
						// console.log('ТО Я КАРОЧЕ В ПАСПОРТЕ ДАТУ ПОЛУЧИЛ ', result.rows[0]);
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
