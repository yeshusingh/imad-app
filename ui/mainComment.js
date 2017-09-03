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
