const fb = () => {
    login: () => {
      // Implementation for Facebook login
      // e.g., initiate Facebook SDK login process
    };
  };

  const google = () => {
    login: () => {
      // Implementation for Google login
      // e.g., initiate Google SDK login process
    };
  };

  const lgDefault = () => {
    login: () => {
      // Default login implementation
      // e.g., standard form-based login process
    };
  };
  const login = () => {
    console.log("Login");
  };
  // Create the context

interface LoginStrategy {
    login(): void;
  }
  
  class FacebookLogin implements LoginStrategy {
    login() {
      // Implement Facebook login
    }
  }
  
  class GoogleLogin implements LoginStrategy {
    login() {
      // Implement Google login
    }
  }
  
  class LoginContext {
    private strategy: LoginStrategy;
  
    constructor(strategy: LoginStrategy) {
      this.strategy = strategy;
    }
  
    setStrategy(strategy: LoginStrategy) {
      this.strategy = strategy;
    }
  
    doAction() {
      this.strategy.login();
    }
  }
  
  // Usage
  const facebookLogin = new FacebookLogin();
  const googleLogin = new GoogleLogin();
  
  const loginContext = new LoginContext(facebookLogin);
  loginContext.doAction(); // Executes Facebook login
  
  loginContext.setStrategy(googleLogin);
  loginContext.doAction(); // Executes Google login