var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: 'yeshusingh',
    database: 'yeshusingh',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

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
                    ${date.toDateString()}
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
            <script type="text/javascript" src="/ui/mainComment.js">
            </script>
        </body>
    </html>
    `;
    return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    //return hashed.toString('hex');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res) {
   var hashedString = hash(req.params.input, 'This-is-some-random-string');
   res.send(hashedString);
});

app.post('/create-user', function(req, res) {
    
    
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('insert into "yuser" (username, password) values ($1, $2)', [username, dbString], function (err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send('User successfully created: ' + username);
        }
    });
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    pool.query('select * from test', function (err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/mainComment.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'mainComment.js'));
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

app.get('/articles/:articleName', function(req, res) {
    //res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
    var articleName = req.params.articleName;
    
    pool.query("select * from yarticle where title = $1", [req.params.articleName], function(err, result) {
       if (err) {
           res.status(500).send(err.toString());
       } else {
           if(result.rows.length === 0) {
               res.status(404).send('Article not found');
           } else {
               var articleData = result.rows[0];
               res.send(createTemplate(articleData));
           }
       }
    });
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
