import React, { useState } from 'react'
import ImageGallery from 'react-image-gallery'
   
const gallery = props => {    
    const images = props.images
    const data = {
        showThumbnails: true,
        slideDuration: 450,
        slideInterval: 2000,
        thumbnailPosition: 'left',
        showNav: true,
        showPlayButton: false,
        showGalleryPlayButton: false,
        showFullscreenButton: false,
    }
    
    return ( 
        <ImageGallery items={images}
            thumbnailPosition={data.thumbnailPosition}
            slideDuration={parseInt(data.slideDuration)}
            slideInterval={parseInt(data.slideInterval)}
            showThumbnails={data.showThumbnails}
            showNav={data.showNav}            
            showPlayButton={data.showPlayButton && data.showGalleryPlayButton}
            showFullscreenButton={data.showFullscreenButton && data.showGalleryFullscreenButton}
        />
    )
   
}

  export default gallery