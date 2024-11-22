/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents() {
    this.domElement.addEventListener('click', event => {
      if (event.target.classList.contains('x') || event.target.classList.contains('close')) {
        this.close();

      } else if (event.target.classList.contains('send-all')) {
        this.sendAllImages();

      } else if (event.target.tagName === 'INPUT') {
        event.target.parentElement.classList.remove('error');

      } else if (event.target.closest('button')) {
        this.sendImage(event.target.closest('.image-preview-container'));
      }
    });
  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    const modalContent = this.domElement.querySelector('.content');

    modalContent.innerHTML = images.reverse().reduce((total, image) => {
      total += this.getImageHTML(image);
      return total;
    }, '');
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкой загрузки
   */
  getImageHTML(item) {
    return `<div class="image-preview-container">
              <img src=${item} />
              <div class="ui action input">
                <input type="text" placeholder="Путь к файлу">
                <button class="ui button"><i class="upload icon"></i></button>
              </div>
            </div>`
  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    const containers = this.domElement.querySelectorAll('.image-preview-container');
    containers.forEach(container => this.sendImage(container));
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    const input = imageContainer.querySelector('.input');
    let path = imageContainer.querySelector('input').value.trim();
    const url = imageContainer.querySelector('img').src;

    if (path) {
      input.classList.add('disabled');
      path = path.includes('.jpg') ? path : path + '.jpg';
      Yandex.uploadFile(path, url, (jsonData) => {
        if (jsonData) {
          imageContainer.remove();

          if (this.domElement.querySelectorAll('input').length === 0) {
            this.close();
          }
        }
      });

    } else {
      input.classList.add('error');
    }
  }
}