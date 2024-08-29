export class ImageUrl {
  private baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  }

  // Generate the full URL for an image
  public getUrl(imageName) {
    return `${this.baseUrl}${encodeURIComponent(imageName)}`;
  }

  // Validate if a string is a valid image URL
  public isValidUrl(url) {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return (
      !!urlPattern.test(url) &&
      (url.endsWith(".png") ||
        url.endsWith(".jpg") ||
        url.endsWith(".jpeg") ||
        url.endsWith(".gif"))
    );
  }

  // Append query parameters to the image URL
  public addParams(url params) {
    const urlObj = new URL(url);
    Object.keys(params).forEach((key) =>
      urlObj.searchParams.append(key, params[key])
    );
    return urlObj.toString();
  }
}

// Example usage
const imageUrl = new ImageUrl("https://example.com/images/");
console.log(imageUrl.getUrl("my-image.png")); // Outputs: https://example.com/images/my-image.png
console.log(imageUrl.isValidUrl("https://example.com/images/my-image.png")); // Outputs: true
console.log(
  imageUrl.addParams("https://example.com/images/my-image.png", {
    size: "large",
    format: "webp",
  })
);
// Outputs: https://example.com/images/my-image.png?size=large&format=webp
