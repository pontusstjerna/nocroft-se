document.getElementById("btnReverse").onclick = startReversion;
var input = document.getElementById("txtIn");
var output = document.getElementById("txtOut");

function startReversion(){
  reverse(input.value);
}

function reverse(text){
    output.value = "";
    var i = text.length;

    var loop = setInterval(function(){
      i--;

      output.value += text.charAt(i);

      if(i <= 0){
        clearInterval(loop);
      }
    }, 0);    
}