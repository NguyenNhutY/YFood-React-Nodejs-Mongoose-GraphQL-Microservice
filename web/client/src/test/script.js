const LOGICAL_NUMBER_FACEBOOK = "FB";
const LOGICAL_NUMBER_GOOGLE = "GOOGLE";
const LOGICAL_NUMBER_LOGINDEFAULT = "LOGINDEFAULT";

class Strategy {
  login() {
    console.log("must defin login");
  }
}

class FB extends Strategy {
  login() {
    console.log("Login fb");
  }
}

class FactoryFB {
  create() {
    return new FB();
  }
}

class Google extends Strategy {
  login() {
    console.log("Login google");
  }
}

class FactoryGoole {
  create() {
    return new Google();
  }
}

class AccDefault extends Strategy {
  login() {
    console.log("Login accDefault");
  }
}
class FactoryAccDefault {
  create() {
    return new AccDefault();
  }
}
const factoryFB = new FactoryFB();
const factoryGoole = new FactoryGoole();
const factoryDefaultAcount = new FactoryAccDefault();

export const ObjetLogin = {
  factoryFB,
  factoryGoole,
  factoryDefaultAcount,
};
