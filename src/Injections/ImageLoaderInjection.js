var ImageLoaderInjection = (function(imageLoader){
    return function(){
        this.loadImages = imageLoader.loadImages;
    };
})(ImageLoader);