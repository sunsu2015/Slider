/**
 * Created by sunsu on 2016/9/28.
 */
import React from 'react';
import {render} from 'react-dom';
import Slider from './container/Slider';

const IMAGE_DATA = [
    {
        src:'./images/banner1.jpg',
        href:'#'
    },{
        src:'./images/banner2.jpg',
        href:'#'
    },{
        src:'./images/banner3.jpg',
        href:'#'
    }
];
let options = {
    items:IMAGE_DATA,
    speed:1,
    delay:2.1,
    pause:true,
    autoplay:true,
    dots:true,
    arrows:true
}
render(
    <Slider {...options}/>,
    document.getElementById('banner')
)