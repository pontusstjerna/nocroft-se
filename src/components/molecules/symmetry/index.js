import React, { Component } from 'react';

import { colors } from './colors';

class Symmetry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lines: [],
            currentColor: 0,
        }

        for (var i = 0; i < 12; i++) {
            this.state.lines.push({
                color: {...colors[this.state.currentColor]},
                speed: 6,
                stroke: '#61DAFBFF',
            });
        }
    }

    componentDidMount() {
        this.animate();
    }

    changeColor() {
        let newColor =  (this.state.currentColor + 1) % colors.length;
        let lines = this.state.lines;
        for (var i = 0; i < lines.length; i++) {
            lines[i].color = {...colors[newColor]};
        }

        this.setState({
            currentColor: newColor,
            lines
        });
    }

    animate() {
    
        setInterval(() => {
            let lines = this.state.lines;
            for (var i = 0; i < lines.length; i++) {
                this.changeAlpha(lines[i]);
                let color = lines[i].color;
                lines[i].stroke = 'rgba(' +
                    color.r + ',' +
                    color.g + ',' +
                    color.b + ',' +
                    color.a / 255.0 + ')';
            }

            this.setState({lines});
        }, 30);
    }

    changeAlpha(line) {
        line.color.a += line.speed;
        
        if (line.color.a > 250) {
            line.speed = -Math.floor(Math.random() * 6);
        } else if (line.color.a < 10) {
            line.speed = Math.floor(Math.random() * 12);
        }
    }

    render() {
        this.lines = [];
        const { strokeWidth } = this.props;
        return (
            <svg
                className="m-symmetry" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 540 700"
                onClick={() => this.changeColor()}
                >
                <g strokeWidth={strokeWidth ? strokeWidth : 2}>
                    <line x1="120" y1="0" x2="0" y2="180" stroke={this.state.lines[0].stroke} />
                    <line x1="0" y1="180" x2="270" y2="600" stroke={this.state.lines[1].stroke}/>
                    <line x1="0" y1="180" x2="270" y2="390" stroke={this.state.lines[2].stroke}/>
                    <line x1="0" y1="180" x2="420" y2="0" stroke={this.state.lines[3].stroke}/>
                    <line x1="120" y1="0" x2="270" y2="390" stroke={this.state.lines[4].stroke}/>
                    <line x1="120" y1="0" x2="420" y2="0" stroke={this.state.lines[5].stroke}/>
                    <line x1="120" y1="0" x2="540" y2="180" stroke={this.state.lines[6].stroke}/>
                    <line x1="420" y1="0" x2="270" y2="390" stroke={this.state.lines[7].stroke}/>
                    <line x1="540" y1="180" x2="270" y2="390" stroke={this.state.lines[8].stroke}/>
                    <line x1="420" y1="0" x2="540" y2="180" stroke={this.state.lines[9].stroke}/>
                    <line x1="540" y1="180" x2="270" y2="600" stroke={this.state.lines[10].stroke}/>
                    <line x1="270" y1="390" x2="270" y2="600" stroke={this.state.lines[11].stroke}/>
                </g>
            </svg>
        );
    }
}

export default Symmetry;