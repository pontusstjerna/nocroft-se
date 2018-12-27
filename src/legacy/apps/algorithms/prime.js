document.getElementById("btnRunPrime").onclick = runPrime;

function runPrime() {
    var n = document.getElementById("primeNum").value;
    document.getElementById("primeResult").innerHTML = "Result: " + prime(parseInt(n));
}

function prime(n) {

    /*
    prime: array [1..n] of boolean = all true
for p in 2..sqrt(n) loop
    if prime[p] then
        m = p*p
        while m <= n loop
            prime[m] = false
            m = m+p
        end loop
    end if
end loop
    */

    var prime = [n];
    for(i = 1; i <= n; i++) {
        prime[i] = true;
    }

    for(p = 2; p <= Math.floor(Math.sqrt(n)); p++) {
        if(prime[p]) {
            let m = p * p;
            while (m <= n) {
                prime[m] = false;
                m = m + p;
            }
        }
    }

    return prime[prime.length-1];
}