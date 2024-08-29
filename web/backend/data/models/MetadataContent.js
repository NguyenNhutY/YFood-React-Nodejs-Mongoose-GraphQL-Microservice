export class MetadataContent {
  private title: string;
  private description: string;
  private keywords: string[];
  private author?: string;
  private date?: Date;

  constructor(
    title: string,
    description: string,
    keywords: string[],
    author?: string,
    date?: Date
  ) {
    this.title = title;
    this.description = description;
    this.keywords = keywords;
    this.author = author;
    this.date = date;
  }

  // Getters and Setters for each property
  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getKeywords(): string[] {
    return this.keywords;
  }

  public setKeywords(keywords: string[]): void {
    this.keywords = keywords;
  }

  public getAuthor(): string | undefined {
    return this.author;
  }

  public setAuthor(author: string): void {
    this.author = author;
  }

  public getDate(): Date | undefined {
    return this.date;
  }

  public setDate(date: Date): void {
    this.date = date;
  }

  // Convert MetadataContent to a simple object
  public toObject(): Record<string, any> {
    return {
      title: this.title,
      description: this.description,
      keywords: this.keywords,
      author: this.author,
      date: this.date ? this.date.toISOString() : undefined,
    };
  }

  // Print metadata content as a formatted string
  public toString(): string {
    return `Title: ${this.title}\nDescription: ${
      this.description
    }\nKeywords: ${this.keywords.join(", ")}\nAuthor: ${
      this.author || "N/A"
    }\nDate: ${this.date ? this.date.toISOString() : "N/A"}`;
  }
}

// Example usage
const metadata = new MetadataContent(
  "Example Title",
  "This is an example description.",
  ["example", "metadata", "typescript"],
  "John Doe",
  new Date()
);

console.log(metadata.toObject());
// Outputs: { title: 'Example Title', description: 'This is an example description.', keywords: [ 'example', 'metadata', 'typescript' ], author: 'John Doe', date: '2024-08-24T00:00:00.000Z' }

console.log(metadata.toString());
// Outputs:
// Title: Example Title
// Description: This is an example description.
// Keywords: example, metadata, typescript
// Author: John Doe
// Date: 2024-08-24T00:00:00.000Z
