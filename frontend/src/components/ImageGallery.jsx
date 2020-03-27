import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery'

const images = [
    {
        original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/6.jpg',
        thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/6t.jpg',
    },
    {
        original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/8.jpg',
        thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/8t.jpg',
    },
    {
        original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4.jpg',
        thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4t.jpg',
    },
    {
        original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/1.jpg',
        thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/1t.jpg',
    },
    {
        original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/5.jpg',
        thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/5t.jpg',
    },
    {
        original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/9.jpg',
        thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/9t.jpg',
    },  
  ];
   
  class MyGallery extends React.Component {

    state = {
        showThumbnails: true,
        slideDuration: 450,
        slideInterval: 2000,
        thumbnailPosition: 'left',
        showNav: true,
        showPlayButton: false,
        showGalleryPlayButton: false,
        showFullscreenButton: false,
    }

    render() {
      return ( 
        <ImageGallery items={images}
            thumbnailPosition={this.state.thumbnailPosition}
            slideDuration={parseInt(this.state.slideDuration)}
            slideInterval={parseInt(this.state.slideInterval)}
            showThumbnails={this.state.showThumbnails}
            showNav={this.state.showNav}            
            showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
            showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
        /> )
    }
  }

  export default MyGallery