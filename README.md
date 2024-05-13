### Medmate_reborn ###
Этот проект создан для системы заявок медтехников

## Установка базы данных ##

Клонируйте репозиторий
Перейдите в каталог проекта: cd MedMate_reborn backend/docker_db
Запустите команду: 
\'''bash
docker run --name medmate-db -p 27017:27017 -d mongo
 \'''
 После выполните скрипт:
 \'''bash
  node .\CreateUser.js
  node .\server.js
  \'''