var express = require('express'); 
var path= require('path'); 
var connectDB= require('./DB/connection');  
var bodyParser = require('body-parser') 
var session = require('express-session'); 
//var expressvalidator = require('express-validator');
var cookieParser = require('cookie-parser'); 
var flash = require('connect-flash');
//const flash = require('req-flash')

var fileupload = require('express-fileupload')
const adminroute= require('./routes/admin');  
const adminproductroute = require('./routes/products');




//init app 
var app = express();  
connectDB();


//static folder
app.use(express.static('public'))
//fileupload middleware 
app.use(fileupload());

app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 6000 }}));
app.use(flash());

//flash message middleware
app.use((req, res, next)=>{
  res.locals.message = req.session.message
  delete req.session.message
  next()
})

//view engine 
app.set('views',path.join(__dirname,'views')) ;
app.set('view engine','ejs');
//home
app.get('/',function(req,res){
  res.render('index',{
    title:'home'
  } )
})  

app.use('/admin',adminroute); 
app.use('/admin/products',adminproductroute);


  
//start server   
app.listen(3000,()=>{
    console.log('server started')
})


//sessions 
/*
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))  */ 
    // validation    
/* 

  <% Object.keys(messages).forEach(function (type) { %>
      <div class="alert alert-<%= type %>">
      <% messages[type].forEach(function (message) { %>
        <%= message %>
      <% }) %>
      </div>
    <% }) %>

app.use(expressvalidator({
  errorFormatter: function(param,msg,value) {
    var namespace=param.split('.')
    ,root = namespace.shift()
    ,formParam = root; 
    while(namespace.length) {
      formParam += '[' + namespace.shift() +']';
    }
    return {
      param:formParam,
      msg:msg,
      value:value
    };
  }
})) 
*/
  //flash messages
/*
app.use(bodyParser.urlencoded({ extended: false })); 

app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }})) 
app.use(flash());


  app.use(require('connect-flash')());
  app.use(function (req,res,next){
    res.locals.messages = req.session.messages 
  //  delete req.session.messages
    next();
  
  }); */