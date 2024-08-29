export class TextContent {
  private id: string;
  private content: string;
  private language: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    content: string,
    language: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.content = content;
    this.language = language;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  // Getters and Setters for each property
  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getContent(): string {
    return this.content;
  }

  public setContent(content: string): void {
    this.content = content;
  }

  public getLanguage(): string {
    return this.language;
  }

  public setLanguage(language: string): void {
    this.language = language;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  // Convert TextContent to a simple object
  public toObject(): Record<string, any> {
    return {
      id: this.id,
      content: this.content,
      language: this.language,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  // Print text content as a formatted string
  public toString(): string {
    return `ID: ${this.id}\nContent: ${this.content}\nLanguage: ${
      this.language
    }\nCreated At: ${this.createdAt.toISOString()}\nUpdated At: ${this.updatedAt.toISOString()}`;
  }
}

// Example usage
const textContent = new TextContent(
  "12345",
  "This is some example text content.",
  "en",
  new Date(),
  new Date()
);

console.log(textContent.toObject());
// Outputs: { id: '12345', content: 'This is some example text content.', language: 'en', createdAt: '2024-08-24T00:00:00.000Z', updatedAt: '2024-08-24T00:00:00.000Z' }

console.log(textContent.toString());
// Outputs:
// ID: 12345
// Content: This is some example text content.
// Language: en
// Created At: 2024-08-24T00:00:00.000Z
// Updated At: 2024-08-24T00:00:00.000Z
