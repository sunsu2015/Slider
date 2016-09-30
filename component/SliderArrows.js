/**
 * Created by sunsu on 2016/9/28.
 */
import React ,{Component} from 'react';

export default class SliderArrows extends Component{
    constructor(props){
        super(props);
    }
    handleClick(option){
        this.props.turn(option)
    }
    render(){
        return (
            <div className="slider-arrow-wrap">
                <span
                    className="slider-arrow slider-arrow-left"
                    onClick={()=>this.handleClick(-1)}
                >
                    &lt;
                </span>
                <span
                    className="slider-arrow slider-arrow-right"
                    onClick={()=>this.handleClick(1)}
                >
                    &gt;
                </span>
            </div>
        )
    }
}