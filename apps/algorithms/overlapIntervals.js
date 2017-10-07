document.getElementById("btnRunOverlap").onclick = runOverlap;

function runOverlap() {
    var intervals = document.getElementById("intervalsInput").value;
    document.getElementById("overlapResult").innerHTML = "Result: " + lengthIntervals2(0, eval('[' + intervals + ']'));
}

function lengthIntervals(intervals) {
    if(intervals.length === 1) {
        return intervals[0].f - intervals[0].s;
    }

    let totalLength = 0;
    for(let i = 0; i < intervals.length - 1; i++) {
        if(intervals[i].f < intervals[i + 1].f)
            totalLength += Math.min(intervals[i].f - intervals[i].s, intervals[i + 1].s - intervals[i].s);
        else 
            totalLength += intervals[i].f - intervals[i].s;
    }
    let li = intervals.length - 1;
    if(li > 0 && intervals[li].f > intervals[li -1 ].f)
        totalLength += Math.max(intervals[li].f, intervals[li - 1].f) - Math.max(intervals[li].s, intervals[li - 1].s);
    else
        totalLength += intervals[li - 1].f - intervals[li].s;

    return totalLength;
}

function lengthIntervals2(currentMax, intervals) {
    if(intervals.length === 1) { // Base case
        return  Math.max(intervals[0].f, currentMax) - Math.max(currentMax, intervals[0].s);
    }

    let currInterval = intervals[0];
    intervals.splice(0,1);
    return Math.max(currInterval.f, currentMax) - Math.max(currentMax, currInterval.s) + 
    lengthIntervals2(Math.max(currInterval.f, currentMax), intervals);
}

/*
lenIntervals(currMax, n) = max(f_n, currMax) + lenIntervals(max(f_n, currMax), n-1)
lenIntervals(currMax, 1) = max(f_n, currMax) - max(currMax, s_n)
*/