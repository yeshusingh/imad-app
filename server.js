var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' : {
        title: 'Article One | Yeshu',
        date: 'September 2017',
        heading: 'Article One',
        content: `    <p>
                        This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. 
                    </p>
                     <p>
                        This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. This is content of my first article.This is content of my firt article. 
                    </p>`
    },
    'article-two' : {
        title: 'Article Two | Yeshu',
        date: 'September 2017',
        heading: 'Article Two',
        content: `    <p>
                        This is content of my second article. 
                    </p>`
    },
    'article-three' : {
        title: 'Article Three | Yeshu',
        date: 'September 2017',
        heading: 'Article Three',
        content: `    <p>
                        This is content of my third article. 
                    </p>`
    }
};

function createTemplate (data) {
    
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
                    <hr/>
                    <input type="text" id="comment" placeholder="enter comment"></input>
                    <input type="submit" value="Submit" id="submit_comment"></input>
                    <ul id="commentlist">
                        
                    </ul>
                </div>
            </div>
        // <script type="text/javascript" src="/ui/mainComment.js">
        // </script>
        <script>
            console.log('mainComment');

            var submitComment = document.getElementById('submit_comment');
            submitComment.onclick = function() {
              
              var request = new XMLHttpRequest();
                
                request.onreadystatechange = function () {
                    //console.log(`${request.status}`);
                    
                    if(request.readyState === XMLHttpRequest.DONE) {
                        if (request.status === 200) {
                              var comments = request.responseText;
                              comments = JSON.parse(comments);
                              var list = '';
                              for(var i=0; i<comments.length; i++) {
                                  list += '<li>' + comments[i] + '</li>';
                              }
                              var ul = document.getElementById('commentlist');
                              ul.innerHTML = list; 
                        }
                    }
                };
                
                var commentInput = document.getElementById('comment');
                var comment = commentInput.value;
                request.open('GET', 'http://yeshusingh.imad.hasura-app.io/article-one1?comment='+ comment, true);
                request.send(null);
            };
        </script>
        </body>
    </html>
    `;
    return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names = [];
app.get('/submit-name', function(req, res) {
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
}) ;

var comments = [];
app.get('/article-one1', function(req, res) {
    var comment = req.query.comment;
    comments.push(comment);
    res.send(JSON.stringify(comments));
}) ;

app.get('/:articleName', function(req, res) {
    //res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

// app.get('/article-two', function(req, res){
//     res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
// });

// app.get('/article-three', function(req, res){
//     res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
// });

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
