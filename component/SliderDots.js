/**
 * Created by sunsu on 2016/9/28.
 */
import React ,{Component} from 'react';

export default class SlideDots extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let dotNodes = [];
        let {count,activeIndex} = this.props;

        for(let i=0;i<count;i++){
            dotNodes.push(
                <span
                    key={i}
                    className={"slider-dot" + ((i==(activeIndex%count))?" slider-dot-active":(i==2 && activeIndex==-1?" slider-dot-active":""))}
                ></span>
            );
        }
        return (
            <div className="slider-dots-wrap">
                {dotNodes}
            </div>
        );
    }
}