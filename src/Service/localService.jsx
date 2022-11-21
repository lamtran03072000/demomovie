const USER_INFOR = "USER_INFOR";
export const userLocal = {
  set: (inforUser) => {
    let json = JSON.stringify(inforUser);
    localStorage.setItem(USER_INFOR, json);
  },
  get: () => {
    let json = localStorage.getItem(USER_INFOR);
    if (json) {
      return JSON.parse(json);
    } else {
      return null;
    }
  },
  remove: () => {
    localStorage.removeItem(USER_INFOR);
  },
};
