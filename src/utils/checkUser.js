const checkUserData = (user) => {
  const resolve = {
    check: true,
    errors: [],
  };

  Object.entries(user).forEach(([field, value]) => {
    if (field === "avatar") {
      if (typeof value === "undefined") {
        return;
      }
      if (typeof value !== "string") {
        resolve.check = false;
        resolve.errors.push("Поле «avatar» не заполнено");
      }
    }

    if (field === "name") {
      if (typeof value === "undefined") {
        return;
      }

      if (typeof value !== "string") {
        resolve.check = false;
        resolve.errors.push("Поле «name» не заполнено");
      }
      if (typeof value === "string" && value.length > 30) {
        resolve.check = false;
        resolve.errors.push(
          "Длина поля «name» не должна превышать 30 символов"
        );
      }
      if (typeof value === "string" && value.length < 3) {
        resolve.check = false;
        resolve.errors.push(
          "Длина поля «name» не должна быть меньше 2 символов"
        );
      }
    }

    if (field === "about") {
      if (typeof value === "undefined") {
        return;
      }
      if (typeof value !== "string") {
        resolve.check = false;
        resolve.errors.push("Поле «about» не заполнено");
      }

      if (typeof value === "string" && value.length > 30) {
        resolve.check = false;
        resolve.errors.push(
          "Длина поля «about» не должна превышать 30 символов"
        );
      }
      if (typeof value === "string" && value.length < 3) {
        resolve.check = false;
        resolve.errors.push(
          "Длина поля «about» не должна быть меньше 2 символов"
        );
      }
    }
  });
  return resolve;
};

module.exports = checkUserData;
