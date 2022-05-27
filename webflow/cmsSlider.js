const restartWebflowSlider = async () => {
    const { Webflow } = window;
    if (!Webflow || !('destroy' in Webflow) || !('ready' in Webflow) || !('require' in Webflow))
        return;
        
    Webflow.require('slider')?.redraw();
    return new Promise((resolve) => Webflow.push(() => resolve(undefined)));
};

const waitForElements = async (selector) => {
    return new Promise(resolve => {
        let elements = document.querySelectorAll(selector)
        if (elements.length > 0) {
            return resolve(elements);
        }

        const observer = new MutationObserver(mutations => {
            let elements = document.querySelectorAll(selector)
            if (elements.length > 0) {
                resolve(elements);
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

(() => {

const sliders = document.querySelectorAll('[data-dyn-slider]');

if (!sliders.length)
    return;

sliders.forEach(async slider => {
    const imageMap = new Map();
    const sliderDynLists = slider.querySelectorAll('.w-dyn-list');
    const images = slider.querySelectorAll('img');
    const sliderMask = slider.querySelector('.w-slider-mask');
    const sliderItems = sliderMask.querySelectorAll('.w-slide');

    if (!sliderMask || !sliderItems || !sliderDynLists || !images) {
        return
    }

    images.forEach(image => {
        const src = image.getAttribute('src');
        imageMap.set(src, image);
    });

    sliderItems.forEach((item) => {
        sliderMask.removeChild(item);
    });

    imageMap.forEach((value) => {
        const imageElement = document.createElement('img');
        imageElement.classList.add('slide-image');
        imageElement.src = value.src;
        imageElement.alt = value.alt;
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.classList.add('w-slide');
        slide.appendChild(imageElement);
        sliderMask.appendChild(slide);
    });


    sliderDynLists.forEach(list => {
        slider.removeChild(list);
    });

    await restartWebflowSlider();
    const sliderDots = await waitForElements('.w-slider-dot');
    console.log(sliderDots.length);
    let index = 0;
    for (const value of imageMap.values()) {
        const dot = sliderDots[index];
        if (dot) {
            const thumbnail = document.createElement('img');
            thumbnail.classList.add('thumbnail');
            thumbnail.src = value.src;
            thumbnail.alt = value.alt;
            dot.appendChild(thumbnail);
        }
        index++;
    }
});

})();