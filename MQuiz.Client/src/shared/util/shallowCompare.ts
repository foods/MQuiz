/**
 *
 * @param obj1
 * @param obj2
 * @returns true if obj1 and obj2 are equal (shallow compare)
 */
const shallowCompare = (obj1: object, obj2: object) =>
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(
        (key) =>
            Object.prototype.hasOwnProperty.call(obj2, key) &&
            obj1[key as keyof typeof obj1] === obj2[key as keyof typeof obj2],
    );

export default shallowCompare;
