const checkUserData = (user) => {
  const resolve = {
    check: true,
    errors: [],
  };

  Object.entries(user).forEach(([field, value]) => {
    if (field === "name") {
      if (typeof value !== "string") {
        resolve.check = false;
        resolve.errors.push("Поле name не заполнено");
      }
      if (value.length > 30) {
        resolve.check = false;
        resolve.errors.push("Длина поля name не должна превышать 30 символов");
      }
      if (value.length < 3) {
        resolve.check = false;
        resolve.errors.push("Длина поля name не должна быть меньше 2 символов");
      }
    }

    if (field === "about") {
      if (typeof value !== "string") {
        resolve.check = false;
        resolve.errors.push("Поле about не заполнено");
      }

      if (value.length > 30) {
        resolve.check = false;
        resolve.errors.push("Длина поля about не должна превышать 30 символов");
      }
      if (value.length < 3) {
        resolve.check = false;
        resolve.errors.push(
          "Длина поля about не должна быть меньше 2 символов"
        );
      }
    }
  });
  return resolve;
};

module.exports = checkUserData;
