var input = document.getElementById("txtIn");

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

        if(word.length > 1){
            for(j = Math.floor(word.length/2); j < word.length; j++){
                if(word[j] != "."){
                    newWord += word[j];
                }else{
                    dot = ".";
                }
            }

            for(j = 0; j < Math.floor(word.length/2); j++){
                newWord += word[j];
            }

            newWord += "kon" + dot;
        }

        output.value += newWord;

        i++;
      if(i >= words.length){
        clearInterval(loop);
      }
    }, 0);    
}