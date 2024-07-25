# Тестовое задание - To-Do List

- [Установка](#установка)
- [Сборка](#сборка)
- [Разработка](#разработка)

## Установка
1. Клонируйте репозиторий:
    ```sh
    git clone https://github.com/YuraLk/task_manager.git
    ```
2. Перейдите в директорию проекта:
    ```sh
    cd task_manager/app
    ```
3. Установите зависимости:
    ```sh
    npm install
    ```
4. Скопируйте файл с переменными окружения себе в проект
    ```sh
    cd ..
    cp .env.example .env
    ```

## Сборка
1. Сборка для IOS:
    ```sh
    cd app
    npm run ios
    ```
    В случае ошибки доступа,
    ```sh
    cd app/ios
    pod install --allow-root
    ```
    после чего собираем снова.

2. Сборка для Android:
    ```sh
    cd app
    npm run android
    ```
    Могут возникнуть проблемы с NDK, нужно будет установить необходимую версию NDK в Android Studio. Версию можно посмотреть в app/andriod/build.gradle в переменной ndkVersion.

3. Сборка для Web:
    Данная сборка упакована в Docker. Важно скопировать .env.example как .env файл перед запуском docker-compose.
    ```sh
    cd task_manager
    docker compose up --build -d
    ```
    Далее открываем localhost:8081 и смотрим результат.

## Разработка
1. Приведение кода в единый формат:
    ```sh
    npm run format
    ```
2. Выявление проблем:
    ```sh
    npm run lint
    ```