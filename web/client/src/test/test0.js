const fb = () => {
  login: () => {};
};

const google = () => {
  login: () => {};
};

const lgDefault = () => {
  login: () => {};
};

const login = {
  function() {
    console.log("Login");
  },
};
function LoginManager(strategy) {
  this.strategy = strategy;
}

LoginManager.prototype.setStrategy = function (strategy) {
  this.strategy = strategy;
};

LoginManager.prototype.performLogin = function () {
  this.strategy.login();
};

const fbLogin = new LoginManager(fb());
const googleLogin = new LoginManager(google());
const loginDefault = new LoginManager(lgDefault());

// Sử dụng Strategy pattern để thực hiện đăng nhập
fbLogin.performLogin(); // Thực hiện đăng nhập Facebook
googleLogin.performLogin(); // Thực hiện đăng nhập Google
loginDefault.performLogin(); // Thực hiện đăng nhập mặc định

const LOGICAL_NUMBER_FACEBOOK = "FB";
const LOGICAL_NUMBER_GOOGLE = "GOOGLE";
const LOGICAL_NUMBER_LOGINDEFAULT = "LOGINDEFAULT";

const funcLogin = (provider) => {
  switch (provider) {
    case LOGICAL_NUMBER_FACEBOOK:
      fb();
      break;
    case LOGICAL_NUMBER_GOOGLE:
      google();
      break;
    case LOGICAL_NUMBER_LOGINDEFAULT:
      loginDefault();
      break;
  }
};
funcLogin(LOGICAL_NUMBER_FACEBOOK);
