import EmblaCarousel from 'embla-carousel'
import { addPrevNextBtnsClickHandlers } from './inc/EmblaCarouselArrowButtons.js';
import Autoplay from 'embla-carousel-autoplay'

function init_slider(){
  const OPTIONS = {}
  
  const emblaNode = document.querySelector('.embla')
  const viewportNode = emblaNode.querySelector('.embla__viewport')
  const prevBtnNode = emblaNode.querySelector('.embla__button--prev')
  const nextBtnNode = emblaNode.querySelector('.embla__button--next')
  
  const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [Autoplay()])
  
  const onNavButtonClick = (emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
  
    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop
  
    resetOrStop()
  }
  
  const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
    emblaApi,
    prevBtnNode,
    nextBtnNode,
    onNavButtonClick
  )
  
  emblaApi.on('destroy', removePrevNextBtnsClickHandlers)
}

document.addEventListener('DOMContentLoaded',()=>{
  init_slider();
})
/**
 * карты
 */
function initYandexMap() {
  return new Promise((resolve, reject) => {
    if (typeof ymaps !== 'undefined') {
      ymaps.ready(resolve);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ваш_API_ключ&lang=ru_RU';
    script.onload = () => ymaps.ready(resolve);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function createMap() {
  try {
    await initYandexMap();
    
    const map = new ymaps.Map('map', {
      center: [57.753278, 40.985778],
      zoom: 16,
      controls: ['zoomControl']
    });
    
    const placemark = new ymaps.Placemark([57.753572, 40.979868], {
      hintContent: '2-я Волжская улица, 4',
      // balloonContent: '2-я Волжская улица, 4'
  }, {
      preset: 'islands#blueHomeIcon', // иконка домика
      iconColor: '#ff0000' // можно изменить цвет
  });
    
    map.geoObjects.add(placemark);
    
    // Принудительный рефреш карты на случай проблем с отображением
    setTimeout(() => map.container.fitToViewport(), 100);
    
  } catch (error) {
    console.error('Map error:', error);
  }
}

// Запускаем после полной загрузки DOM
if (document.readyState === 'complete') {
  createMap();
} else {
  window.addEventListener('load', createMap);
}

/**
 * accordion
 */

document.querySelector('.accordion_header').addEventListener('click', function() {
  // Находим родительский элемент accordion
  const accordion = this.closest('.accordion');
  
  // Переключаем класс active
  accordion.classList.toggle('active');
  
  // Альтернативный вариант с динамической высотой
  const content = accordion.querySelector('.accordion_content');
  if (accordion.classList.contains('active')) {
    content.style.maxHeight = content.scrollHeight + 'px';
  } else {
    content.style.maxHeight = null;
  }
});