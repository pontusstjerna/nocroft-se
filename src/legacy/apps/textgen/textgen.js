/*
Algorithm stolen from http://www.cse.chalmers.se/edu/year/2010/course/DAT026/Problems/program.c

char x[5000000];
int main()
{int c, i, eqsofar, max, n = 0, k = 3;
 char *p, *nextp, *q;
 while ((c = getchar()) != EOF)
   x[n++] = c;
 x[n] = 0;
 p = x;
 srand(1);
 for (max = 2000; max > 0; max--) {
   eqsofar = 0;
   for (q = x; q < x + n - k + 1; q++) {
     for (i = 0; i < k && *(p+i) == *(q+i); i++)
       ;
     if (i == k)
       if (rand() % ++eqsofar == 0)
	 nextp = q;
   }
   c = *(nextp+k);
   if (c == 0)
     break;
   putchar(c);
   p = nextp+1;
 }
 return 0;
}*/

document.getElementById("btnGenerate").onclick = startGeneration;
document.getElementById("btnExample").onclick = createExample;
var input = document.getElementById("txtIn");
var output = document.getElementById("txtOut");
var reqCharsInput = document.getElementById("reqChars");

function startGeneration(){
  generate(input.value);
}

function generate(text){
    var c;
    var i;
    var aquiredCharsSoFar;
    var nextp = 0;
    var requiredChars = parseInt(reqCharsInput.value);
    var p = 0;
    var newString = "";
    var max = 2000;
    output.value = "";


    var loop = setInterval(function(){
      aquiredCharsSoFar = 1;
      max--;
      for(q = 0; q < text.length - requiredChars + 1; q++){

        //Searching for k matching characters
        for(i = 0; i < requiredChars && text.charAt(p + i) === text.charAt(q + i); i++);
        if(i == requiredChars){
          if(Math.floor(Math.random()*32000) % aquiredCharsSoFar == 0){
            nextp = q;
          }
          aquiredCharsSoFar++; //Decrease chance of accepting substring
        }
      }
      c = text.charAt(nextp + requiredChars);
      output.value += c;

      p = nextp + 1;

      if(max <= 0 || nextp + requiredChars >= text.length){
        clearInterval(loop);
      }
    }, 0);    

    console.log(text.length);

    return newString;
}

function createExample(){
  input.value = example;
}