/**
 * Created by sunsu on 2016/9/28.
 */
import React,{Component} from 'react'

export default class SliderItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {count,item} = this.props;
        let width = 100/count +'%';
        return (
            <li className="slider-item" style={{width:width}}>
                <a href={item.href}><img src={item.src} /></a>
            </li>
        )
    }
}