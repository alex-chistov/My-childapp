import sqlite3

# Устанавливаем соединение с базой данных
connection = sqlite3.connect('my_database.db')
cursor = connection.cursor()

# Добавляем нового пользователя
cursor.execute('INSERT INTO Users (username, email, age) VALUES (?, ?, ?)', ('Валер', 'пумпурум@gmail.com', 52))

# Сохраняем изменения и закрываем соединение
connection.commit()
connection.close()