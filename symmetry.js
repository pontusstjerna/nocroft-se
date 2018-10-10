 
    var x = 1000/2;
    var y = 20;
    var scale = 30;
    var p =       [[x - 5 * scale, y],                      //0
                        [x - 9 * scale, y + 6 * scale],    //1
                        [x, y + 20 * scale],                   //2
                        [x, y + 13 * scale],                   //3
                        [x + 5 * scale, y],                     //4
                        [x + 9 * scale, y + 6 * scale]]; //5
    
    function edge(start, end) {
        this.start = start;
        this.end = end;
        this.alpha = 0;
        this.cIntervals =  
                    [100, 130,   //Red min max
                     120, 150,   //Green min max
                     200, 250]; //Blue min max
        this.rgbColor = [this.cIntervals[1], this.cIntervals[3], this.cIntervals[5]];
        this.rSpeed = 6;
        this.change = 1;
        this.speed = Math.floor(Math.random()*this.rSpeed);
        this.getRgb = function getRgb(){return 'rgb(' + this.rgbColor[0] + ','+ this.rgbColor[1] + ',' + this.rgbColor[2] + ')';}
        this.getAlpha = function getAlpha() {return this.alpha/255.0;}
        this.changeColor = 
        function changeColor(){
            for (j = 0; j < this.rgbColor.length; j++) {
                if (this.rgbColor[j] < this.cIntervals[j * 2]) {
                    this.rgbColor[j] += Math.floor(Math.random()*(this.speed + 1)) + this.speed;
                } else if (this.rgbColor[j] > this.cIntervals[j * 2 + 1]) {
                    this.rgbColor[j] -= Math.floor(Math.random()*(this.speed + 1)) + this.speed;
                } else {
                    this.rgbColor[j] += this.change * Math.floor(Math.random()*(this.speed + 1));
                }
           }

            this.alpha += this.change * this.speed;

            if (this.alpha > 250) {
                this.change = -1;
                this.speed = Math.floor(Math.random()*this.rSpeed);
            } else if (this.alpha < 10) {
                this.change = 2;
                this.speed = Math.floor(Math.random()*this.rSpeed);
            }
            
        }
        
        this.setColor = function setColor(color){

            switch (color){
                case 0: //BLUE
                    this.cIntervals = [70, 130, //Red min max
                            120, 160,  //Green min max
                            200, 250];//Blue min max};
                    break;
                case 1: //GREEN
                    this.cIntervals = [30, 50, //Red min max
                            170, 250,  //Green min max
                            100, 100];//Blue min max};
                    break;
                case 2: //RED
                    this.cIntervals = [180, 250, //Red min max
                            50, 90,  //Green min max
                            50, 90];//Blue min max;
                    break;
                case 3: //YELLOW
                    this.cIntervals = [190, 250, //Red min max
                            100, 250,  //Green min max
                            10, 80];//Blue min max};
                    break;
                case 4: //Purple
                    this.cIntervals = [140, 250, //Red min max
                            50, 120,  //Green min max
                            150, 250];//Blue min max};
                    break;
                case 5: //Cyan
                    this.cIntervals = [50, 100, //Red min max
                            100, 250,  //Green min max
                            150, 250];//Blue min max};
                    break;
            }
            this.rgbColor = [this.cIntervals[1], this.cIntervals[3], this.cIntervals[5]];
        }
    }
    
    var edges = [new edge(p[0], p[1]),
                         new edge(p[1], p[2]),
                         new edge(p[1], p[3]),
                         new edge(p[1], p[4]),
                         new edge(p[0], p[3]),
                         new edge(p[0], p[4]),
                         new edge(p[0], p[5]),
                         new edge(p[4], p[3]),
                         new edge(p[5], p[3]),
                         new edge(p[4], p[5]),
                         new edge(p[5], p[2]),
                         new edge(p[3], p[2])];
                         
    var currentColor = Math.floor(Math.random()*5);
    setNewColor();
    var currentEdge = 0;
    
    function createEdges(){
         for(i = 0; i < edges.length; i++){
            var currentLine = document.getElementById("line".concat(i));
            currentLine.setAttribute("x1",edges[i].start[0]);
            currentLine.setAttribute("y1", edges[i].start[1]);
            currentLine.setAttribute("x2",edges[i].end[0]);
            currentLine.setAttribute("y2", edges[i].end[1]);
            currentLine.style.stroke = "rgb(0,255,0)";
            currentLine.style.strokeWidth = 2;
        }
    }
    
    createEdges();
      
      function setNewColor(){
        for(h = 0; h < edges.length; h++){
                edges[h].setColor(currentColor);
        }
        currentColor = (currentColor + 1) % 6;
      }
                         
    update();

    function changeColors(){
        for(i = 0; i < edges.length; i++){
            edges[i].changeColor();
            var currentLine = document.getElementById("line".concat(i));
            currentLine.style.stroke = edges[i].getRgb();
            currentLine.style.strokeOpacity = edges[i].getAlpha();
        }
    }
    
    function update() {
        changeColors();
        setTimeout(update,20); // call doMove in 20msec
    }
    