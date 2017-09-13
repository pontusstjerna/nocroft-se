/*
Pseudocode by Pontus

C = set of circles sorted by longest distance to origin
let H = boolean array of same length as C, set all false
let S = {}

for i = 0 to sizeof(C) - 1 loop
    if not H[i] then
        H[i] = true
        let r = ray from origin to origin of C[i]
        for j = i to sizeof(C) - 1
            if intersect(r, C[j]) then
                H[j] = true
                add r to S
            end if
        end loop
    end if
end loop
*/