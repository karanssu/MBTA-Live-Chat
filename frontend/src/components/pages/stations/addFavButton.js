function addFav(){
    var ul = document.getElementById('lang');
    var li = document.createElement('li');
    var text = document.createTextNode('PHP');
    li.appendChild(text);
    ul.appendChild(li);
}