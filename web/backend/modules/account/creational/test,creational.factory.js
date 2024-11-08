class A {}
      class B {}
      class CreateA {
        create() {
          return new A();
        }
      }

      class CreateB {
        create() {
          return new B();
        }
      }

      class CreateAB {
        constructor() {
          this.Factory = null; // Initialize Factory as null to avoid undefined errors
        }

        setFactory(factory) {
          this.Factory = factory;
        }
        create(instance) {
          return this.Factory.create();
        }
      }
      const factoryA = new CreateA();
      const factoryAB = new CreateAB();
      factoryAB.setFactory(factoryA);
      const a = factoryAB.create();