class FB {
  login() {
    console.log("Login fb");
  }
}

class Google {
  login() {
    console.log("Login google");
  }
}

class AccDefault {
  login() {
    console.log("Login accDefault");
  }
}

class StrategyManagerLoginPage {
  construtor() {
    this._strategy = null;
  }
  set strategy(strategy) {
    this._strategy = strategy;
  }
  get strategy() {
    return this._strategy;
  }
  login() {
    this._strategy.login();
  }
}

const strategyManagerLoginPage = new StrategyManagerLoginPage();

const loginFB = new FB();
const loginGoogle = new Google();
const loginDefault = new AccDefault();

strategyManagerLoginPage.strategy = loginFB;
strategyManagerLoginPage.login();

strategyManagerLoginPage.strategy = loginGoogle;
strategyManagerLoginPage.login();

strategyManagerLoginPage.strategy = loginDefault;
strategyManagerLoginPage.login();
