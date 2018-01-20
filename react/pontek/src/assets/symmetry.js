import React, { Component } from 'react';

class Symmetry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lines: [],
        }

        for (var i = 0; i < 12; i++) {
            this.state.lines.push({
                alpha: 255,
                stroke: '#61DAFBFF',
            });
        }
    }

    animate() {
    
        setInterval(() => {
            let lines = this.state.lines;
            for (var i = 0; i < lines.length; i++) {
                lines[i].stroke = 'rgba(255,255,255,' + lines[i].alpha + ')';
            }

            this.setState({lines});
        }, 500);
    }

    render() {
        this.lines = [];
        return (
            <svg className="" xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000">
                <g strokeWidth="2">
                    <line x1="350" y1="20" x2="230" y2="200" stroke={this.state.lines[0].stroke} />
                    <line x1="230" y1="200" x2="500" y2="620" stroke={this.state.lines[1].stroke}/>
                    <line x1="230" y1="200" x2="500" y2="410" stroke={this.state.lines[2].stroke}/>
                    <line x1="230" y1="200" x2="650" y2="20" stroke={this.state.lines[3].stroke}/>
                    <line x1="350" y1="20" x2="500" y2="410" stroke={this.state.lines[4].stroke}/>
                    <line x1="350" y1="20" x2="650" y2="20" stroke={this.state.lines[5].stroke}/>
                    <line x1="350" y1="20" x2="770" y2="200" stroke={this.state.lines[6].stroke}/>
                    <line x1="650" y1="20" x2="500" y2="410" stroke={this.state.lines[7].stroke}/>
                    <line x1="770" y1="200" x2="500" y2="410" stroke={this.state.lines[8].stroke}/>
                    <line x1="650" y1="20" x2="770" y2="200" stroke={this.state.lines[9].stroke}/>
                    <line x1="770" y1="200" x2="500" y2="620" stroke={this.state.lines[10].stroke}/>
                    <line x1="500" y1="410" x2="500" y2="620" stroke={this.state.lines[11].stroke}/>
                </g>
            </svg>
        );
    }
}

export default Symmetry;