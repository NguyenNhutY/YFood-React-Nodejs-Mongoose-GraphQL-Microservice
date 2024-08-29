const arrLogin = [
  function fb() {
    console.log("login facebook");
  },

  function google() {
    console.log("login google");
  },

  function loginDefault() {
    console.log("login default");
  },
];

const LOGICAL_NUMBER_FACEBOOK = arrLogin[0];
const LOGICAL_NUMBER_GOOGLE = arrLogin[1];
const LOGICAL_NUMBER_LOGINDEFAULT = arrLogin[2];

LOGICAL_NUMBER_FACEBOOK();
LOGICAL_NUMBER_GOOGLE();
LOGICAL_NUMBER_LOGINDEFAULT();

const funcLogin = (provider) => {
  switch (provider) {
    case LOGICAL_NUMBER_FACEBOOK:
      break;
    case LOGICAL_NUMBER_GOOGLE:
      break;
    case LOGICAL_NUMBER_LOGINDEFAULT:
      break;
  }
};
funcLogin(LOGICAL_NUMBER_FACEBOOK());
