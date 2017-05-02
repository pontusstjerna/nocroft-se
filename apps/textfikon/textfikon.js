var input = document.getElementById("txtIn");

function startTranslation(){
    translate(input.value, document.getElementById("txtOut"));
}

function translate(text, output){
    output.value = "";

    var words = text.split(" ");
    var i = 0;

    var loop = setInterval(function(){
      
      var word = words[i];
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

        if(word.length > 1){
            for(j = word.length/2; j < word.length; j++){
                newWord += word[j];
            }

            for(j = 0; j < word.length/2; j++){
                newWord += word[j];
            }

            newWord += "kon ";
        }

        output.value += newWord;

        i++;
      if(i >= words.length){
        clearInterval(loop);
      }
    }, 0);    
}