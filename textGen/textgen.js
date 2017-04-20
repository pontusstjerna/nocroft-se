/*#include <stdio.h>
#include <stdlib.h>

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

var testString = "I like potatoes.";
alert(generate(testString));

generate = function(text){
    var c;
    var i;
    var eqsofar;
    var nextp;
    var k = 3;
    var p = 0;
    var newString = "";
    for(max = 2000; max > 0; max--){
      eqsofar = 0;
      for(q = 0; q < text.length - k + 1; q++){
        for(i = 0; i < k && text.charAt(p + i) == text.charAt(q + i); i++);
        if(i == k){
          if(Math.floor(Math.random()*100) % eqsofar == 0){
            nextp = q;
          }
          eqsofar++;
        }
      }
      if(nextp + k >= text.length){
        break;
      } 
      c = text.charAt(nextp + k);
      newString += c;
      p = nextp + 1;
    }

    return newString;
}