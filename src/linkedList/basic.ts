export class ListNode<T> {
  public next: ListNode<T> | null = null;
  val: T;

  constructor(data: T) {
    this.val = data;
  }
}

export interface ILinkedList<T> {
  insertInBegin(data: T): ListNode<T>;
  insertAtEnd(data: T): ListNode<T>;
  deleteNode(key: T): void;
  traverse(): T[];
  size(): number;
  search(data: T): ListNode<T> | null;
}

export class LinkedList<T> implements ILinkedList<T> {
  public head: ListNode<T> | null = null;
  constructor(head: ListNode<T>) {
    this.head = head;
  }
  insertInBegin(data: T): ListNode<T> {
    let newNode = new ListNode(data);

    newNode.next = this.head;
    this.head = newNode;

    return newNode;
  }
  insertAtEnd(data: T): ListNode<T> {
    let newNode = new ListNode(data);

    let current = this.head;
    if (current === null) return newNode;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = newNode;
    return current;
  }
  deleteNode(key: T): void {
    let current = this.head,
      prev = null;
    while (current !== null && current.val !== key) {
      prev = current;
      current = current.next;
    }

    if (current === null) {
      console.log("Key not found to delete");
      return;
    }

    prev.next = current.next;
  }
  traverse(): T[] {
    let current = this.head;
    let values: T[] = [];
    if (current === null) return values;

    while (current !== null) {
      values.push(current.val);
      current = current.next;
    }
    return values;
  }
  size(): number {
    let current = this.head;
    let size = 0;
    if (current === null) return size;

    while (current !== null) {
      size += 1;
      current = current.next;
    }
    return size;
  }
  search(data: T): ListNode<T> {
    let current = this.head;
    while (current !== null) {
      if (current.val === data) {
        console.log("Key Found");
        return current;
      }
      current = current.next;
    }
    console.log("No key found");
    return null;
  }

  reverseList(head: ListNode<T> | null): ListNode<T> | null {
    let current = head;

    if (current === null) {
      return current;
    }

    let newHead: ListNode<T> = null,
      temp: ListNode<T> = null;

    while (current !== null) {
      console.log(current.val);
      temp = current.next;
      current.next = newHead;
      newHead = current;
      current = temp;
    }
    this.head = newHead;
    return temp;
  }

  mergeTwoLists(
    list1: ListNode<T> | null,
    list2: ListNode<T> | null
  ): ListNode<T> | null {
    if (list1 === null && list2 === null) return null;
    let [list3Head, list3] = [null, null];
    while (list1 !== null || list2 !== null) {
      if (list1 === null) {
        list3 !== null ? (list3.next = list2) : (list3Head = list2);
        break;
      }
      if (list2 === null) {
        list3 !== null ? (list3.next = list1) : (list3Head = list1);
        break;
      }
      let temp = list3;
      if (list1.val < list2.val) {
        list3 = list1;
        list1 = list1.next;
      } else {
        list3 = list2;
        list2 = list2.next;
      }

      if (temp !== null) {
        temp.next = list3;
      } else {
        list3Head = list3;
      }
    }
    return list3Head;
  }
  hasCycle(head: ListNode<T> | null): boolean {
    if (!head) return false;

    let slow = null,
      fast = null;

    slow = head;
    fast = head.next;
    let size = 1;
    while (slow !== null && fast !== null) {
      size += 1;
      if (slow === fast) {
        return true;
      }
      slow = slow.next ?? null;
      fast = fast?.next?.next ?? null;
    }
    return false;
  }
  reorderList(head: ListNode<T> | null): void {
    if (head == null) {
      return;
    }

    let fast1 = head,
      fast2 = head.next;

    let nodeMap = {};
    let fsize = 1;
    while (fast1 !== null) {
      nodeMap[fsize] = fast1;
      fast1 = fast1?.next?.next ?? null;
      if (fast1) fsize += 2;
    }
    let f2size = 2;
    while (fast2 !== null) {
      nodeMap[f2size] = fast2;
      fast2 = fast2?.next?.next ?? null;
      if (fast2) f2size += 2;
    }
    fsize = Math.max(fsize, f2size);

    let newHead = null,
      temp = null;

    for (let i = 0; i <= Math.floor(fsize / 2); i++) {
      let first = nodeMap[i],
        second = nodeMap[fsize - i];

      if (i == 0) {
        newHead = first;
        temp = first;
      } else {
        temp.next = first;
      }

      if (first !== second) {
        first.next = second;
        temp = second;
      }
    }
    head = newHead;
  }
}
let headNode = new ListNode(2);
let list = new LinkedList(headNode);

list.insertInBegin(4);
list.insertInBegin(1);
list.insertAtEnd(24);
list.insertAtEnd(35);

list.search(24);

list.deleteNode(24);

console.log(list.size());
console.log(list.traverse());
list.reverseList(list.head);
console.log(list.traverse());
