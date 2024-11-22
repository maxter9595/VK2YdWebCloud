/**
 * Класс ImageViewer
 * Используется для взаимодействия с блоком изображений
 */
class ImageViewer {
  constructor( element ) {
    this.element = element;
    this.imagesBlock = element.querySelector('.images-list');
    this.imagesRenderBlock = element.querySelector('.row');
    this.imagePreviewBlock = element.querySelector('.image');
    this.selectAllBtn = element.querySelector('.select-all');
    this.sendBtn = element.querySelector('.send');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображение в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents() {
    this.imagesBlock.addEventListener('dblclick', event => {
      if (event.target.tagName === 'IMG') {
        this.imagePreviewBlock.src = event.target.src;
      }
    });

    this.imagesBlock.addEventListener('click', event => {
      if (event.target.tagName === 'IMG') {
        event.target.classList.toggle('selected');
        this.checkButtonText();

      } else if (event.target.classList.contains('select-all')) {
        const images = this.imagesRenderBlock.querySelectorAll('img');
        const isSomeImagesSelected = Array.from(images).some(image => image.classList.contains('selected'));
        images.forEach(image => image.classList.toggle('selected', !isSomeImagesSelected));
        this.checkButtonText();

      } else if (event.target.classList.contains('show-uploaded-files')) {
        const modalPreviewer = App.getModal('filePreviewer');
        modalPreviewer.open();
        Yandex.getUploadedFiles(jsonData => modalPreviewer.showImages(jsonData));

      } else if (event.target.classList.contains('send')) {
        const modalUploader = App.getModal('fileUploader');
        const selectedImages = this.imagesRenderBlock.querySelectorAll('.selected');
        const imageUrls = Array.from(selectedImages).map(image => image.src);
        modalUploader.open();
        modalUploader.showImages(imageUrls);
      }
    });
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    this.imagesRenderBlock.innerHTML = '';
  }

  /**
   * Отрисовывает изображения
   */
  drawImages(images) {
    if (images.length > 0) {
      this.selectAllBtn.classList.remove('disabled');
      images.forEach(image => {
        const imageHTML = `<div class='four wide column ui medium image-wrapper'><img src="${image}"/></div>`;
        this.imagesRenderBlock.insertAdjacentHTML('beforeend', imageHTML);
      });

    } else {
      this.selectAllBtn.classList.add('disabled');
    }
  }

  /**
   * Контролирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText() {
    const images = this.imagesRenderBlock.querySelectorAll('img');
    const isSomeImagesSelected = Array.from(images).some(image => image.classList.contains('selected'));
    const isAllImagesSelected = Array.from(images).every(image => image.classList.contains('selected'));

    this.selectAllBtn.textContent = isAllImagesSelected ? 'Снять выделение' : 'Выбрать всё';
    this.sendBtn.classList.toggle('disabled', !isSomeImagesSelected);
  }
}