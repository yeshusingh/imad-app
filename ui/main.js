console.log('Loaded!');


var button = document.getElementById('counter');
//var counter = 0;
button.onclick = function () {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        //console.log('test1');
        console.log(`${request.status}`);
        
        if(request.readyState === XMLHttpRequest.DONE) {
            
            console.log('ready state');
            
            if (request.status === 200) {
                console.log('req success');
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

