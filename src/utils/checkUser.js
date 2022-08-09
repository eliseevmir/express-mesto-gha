const checkUserData = (user) => {
  const resolve = {
    check: true,
    errors: [],
  };

  Object.entries(user).forEach(([field, value]) => {
    if (field === "name") {
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
  console.log(resolve);
  return resolve;
};

module.exports = checkUserData;
