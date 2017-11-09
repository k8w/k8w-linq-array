///<reference path="index.d.ts"/>

Array.prototype.remove = function (filter: (v: any, i: any, arr: any) => boolean | any): any[] {
    if (typeof (filter) == 'function') {
        for (let i = this.length - 1; i > -1; --i) {
            filter(this[i], i, this) && this.splice(i, 1);
        }
    }
    else {
        for (let i = this.length - 1; i > -1; --i) {
            this[i] === filter && this.splice(i, 1);
        }
    }

    return this;
}

Array.prototype.removeOne = function (filter: (v: any, i: any, arr: any) => boolean | any): any[] {
    if (typeof (filter) == 'function') {
        for (let i = 0; i < this.length; ++i) {
            if (filter(this[i], i, this)) {
                this.splice(i, 1);
                return this;
            }
        }
    }
    else {
        for (let i = 0; i < this.length; ++i) {
            if (this[i] === filter) {
                this.splice(i, 1);
                return this;
            }
        }
    }

    return this;
}

Array.prototype.first = function () {
    return this.length ? this[0] : null;
}

Array.prototype.last = function () {
    return this.length ? this[this.length - 1] : null;
}

Array.prototype.max = function <P>(mapper?: (v: any, i: any, arr: any) => P): P | null {
    if (!this.length) {
        return null;
    }

    function _max(a: any, b: any) {
        return a > b ? a : b;
    }

    if (typeof (mapper) == 'function') {
        let max: P = mapper(this[0], 0, this);
        for (let i = 1; i < this.length; ++i) {
            let temp = mapper(this[i], i, this);
            max = temp > max ? temp : max;
        }
        return max;
    }
    else {
        return this.reduce((prev, cur) => _max(prev, cur));
    }
}

Array.prototype.min = function <P>(mapper?: (v: any, i: any, arr: any) => P): P | null {
    if (!this.length) {
        return null;
    }

    function _min(a: any, b: any) {
        return a < b ? a : b;
    }

    if (typeof (mapper) == 'function') {
        let min: P = mapper(this[0], 0, this);
        for (let i = 1; i < this.length; ++i) {
            let temp = mapper(this[i], i, this);
            min = temp < min ? temp : min;
        }
        return min;
    }
    else {
        return this.reduce((prev, cur) => _min(prev, cur));
    }
}

Array.prototype.distinct = function () {
    return this.filter((v, i, arr) => arr.indexOf(v) === i);
}

Array.prototype.filterIndex = function (filter: any) {
    let output: number[] = [];
    for (let i = 0; i < this.length; ++i) {
        if (filter(this[i], i, this)) {
            output.push(i);
        }
    }
    return output;
}

Array.prototype.orderBy = function (...mappers: any[]) {
    return this.slice().sort((a, b) => {
        for (let i = 0; i < mappers.length; ++i) {
            let va = mappers[i](a);
            let vb = mappers[i](b);
            if (va > vb) {
                return 1;
            }
            else if (va < vb) {
                return -1;
            }
        }
        return 0;
    });
}

Array.prototype.orderByDesc = function (...mappers: any[]) {
    return this.slice().sort((a, b) => {
        for (let i = 0; i < mappers.length; ++i) {
            let va = mappers[i](a);
            let vb = mappers[i](b);
            if (va > vb) {
                return -1;
            }
            else if (va < vb) {
                return 1;
            }
        }
        return 0;
    });
}

Array.prototype.binarySearch = function (value: number | string, keyMapper?: (v: any) => (number | string)): number {
    let low = 0,
        high = this.length - 1;

    while (low <= high) {
        let mid = ((high + low) / 2) | 0;
        let midValue = keyMapper ? keyMapper(this[mid]) : this[mid];
        if (value === midValue) {
            return mid;
        } else if (value > midValue) {
            low = mid + 1;
        } else if (value < midValue) {
            high = mid - 1;
        }
    }
    return -1;
}

Array.prototype.binaryInsert = function (item: any, keyMapper?: any, unique?: boolean): number {
    if (typeof (keyMapper) == 'boolean') {
        unique = keyMapper;
        keyMapper = undefined;
    }

    let low = 0, high = this.length - 1;
    let mid: number = NaN;
    let itemValue = keyMapper ? keyMapper(item) : item;

    while (low <= high) {
        mid = ((high + low) / 2) | 0;
        let midValue = keyMapper ? keyMapper(this[mid]) : this[mid];
        if (itemValue === midValue) {
            if (unique) {
                return mid;
            }
            else {
                break;
            }
        } else if (itemValue > midValue) {
            low = mid + 1;
        } else if (itemValue < midValue) {
            high = mid - 1;
        }
    }
    let index = low > mid ? mid + 1 : mid;
    this.splice(index, 0, item);
    return index;
}

Array.prototype.binaryDistinct = function (keyMapper?: (v: any) => (number | string)) {
    return this.filter((v, i, arr) => arr.binarySearch(v, keyMapper) === i);
}

Array.prototype.findLast = function (predicate: (value: any, index: number, obj: Array<any>) => boolean): any | undefined {
    for (let i = this.length - 1; i > -1; --i) {
        if (predicate(this[i], i, this)) {
            return this[i];
        }
    }
    return undefined;
}

Array.prototype.findLastIndex = function (predicate: (value: any, index: number, obj: Array<any>) => boolean): number {
    for (let i = this.length - 1; i > -1; --i) {
        if (predicate(this[i], i, this)) {
            return i;
        }
    }
    return -1;
}