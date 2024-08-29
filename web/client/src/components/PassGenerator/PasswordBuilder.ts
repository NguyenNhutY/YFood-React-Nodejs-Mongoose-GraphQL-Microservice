class PasswordBuilder {
  private length: number;
  private includeUpper: boolean;
  private includeLower: boolean;
  private includeNumber: boolean;
  private includeSymbol: boolean;

  private upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  private numbers = "0123456789";
  private symbols = "!@#$%^&*()_+=";

  constructor(
    length: number,
    includeUpper: boolean,
    includeLower: boolean,
    includeNumber: boolean,
    includeSymbol: boolean
  ) {
    this.length = length;
    this.includeUpper = includeUpper;
    this.includeLower = includeLower;
    this.includeNumber = includeNumber;
    this.includeSymbol = includeSymbol;
  }

  private getLowercase() {
    return this.lowerLetters[
      Math.floor(Math.random() * this.lowerLetters.length)
    ];
  }

  private getUppercase() {
    return this.upperLetters[
      Math.floor(Math.random() * this.upperLetters.length)
    ];
  }

  private getNumber() {
    return this.numbers[Math.floor(Math.random() * this.numbers.length)];
  }

  private getSymbol() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }

  private generateCharacter() {
    const chars = [];
    if (this.includeUpper) chars.push(this.getUppercase());
    if (this.includeLower) chars.push(this.getLowercase());
    if (this.includeNumber) chars.push(this.getNumber());
    if (this.includeSymbol) chars.push(this.getSymbol());
    return chars[Math.floor(Math.random() * chars.length)];
  }

  generate() {
    if (this.length <= 0) return "";

    let password = "";

    if (this.includeUpper) password += this.getUppercase();
    if (this.includeLower) password += this.getLowercase();
    if (this.includeNumber) password += this.getNumber();
    if (this.includeSymbol) password += this.getSymbol();

    for (let i = password.length; i < this.length; i++) {
      password += this.generateCharacter();
    }

    return password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");
  }
}

export default PasswordBuilder;
