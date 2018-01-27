var input = document.getElementById("txtIn");
var vowels = "eiouyåäöEIOUYÅÄÖ";
var replacement = "a";

function startReplacement(){
  replace(input.value, document.getElementById("txtOut"));
}

function reverse(text, output){
    output.value = "";
    var i = 0;

    var loop = setInterval(function(){
    
    //If current char is vowel
    if(vowels.substring(text.charAt(i) !== -1){

    }

      output.value += text.charAt(i);

      i++;
      if(i >= text.length){
        clearInterval(loop);
      }
    }, 0);    
}