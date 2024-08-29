class TrieNode {
  children: { [key: string]: TrieNode } = {};
  isEndOfCode: boolean = false;
  promoCodeData: {
    discount: number;
    description: string;
    expiryDate: string;
  } | null = null;
}
export class PromoCodeTrie {
  root: TrieNode = new TrieNode();

  insert(promoCode: {
    code: string;
    discount: number;
    description: string;
    expiryDate: string;
  }) {
    let node = this.root;
    for (const char of promoCode.code) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfCode = true;
    node.promoCodeData = {
      discount: promoCode.discount,
      description: promoCode.description,
      expiryDate: promoCode.expiryDate,
    };
  }

  search(
    code: string
  ): { discount: number; description: string; expiryDate: string } | null {
    let node = this.root;
    for (const char of code) {
      if (!node.children[char]) {
        return null;
      }
      node = node.children[char];
    }
    if (node.isEndOfCode && node.promoCodeData) {
      return node.promoCodeData;
    }
    return null;
  }
}
