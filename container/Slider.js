/**
 * Created by sunsu on 2016/9/28.
 */
import React ,{Component} from 'react'
import SliderItem from '../component/SliderItem'
import SliderDots from '../component/SliderDots'
import SliderArrows from '../component/SliderArrows'
require('./Slider.scss');
export default class Slider extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex :1
        };
    }
    componentWillMount(){
        this.speed = this.props.speed;
        this.autoPlayFlag;
        this.startX = 0;
        this.endX = 0;
        this.moveX = 0;
    }
    turn(n){
        if(n==-1){
            if(this.state.activeIndex == this.props.items.length+2-1){
                this.setState({'activeIndex':0});
                console.log('改变activeIndex:',0);
                return ;
            }
        }
        if(n==1){
            if(this.state.activeIndex == 0){
                this.setState({'activeIndex':this.props.items.length+2-1});
                console.log('改变activeIndex:',this.props.items.length+2-1);
                return ;
            }
        }
        let _n = parseInt(n+this.state.activeIndex) ==this.props.items.length+2 || parseInt(n+this.state.activeIndex) ==-1?2:n+this.state.activeIndex;
        this.setState({'activeIndex':_n});
        console.log('改变activeIndex:',_n);
    }
    autoPlay(){
        if(this.props.autoplay){
            this.autoPlayFlag = setInterval(()=>
                {this.turn(1)},this.props.delay*1000
            );
        }
    }
    pausePlay(){
        clearInterval(this.autoPlayFlag);
    }

    componentDidMount() {
        this.autoPlay();
    }
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps');
    }
    render(){

        document.getElementsByClassName('slider')[0] && (document.getElementsByClassName('slider')[0].querySelector('ul').style.transitionDuration = this.props.speed + "s");
        let count = this.props.items.length+2;
        let itemNodes = this.props.items.map((item,index)=>{
            return <SliderItem item={item} count={count} key={index} />
        });
        //前后各加一个，在第一张banner前加最后一个，在最后一个banner前加第一个
        // itemNodes = itemNodes[itemNodes.length-1].concat(itemNodes);
        itemNodes.push(Object.assign({},itemNodes[0],{key:itemNodes.length}));
        itemNodes.unshift(Object.assign({},itemNodes[itemNodes.length-2],{key:-1}));
        console.log('render会延时渲染')
        console.log('render activeIndex:',this.state.activeIndex);
        return (
            <div
                className="slider"
                onMouseOver={this.props.pause?this.pausePlay.bind(this):null}
                onMouseOut={this.props.pause?this.autoPlay.bind(this):null}
                onTouchStart={(e)=>{
                    this.startX = e.touches[0].pageX;
                    this.props.pause?this.pausePlay.bind(this):null;
                }}
                onTouchMove={(e)=>{
                    this.endX = e.touches[0].pageX;
                    document.getElementsByClassName('slider')[0].querySelector('ul').style.transitionDuration = '0s';
                    document.getElementsByClassName('slider')[0].querySelector('ul').style.left =
                        parseFloat(document.getElementsByClassName('slider')[0].querySelector('ul').style.left)+((this.endX-this.startX)/window.screen.width*100)+'%';
                    this.moveX = this.endX-this.startX;
                    this.startX = this.endX;
                }}
                onTouchEnd={(e)=>{
                    document.getElementsByClassName('slider')[0].querySelector('ul').style.transitionDuration = Math.abs(((this.endX-this.startX)/window.screen.width).toFixed(2))+'s';
                    let _this = this;
                    if(this.moveX<0){
                        this.turn(1);
                    }
                    if(this.moveX>0){
                        this.turn(-1);
                    }
                    setTimeout(function(){
                        _this.props.pause?_this.autoPlay.bind(_this):null;
                    },300);
                    console.log(this.moveX)
                }}
            >
                <ul style={{
                    left: -100 * this.state.activeIndex + "%",
                    transitionDuration: this.speed + "s",
                    width: count * 100 + "%"
                }}>
                    {itemNodes}
                </ul>
                {this.props.arrows?(<SliderArrows turn={(i)=>this.turn(i)}></SliderArrows>):null}

                {this.props.dots?(<SliderDots count={count-2} activeIndex={this.state.activeIndex-1}></SliderDots>):null}
            </div>
        )
    }
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps activeIndex:',this.state.activeIndex);
    }
    componentDidUpdate(){
        if(this.state.activeIndex==0 || this.state.activeIndex==4){
            let _this = this;
            setTimeout(function(){
                console.log('延时改变DOM执行',_this.state.activeIndex);
                document.getElementsByClassName('slider')[0].querySelector('ul').style.transitionDuration = '0s';
                document.getElementsByClassName('slider')[0].querySelector('ul').style.left = (_this.state.activeIndex==0?-300:-100)+'%';
            },850);
        }
    }
}

Slider.defaultProps = {
    speed: 1,
    delay: 2,
    pause: true,
    autoplay: true,
    dots: true,
    arrows: true,
    items: []
};

Slider.autoPlayFlag = null;