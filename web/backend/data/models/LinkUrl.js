export class LinkUrl {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  }

  // Generate the full URL for a link
  public getUrl(path: string): string {
    return `${this.baseUrl}${path.startsWith("/") ? path.substring(1) : path}`;
  }

  // Validate if a string is a valid URL
  public isValidUrl(url: string): boolean {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!urlPattern.test(url);
  }

  // Append query parameters to the link URL
  public addParams(url: string, params: Record<string, string>): string {
    const urlObj = new URL(url);
    Object.keys(params).forEach((key) =>
      urlObj.searchParams.append(key, params[key])
    );
    return urlObj.toString();
  }
}

// Example usage
const linkUrl = new LinkUrl("https://example.com/");
console.log(linkUrl.getUrl("page/about")); // Outputs: https://example.com/page/about
console.log(linkUrl.isValidUrl("https://example.com/page/about")); // Outputs: true
console.log(
  linkUrl.addParams("https://example.com/page/about", {
    ref: "newsletter",
    utm_source: "email",
  })
);
// Outputs: https://example.com/page/about?ref=newsletter&utm_source=email
