const express = require('express');
var _express2 = _interopRequireDefault(express);
const app = express();
const exphbs = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');
var pgp = require('pg-promise')(/*options*/)
var R = require('r-script');
var request = require("request");
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



// view engine setup and public static directory
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

app.get('/TryR', function (req, res, next) {
	
	//var pathR = path.resolve(__dirname)+'\\test.R';
	//console.log(pathR);
  res.render('FileUpload');
	
})

app.get('/getfilenames', function (req, res, next) {
	var plotpath = path.resolve(__dirname) + '/public/plots/';
		fs.readdirSync(plotpath).forEach(file => {
		res.render('loadimageplot',{plots : 'plots/'+file});
		})
		
})

function middlewareuploadfile (req, res, next)
{
	  var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = path.resolve(__dirname) + '/files/raw_data/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
		req.body.filepathname = newpath;
		next();
		});
	  });
	
}

app.post('/fileupload',middlewareuploadfile, function (req, res, next) {
		var plotpath = path.resolve(__dirname) + '/public/plots/';
		var out = R("./scripts/Practice2.R")
		.data({first:req.body.filepathname,second:plotpath,third:"27"})
		.callSync();
		
})

app.get('/reportget', function (req, res, next) {
try
{
	
console.log(irn);
  
var options11 = {
  url: 'http://lillynetapp1-d.am.lilly.com/sites/eksbi10/poultry/_vti_bin/reportserver?http://lillynetapp1-d.am.lilly.com/sites/eksbi10/poultry/Reports/HTSi-Ultron/DummyReport_Raza.rdl&Name=Raza&rs:Command=Render',
  method: 'GET'
}

request(options11, function (error, response, body) {
console.log(body);
res.send(body);
});
}
  catch (e) {

  }
});

app.listen(process.env.PORT || 8081, () => console.log('All is right!'))