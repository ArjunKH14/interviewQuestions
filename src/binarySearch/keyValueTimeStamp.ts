class TimeMap {
  private stringMap: Map<string, [string[], number[]]>;
  constructor() {
    this.stringMap = new Map();
  }

  set(key: string, value: string, timestamp: number): void {
    if (this.stringMap.has(key)) {
      let map = this.stringMap.get(key);
      map[0].push(value);
      map[1].push(timestamp);
      this.stringMap.set(key, map);
    } else this.stringMap.set(key, [[value], [timestamp]]);
  }

  get(key: string, timestamp: number): string {
    if (!this.stringMap.has(key)) {
      return "";
    }

    let map = this.stringMap.get(key);

    let timestamps = map[1];

    let left = 0,
      right = timestamps.length - 1;

    let timeIndex = -1;
    if (timestamps.length === 0) {
      return "";
    }

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (timestamp == timestamps[mid]) {
        timeIndex = mid;
        break;
      } else if (timestamp > timestamps[mid]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    let value =
      timeIndex >= 0 ? map[0][timeIndex] : right > -1 ? map[0][right] : "";
    return value;
  }
}
let timeMap: TimeMap = new TimeMap();
timeMap.set("love", "high", 10); // store the key "foo" and value "bar" along with timestamp = 1.
timeMap.set("love", "low", 20); // store the key "foo" and value "bar" along with timestamp = 1.
console.log(timeMap.get("love", 5)); // return "bar"
console.log(timeMap.get("love", 10)); // return "bar"
console.log(timeMap.get("love", 15)); // return "bar"
console.log(timeMap.get("love", 20)); // return "bar"
console.log(timeMap.get("love", 25)); // return "bar"
console.log(timeMap.get("foo", 3)); // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
console.log(timeMap.get("foo", 4)); // return "bar2"
console.log(timeMap.get("foo", 5)); // return "bar2"
