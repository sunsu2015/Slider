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
        this.scroll = false;
    }
    turn(n,flag){
        let _fun = function(_this){
            if(n==-1){
                if(_this.state.activeIndex == _this.props.items.length+2-1){
                    _this.setState({'activeIndex':0});
                    console.log('改变activeIndex:',0);
                    return ;
                }
            }
            if(n==1){
                if(_this.state.activeIndex == 0){
                    _this.setState({'activeIndex':_this.props.items.length+2-1});
                    console.log('改变activeIndex:',_this.props.items.length+2-1);
                    return ;
                }
            }
            let _n = parseInt(n+_this.state.activeIndex) ==_this.props.items.length+2 || parseInt(n+_this.state.activeIndex) ==-1?2:n+_this.state.activeIndex;
            _this.setState({'activeIndex':_n});
            console.log('改变activeIndex:',_n);
        };
        if(flag){
            _fun(this);
        }
        else{
            if(!this.scroll){
                this.scroll = true;
                _fun(this);
            }
            else{
                let _this = this;
                setTimeout(function(){
                    _this.scroll = false;
                },750);
            }
        }
    }
    autoPlay(){
        console.log('autoPlay',this.props.autoplay);
        if(this.props.autoplay){
            this.autoPlayFlag = setInterval(()=>
                {this.turn(1)},this.props.delay*1000
            );
            console.log('autoPlay timer:',this.autoPlayFlag);
        }
    }
    pausePlay(){
        console.log('pausePlay timer:',this.autoPlayFlag);
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
                // onMouseOver={this.props.pause?this.pausePlay.bind(this):null}
                // onMouseOut={this.props.pause?this.autoPlay.bind(this):null}
                onTouchStart={(e)=>{
                    this.startX = e.touches[0].pageX;
                    console.log(this.props.pause);
                    this.props.pause?this.pausePlay():null;
                }}
                onTouchMove={(e)=>{
                    this.endX = e.touches[0].pageX;
                    this.moveX = this.endX-this.startX;
                    document.getElementsByClassName('slider')[0].querySelector('ul').style.transitionDuration = '0s';
                    document.getElementsByClassName('slider')[0].querySelector('ul').style.left =
                        parseFloat(document.getElementsByClassName('slider')[0].querySelector('ul').style.left)+(this.moveX/window.screen.width*100)+'%';

                    this.startX = this.endX;
                    console.log(this.moveX);
                }}
                onTouchEnd={(e)=>{
                    console.log(this.moveX);
                    document.getElementsByClassName('slider')[0].querySelector('ul').style.transitionDuration = Math.abs((this.moveX/window.screen.width).toFixed(2))+'s';
                    // let _this = this;
                    if(this.moveX<-1){
                        this.turn(1,true);
                    }
                    else if(this.moveX>1){
                        this.turn(-1,true);
                    }
                    else{
                        document.getElementsByClassName('slider')[0].querySelector('ul').style.left =
                            parseFloat(document.getElementsByClassName('slider')[0].querySelector('ul').style.left)-(this.moveX/window.screen.width*100)+'%';
                    }
                    // this.props.pause?this.autoPlay.bind(this):null;
                    // setTimeout(function(){
                    //     _this.props.pause?_this.autoPlay.bind(_this):null;
                    // },900);
                   this.autoPlay();
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

                {this.props.dots?(<SliderDots count={count-2} activeIndex={this.state.activeIndex-1}></SliderDots>):null}
            </div>
        )
    }
    //{this.props.arrows?(<SliderArrows turn={(i)=>this.turn(i)}></SliderArrows>):null}
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