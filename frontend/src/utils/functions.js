/* eslint-disable */
import Cookies from "js-cookie";

export const isCharactersInStringOnly = (string) => {
  if (/^[a-zA-Z]+$/.test(string)) {
    return true;
  }
  return false;
};

export const isEmailValid = (string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(string)) {
    return true;
  }
  return false;
};

export const isPhoneValid = (string) => {
  if (
    /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g.test(
      string
    )
  ) {
    return true;
  }
  return false;
};

export const isLogin = () => {
  const token = Cookies.get("token");
  if (token) {
    return true;
  }
  return false;
};
