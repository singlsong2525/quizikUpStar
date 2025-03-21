document.getElementById('wakeButton').addEventListener('click', function() {
    const sleepVideo = document.getElementById('sleepImage');
    const message = document.getElementById('message');
    const wakeButton = document.getElementById('wakeButton');
    const progressBar = document.getElementById('progressBar');

    // Деактивировать кнопку и изменить её стиль
    wakeButton.disabled = true;
    wakeButton.classList.add('disabled');

    // Для изменения источника видео
    function changeVideoSource(newSource) {
        sleepVideo.innerHTML = `<source src="${newSource}" type="video/mp4">`;
        sleepVideo.load();
        sleepVideo.play();
    }

    // Показать сообщение о том, что Дежурный услышал
    message.textContent = 'Бот услышал и скоро проснется...';
    sendGetRequest();

    // Обновление прогресс-бара
    let progress = 0;
    const interval = setInterval(function() {
        progress += 10; // Увеличиваем прогресс на 10%
        progressBar.style.width = progress + '%'; // Обновляем ширину прогресс-бара

        // Если прогресс достиг 100%, останавливаем интервал
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 1200); // Обновляем каждые 1200 миллисекунд

    setTimeout(function() {
        changeVideoSource('waiting.mp4');
        message.textContent = 'Бот просыпается! Еще совсем чуть-чуть';
    }, 4000); // 4000 миллисекунд = 4 секунд

    // Через 30 секунд поменять изображение и сообщение
    setTimeout(function() {
        message.textContent = 'Бот проснулся!';
    }, 9000); // 9000 миллисекунд = 9 секунд

    setTimeout(function() {
        Telegram.WebApp.close();
    }, 14000); // 14000 миллисекунд = 14 секунды
});

function sendGetRequest() {
    var xhr = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    var url = "https://starpsychologistgs-quiz.glitch.me/"; // URL, на который будет отправлен запрос

    xhr.open("GET", url, true); // Инициализируем GET-запрос

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { // Проверяем, завершен ли запрос
            if (xhr.status === 200) { // Проверяем, успешен ли ответ
                console.log("Response:", xhr.responseText); // Выводим ответ в консоль
            } else {
                console.error("Error:", xhr.status); // Выводим ошибку, если запрос не успешен
            }
        }
    };
    
    xhr.send(); // Отправляем запрос
};
