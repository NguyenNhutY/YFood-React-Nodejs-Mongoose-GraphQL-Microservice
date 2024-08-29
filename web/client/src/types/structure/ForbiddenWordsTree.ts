enum Color {
  RED,
  BLACK,
}

class RedBlackTreeNode {
  word: string;
  color: Color;
  left: RedBlackTreeNode | null = null;
  right: RedBlackTreeNode | null = null;
  parent: RedBlackTreeNode | null = null;

  constructor(word: string, color: Color) {
    this.word = word;
    this.color = color;
  }
}

export class ForbiddenWordsTree {
  root: RedBlackTreeNode | null = null;

  insert(word: string) {
    const newNode = new RedBlackTreeNode(word, Color.RED);
    if (this.root === null) {
      this.root = newNode;
      this.root.color = Color.BLACK;
    } else {
      this.insertNode(this.root, newNode);
      this.fixInsert(newNode);
    }
  }

  private insertNode(node: RedBlackTreeNode, newNode: RedBlackTreeNode) {
    if (newNode.word < node.word) {
      if (node.left === null) {
        node.left = newNode;
        newNode.parent = node;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
        newNode.parent = node;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  private rotateLeft(x: RedBlackTreeNode) {
    const y = x.right!;
    x.right = y.left;

    if (y.left !== null) {
      y.left.parent = x;
    }

    y.parent = x.parent;

    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }

    y.left = x;
    x.parent = y;
  }

  private rotateRight(y: RedBlackTreeNode) {
    const x = y.left!;
    y.left = x.right;

    if (x.right !== null) {
      x.right.parent = y;
    }

    x.parent = y.parent;

    if (y.parent === null) {
      this.root = x;
    } else if (y === y.parent.left) {
      y.parent.left = x;
    } else {
      y.parent.right = x;
    }

    x.right = y;
    y.parent = x;
  }

  private fixInsert(node: RedBlackTreeNode) {
    while (node !== this.root && node.parent!.color === Color.RED) {
      if (node.parent === node.parent!.parent!.left) {
        const uncle = node.parent!.parent!.right;

        if (uncle !== null && uncle.color === Color.RED) {
          node.parent!.color = Color.BLACK;
          uncle.color = Color.BLACK;
          node.parent!.parent!.color = Color.RED;
          node = node.parent!.parent!;
        } else {
          if (node === node.parent!.right) {
            node = node.parent!;
            this.rotateLeft(node);
          }

          node.parent!.color = Color.BLACK;
          node.parent!.parent!.color = Color.RED;
          this.rotateRight(node.parent!.parent!);
        }
      } else {
        const uncle = node.parent!.parent!.left;

        if (uncle !== null && uncle.color === Color.RED) {
          node.parent!.color = Color.BLACK;
          uncle.color = Color.BLACK;
          node.parent!.parent!.color = Color.RED;
          node = node.parent!.parent!;
        } else {
          if (node === node.parent!.left) {
            node = node.parent!;
            this.rotateRight(node);
          }

          node.parent!.color = Color.BLACK;
          node.parent!.parent!.color = Color.RED;
          this.rotateLeft(node.parent!.parent!);
        }
      }
    }

    this.root!.color = Color.BLACK;
  }

  search(word: string): boolean {
    return this.searchNode(this.root, word);
  }

  private searchNode(node: RedBlackTreeNode | null, word: string): boolean {
    if (node === null) {
      return false;
    }
    if (word === node.word) {
      return true;
    }
    if (word < node.word) {
      return this.searchNode(node.left, word);
    } else {
      return this.searchNode(node.right, word);
    }
  }
}
