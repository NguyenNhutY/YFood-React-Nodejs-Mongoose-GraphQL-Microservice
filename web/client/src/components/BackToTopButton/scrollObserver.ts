// src/scrollObserver.ts
type ObserverCallback = (scrollPosition: number) => void;

class ScrollObserver {
  private observers: ObserverCallback[] = [];
  private scrollThreshold = 100;

  constructor() {
    window.addEventListener("scroll", this.handleScroll);
  }

  private handleScroll = () => {
    const scrollY = window.scrollY;
    this.notifyObservers(scrollY);
  };

  private notifyObservers(scrollPosition: number) {
    this.observers.forEach((callback) => callback(scrollPosition));
  }

  public addObserver(callback: ObserverCallback) {
    this.observers.push(callback);
  }

  public removeObserver(callback: ObserverCallback) {
    this.observers = this.observers.filter((obs) => obs !== callback);
  }

  public setThreshold(threshold: number) {
    this.scrollThreshold = threshold;
  }

  public getThreshold() {
    return this.scrollThreshold;
  }
}

const scrollObserver = new ScrollObserver();
export default scrollObserver;
