# Единый интерфейс взаимодействия с сервером

## createRequest

Функция является основным связующим звеном между клиентом и сервером для Yandex API. Через нее необходимо 
организовать AJAX запросы на сервер используя API XMLHttpRequest.
Функция *createRequest* ничего не возвращает.

**Пример** вызова:

```javascript
// здесь перечислены все возможные параметры для функции
  createRequest({
    method: 'GET',
    url: 'https://cloud-api.yandex.net/v1/disk/resources/files',
    headers:{
      'Authorization': 'OAuth токен_доступа',
    },
    callback: (response) => console.log(response)
  });
```

### 1. XHR

Константа *xhr* в примере выше содержит объект *XMLHttpRequest*.

### 2. Параметр data

Данные из объекта *data* должны передаваться в строке адреса. Например, листинг:

```javascript
  createRequest({
    url: 'https://example.com',
    data: {
      mail: 'ivan@biz.pro',
      password: 'odinodin'
    },
    method: 'GET',
  });
```

аналогичен коду:

```javascript
const xhr = new XMLHttpRequest;

xhr.open( 'GET', 'https://example.com?mail=ivan@biz.pro&password=odinodin' );
xhr.send();
```

### 3. responseType

Присвойте свойству *responseType* значение `'json'`. В проекте сервер все ответы будет возвращать в формате `'json'`.
```javascript
xhr.responseType = 'json'; // формат, в котором необходимо выдать результат
```

### 4. HTTP заголовки

С помощью метода `setRequestHeader` назначайте все передаваемые заголовки, которые передаются свойстве `headers` передаваемого объекта настроек запроса.

### 5. callback

В случае успешного выполнения кода, необходимо вызвать функцию, заданную
в *callback* и передать туда данные:

```javascript
// при успешном выполнении
  createRequest({
    url: 'https://example.com',
    method: 'GET',
    callback: ( err, response ) => {
      /*
        при успешном выполнении err = null, response содержит данные ответа
      */
      console.log( err ); // null
      console.log( response ); // ответ
    }
  });
```

## Подсказки и советы

<details>

<summary>Показать</summary>

### Ошибки в createRequest

Иногда сетевой запрос, сформированный с помощью *XMLHttpRequest* 
может выбросить критическую ошибку, которая остановит выполнение 
вашего приложения. Пользуйтесь в этом случае конструкцией *try/catch*:

```javascript
const createRequest = options => {
  // ...
  const xhr = new XMLHttpRequest;
  // ...
  try {
    xhr.open( method, url );
    xhr.send( data );
  }
  catch (err) {
    // перехват сетевой ошибки
    console.error(err);
  }
}
```


### Проверка запросов к / ответов от сервера

Для проверки запросов / ответов можно использовать *Инструменты разработчика* в браузере.
Во вкладке *Network*, в левом окне, нужно выбрать файл, через который идет запрос на сервер.
В правом окне в закладке *Headers* будут указаны параметры запроса. Метод, через который идет запрос, 
а так же данные, отправленные на сервер. В закладках *Response* и *Preview* можно посмотреть полученный
ответ от сервера. 

</details>