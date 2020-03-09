
import React, { Component } from 'react';



// big shoutouts to https://engineering.kapost.com/2018/05/horizontal-react-component-slider/ for the react arrow button tutorial
class ScrollButtons extends Component {  
    constructor(props){
        super(props);
        this.state={
            marginLeft:0,
        }
        renderLeftArrow = () => {
            if (this.state.marginLeft !== 0) {
                return (
                    <button className="caret caret-left" onClick={this.handleLeftClicked}>
                        {this.props.renderLeftArrow()}
                    </button>
                );

            }
            return null;
        }
        renderRightArrow = () => {
            const remainingWidth = contentWidth - (sliderWidth - arrowWidth) - currentMarginLeft;
        }
        handleLeftClicked = () => {
            const currentMarginLeft = this.state.marginLeft;
            const sliderWidth = this.slider.offsetWidth;
            let marginLeft;

            if (currentMarginLeft > sliderWidth) {
                marginLeft = currentMarginLeft - sliderWidth;
            } else {
                marginLeft = 0;
            }
            this.setState({ marginLeft });
        }
        handleRightClicked = () => {
            const currentMarginLeft = this.state.marginLeft;
            const sliderWidth = this.slider.offsetWidth
            const contentWidth = this.sliderContent.offsetWidth;
            const remainingWidth = contentWidth - (sliderWidth - arrowWidth) - currentMarginLeft;
            let marginLeft;
            if (remainingWidth > 0) {
                if (remainingWidth <= sliderWidth) {
                    marginLeft = currentMarginLeft + remainingWidth;
                } else {
                    marginLeft = currentMarginLeft + sliderWidth;
                }
            } else {
                marginLeft = currentMarginLeft;
            }
            this.setState({ marginLeft });
        }

    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize());
        this.resetMargin();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize());
    }

    render() {
        return (
            <div>
                <div>
                    
                </div>
            </div>
        );
    }
}
export default ScrollButtons;

