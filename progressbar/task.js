document.addEventListener('DOMContentLoaded', function() {
    const progress = document.getElementById('progress');
    const form = document.getElementById('form');
    const fileInput = document.getElementById('file');
    const fileNameDisplay = document.querySelector('.input__wrapper-desc');

    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = fileInput.files[0].name;
        } else {
            fileNameDisplay.textContent = 'Имя файла...';
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const xhr = new XMLHttpRequest();
        const url = 'https://students.netoservices.ru/nestjs-backend/upload';

        xhr.open('POST', url, true);

        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                progress.value = percentComplete;
            }
        };

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Загрузка завершена успешно
                console.log('Файл успешно загружен');
            } else {
                // Произошла ошибка при загрузке
                console.error('Произошла ошибка при загрузке файла');
            }
        };

        xhr.onerror = function () {
            console.error('Произошла ошибка при отправке запроса');
        };

        // Создание объекта FormData для передачи данных формы на сервер
        const formData = new FormData(form);

        // Отправка запроса на сервер с данными из формы
        xhr.send(formData);
    });
});