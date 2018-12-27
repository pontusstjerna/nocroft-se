var input = document.getElementById("txtIn");
var vowels = "aeiouyåäöAEIOUYÅÄÖ";

function startTranslation(){
    translate(input.value, document.getElementById("txtOut"));
}

function translate(text, output){
    output.value = "";

    var words = text.split(" ");
    var i = 0;

    var loop = setInterval(function(){
      
      var word = words[i].toLowerCase();
      var newWord = "";

      var sndHalfIndex = 0;
      for(sndHalfIndex = 0; sndHalfIndex < word.length && vowels.indexOf(word.charAt(sndHalfIndex)) === -1; sndHalfIndex++);
      sndHalfIndex++;

      if(sndHalfIndex <= word.length){
        if(i > 0){
            newWord = " ";

            //There exists a dot
            if(words[i-1].endsWith(".")){
                newWord = "Fi";
            }else{
                newWord = "fi";
            }
        }

        if(i === 0){
            newWord = "Fi";
        }

        var dot = " ";

        
        for(j = sndHalfIndex; j < word.length; j++){
            if(word[j] != "."){
                newWord += word[j];
            }else{
                dot = ".";
            }
        }

        for(j = 0; j < sndHalfIndex; j++){
            newWord += word[j];
        }

        newWord += "kon" + dot;

        output.value += newWord;

      }
    
        i++;
      if(i >= words.length){
        clearInterval(loop);
      }
    }, 0);    
}