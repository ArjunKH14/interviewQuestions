function checkInclusion(s1: string, s2: string): boolean {
  let s1Map = new Map();
  for (let char of s1) {
    s1Map.set(char, (s1Map.get(char) || 0) + 1);
  }

  let start = 0,
    end = 0,
    includes = false;
  let windowMap: Map<string, number> = new Map();

  while (end < s2.length) {
    let charFreq = (windowMap.get(s2[end]) || 0) + 1;
    if (s1Map.has(s2[end])) {
      windowMap.set(s2[end], charFreq);
      if (s1Map.get(s2[end]) - charFreq < 0) {
        while (windowMap.get(s2[end]) !== s1Map.get(s2[end])) {
          windowMap.set(s2[start], windowMap.get(s2[start]) - 1);
          start += 1;
        }
      }
    } else {
      start = end;
      windowMap.clear();
    }
    end += 1;
    if (s1Map.size === windowMap.size) {
      includes = true;
      for (let key of s1Map.keys()) {
        if (s1Map.get(key) !== windowMap.get(key)) {
          includes = false;
          break;
        }
      }
    }
    if (includes) {
      return includes;
    }
  }
  return false;
}

let s1 = "ab",
  s2 = "eidbaooo";
console.log(checkInclusion(s1, s2));

s2 = "eidboaoo";
console.log(checkInclusion(s1, s2));

(s1 = "hello"), (s2 = "ooolleoooleh");

console.log(checkInclusion(s1, s2));

(s1 = "adc"), (s2 = "dcda");
console.log(checkInclusion(s1, s2));
