var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne = {
    title: 'Article One | Yeshu',
    date: 'September 2017',
    heading: 'Article One',
    content: `    <p>
                    This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. 
                </p>
                 <p>
                    This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. 
                </p>`
};

func createTemplate(data) {
    
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>
            <div>
                ${content}
            </div>
        </div>
    </body>
    </html>
    `;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/article-one', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

app.get('/article-two', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
