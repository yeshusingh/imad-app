console.log('Loaded!');


var button = document.getElementById('counter');
//var counter = 0;
button.onclick = function () {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        console.log(`${request.status}`);
        
        if(request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    
    // counter =  counter + 1;
    // var span = document.getElementById('count');
    // span.innerHTML = counter.toString();
    
    request.open('GET', 'http://yeshusingh.imad.hasura-app.io/counter', true);
    request.send(null);

};


var submit = document.getElementById('submit_btn');
submit.onclick = function() {
  
  var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        //console.log(`${request.status}`);
        
        if(request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                  var names = request.responseText;
                  names = JSON.parse(names);
                  var list = '';
                  for(var i=0; i<names.length; i++) {
                      list += '<li>' + names[i] + '</li>';
                  }
                  var ul = document.getElementById('namelist');
                  ul.innerHTML = list; 
            }
        }
    };
    
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET', 'http://yeshusingh.imad.hasura-app.io/submit-name?name='+ name, true);
    request.send(null);
  
  

};


// var element = document.getElementById('main-text');
// element.innerHTML = "new value";

// var img = document.getElementById('madi');
// var marginLeft = 0;
// function moveRight() {
//     marginLeft = marginLeft + 5;
//     img.style.marginLeft = marginLeft + 'px';
// }

// img.onclick = function () {
//   //img.style.marginLeft = '100px';  
//   var interval = setInterval(moveRight, 50);
// };

