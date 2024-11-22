/**
 * Класс VK
 * Управляет изображениями из VK с помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из VK.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 */
class VK {

  static ACCESS_TOKEN;
  static lastCallback;

  /**
   * Метод формирования и сохранения токена для VK API
   */
  static getToken() {
    let token = localStorage.getItem('VK_TOKEN');

    if (!token || token === 'null') {
      token = prompt('Введите токен VK:');
      localStorage.setItem('VK_TOKEN', token);
    }

    return token;
  }

  /**
   * Получает изображения
   */
  static get(id = '', callback) {
    this.lastCallback = callback;
    this.ACCESS_TOKEN = this.getToken();

    let script = document.createElement('script');
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&access_token=${this.ACCESS_TOKEN}&v=5.199&callback=VK.processData`;

    document.body.appendChild(script);
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result) {
    document.body.lastChild.remove();

    if (result.error) {
      alert(`Ошибка ответа на запрос VK: ${result.error.error_msg}`);

    } else {
      const imageList = result.response.items;

      if (imageList.length > 0) {
        const imageSizeRange = ['s', 'm', 'x', 'o', 'p', 'q', 'r', 'y', 'z', 'w'];
        const maxSizeImagesUrls = [];

        imageList.forEach(image => {
          image.sizes.sort((a, b) => imageSizeRange.indexOf(b.type) - imageSizeRange.indexOf(a.type));
          maxSizeImagesUrls.push(image.sizes[0].url);
        });

        this.lastCallback(maxSizeImagesUrls);
        this.lastCallback = () => {};
      }
    }
  }
}