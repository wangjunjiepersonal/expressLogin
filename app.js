

//express

const express = require('express')
const mongoose = require('mongoose')
const SECRET = '123456'

const { User } = require('./models')

const app = express()
app.use(express.json())

//访问首页
app.get('/',async (req,res) => {
	res.send('this is Ok')
})

//访问全部用户
app.get('/api/users',async (req,res) => {
	const users = await User.find()
	res.send(users)
})

//访问注册接口
app.post('/api/register',async (req,res) => {
	const user = await User.create({
		username : req.body.username,
		password : req.body.password
	})
	
	res.send('this is Ok'+ user)
})

//访问登陆接口
app.post('/api/login',async (req,res) => {
	const user = await User.findOne({
		username:req.body.username
	})
	if (!user) {
		return res.status(422).send({
			msg:'用户名不存在'
		})
	}
	const isPassword = require('bcrypt').compareSync(req.body.password,user.password)
	if (!isPassword) {
		return res.status(422).send({
			msg:'密码错误'
		})
	}
	
	//生成token
	const jwt = require('jsonwebtoken')
	const token = jwt.sign({
		id: String(user._id)
	},SECRET)
	res.send({
		user,
		token
	})
})

//访问 个人信息
app.post('/api/profile',async (req,res) => {
	//const user = await User.findById(id)
	console.log(req.headers)
	
	res.send('this is Ok'+ user)
})


app.listen(3000,() => {
	console.log('运行在3000端口')
})
