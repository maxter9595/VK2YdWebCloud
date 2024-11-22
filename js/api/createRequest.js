/**
 * Основная функция для совершения запросов по Yandex API.
 */
const createRequest = async (options = {}) => {
  try {
    let url = options.url;
    
    if (options.data) {
      const params = new URLSearchParams(options.data).toString();
      url += '?' + params;
    }
    
    const response = await fetch(url, {
      method: options.method,
      headers: options.headers
    });

    let jsonData = null;
    
    if (response.ok) {
      if (response.status !== 204) {
        jsonData = await response.json();
        return options.callback(jsonData);
      }
      return options.callback(jsonData);
      
    } else {
      alert(`Ошибка ответа сети на HTTP-запрос: ${response.statusText}`);
    }

  } catch(error) {
    alert(`Ошибка выполнения HTTP-запроса: ${error.message}`);
  }
};