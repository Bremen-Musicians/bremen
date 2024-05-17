import Slider from "react-slick";
import React, {Component, useState, useEffect} from 'react';

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <h2> single </h2>
        <Slider {...settings}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </Slider>
      </div>
    );
  }
}
