// ошибки movies
const INVALID_CARD_ID_ERROR = 'Передан некорректный _id карточки';
const NONEXISTENT_CARD_ID_ERROR = 'Передан несуществующий _id карточки';
const INSUFFICIENT_PERMISSIONS_ERROR = 'Недостаточно прав на удаление карточки';
const CARD_DELETED_SUCCESSFULLY_MESSAGE = 'Успешно удалена';
const INVALID_CARD_DATA_ERROR = 'Переданы некорректные данные при создании карточки';
// ошибки users
const INVALID_PROFILE_DATA_ERROR = 'Переданы некорректные данные при обновлении профиля';
const USER_NOT_FOUND_ERROR = 'Пользователь по указанному _id не найден';
const INVALID_USER_DATA_ERROR = 'Переданы некорректные данные при создании пользователя';
const EMAIL_CONFLICT_ERROR = 'Пользователь с таким email уже существует';
const INCORRECT_EMAIL_OR_PASSWORD_ERROR = 'Неправильные пароль или почта';

const AUTH_MESSAGE = 'Необходима авторизация';

const PAGE_NOT_FOUND = 'Страница не найдена';

const MONGODB_CONNECTED = 'Connected to MongoDB';
const MONGODB_ERROR = 'Error connecting to MongoDB';

const validatorUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  INVALID_CARD_ID_ERROR,
  NONEXISTENT_CARD_ID_ERROR,
  INSUFFICIENT_PERMISSIONS_ERROR,
  validatorUrl,
  CARD_DELETED_SUCCESSFULLY_MESSAGE,
  INVALID_CARD_DATA_ERROR,
  INVALID_PROFILE_DATA_ERROR,
  USER_NOT_FOUND_ERROR,
  INVALID_USER_DATA_ERROR,
  EMAIL_CONFLICT_ERROR,
  INCORRECT_EMAIL_OR_PASSWORD_ERROR,
  AUTH_MESSAGE,
  PAGE_NOT_FOUND,
  MONGODB_CONNECTED,
  MONGODB_ERROR,
};
