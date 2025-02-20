function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let pointer1 = 0,
    pointer2 = 0;

  let mergedArray = [];
  while (pointer1 < nums1.length && pointer2 < nums2.length) {
    if (nums1[pointer1] < nums2[pointer2]) {
      mergedArray.push(nums1[pointer1]);
      pointer1++;
    } else {
      mergedArray.push(nums2[pointer2]);
      pointer2++;
    }
  }

  if (pointer1 !== nums1.length) {
    mergedArray.push(...nums1.slice(pointer1));
  } else {
    mergedArray.push(...nums2.slice(pointer2));
  }
  let mid;
  if (mergedArray.length % 2 == 0) {
    mid = Math.floor(mergedArray.length / 2);

    return (mergedArray[mid] + mergedArray[mid - 1]) / 2;
  } else {
    mid = Math.floor(mergedArray.length / 2);
    return mergedArray[mid];
  }
}

console.log(findMedianSortedArrays([1, 3], [2]));
console.log(findMedianSortedArrays([1, 2], [3, 4]));
