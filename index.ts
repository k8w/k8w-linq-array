///<reference path="index.d.ts"/>

const extendFuncs = {
    remove: function (this: any[], filter: (v: any, i: any, arr: any) => boolean | any): any[] {
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
    },

    removeOne: function (this: any[], filter: (v: any, i: any, arr: any) => boolean | any): any[] {
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
    },

    first: function (this: any[]) {
        return this.length ? this[0] : null;
    },

    last: function (this: any[]) {
        return this.length ? this[this.length - 1] : null;
    },

    max: function <P>(this: any[], mapper?: (v: any, i: any, arr: any) => P): P | null {
        if (!this.length) {
            return null;
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
            return this.reduce((prev: any, cur: any) => prev > cur ? prev : cur);
        }
    },

    min: function <P>(this: any[], mapper?: (v: any, i: any, arr: any) => P): P | null {
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
            return this.reduce((prev: any, cur: any) => _min(prev, cur));
        }
    },

    distinct: function (this: any[]) {
        return this.filter((v: any, i: number, arr: any[]) => arr.indexOf(v) === i);
    },

    filterIndex: function (this: any[], filter: any) {
        let output: number[] = [];
        for (let i = 0; i < this.length; ++i) {
            if (filter(this[i], i, this)) {
                output.push(i);
            }
        }
        return output;
    },

    count: function (this: any[], filter: (v: any, i: number, arr: any[]) => boolean): number {
        let result = 0;
        for (let i = 0; i < this.length; ++i) {
            if (filter(this[i], i, this)) {
                ++result;
            }
        }
        return result;
    },

    sum: function (this: any[], mapper?: (v: any, i: number, arr: any[]) => number): number {
        let result = 0;
        for (let i = 0; i < this.length; ++i) {
            result += mapper ? mapper(this[i], i, this) : this[i];
        }
        return result;
    },

    average: function (this: any[], mapper?: (v: any, i: number, arr: any[]) => number): number {
        return this.sum(mapper) / this.length;
    },

    orderBy: function (this: any[], ...mappers: any[]) {
        return this.slice().sort((a: any, b: any) => {
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
    },

    orderByDesc: function (this: any[], ...mappers: any[]) {
        return this.slice().sort((a: any, b: any) => {
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
    },

    binarySearch: function (this: any[], value: number | string, keyMapper?: (v: any) => (number | string)): number {
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
    },

    binaryInsert: function (this: any[], item: any, keyMapper?: any, unique?: boolean): number {
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
    },

    binaryDistinct: function (this: any[], keyMapper?: (v: any) => (number | string)) {
        return this.filter((v: any, i: number, arr: any[]) => arr.binarySearch(v, keyMapper) === i);
    },

    findLast: function (this: any[], predicate: (value: any, index: number, obj: Array<any>) => boolean): any | undefined {
        for (let i = this.length - 1; i > -1; --i) {
            if (predicate(this[i], i, this)) {
                return this[i];
            }
        }
        return undefined;
    },

    findLastIndex: function (this: any[], predicate: (value: any, index: number, obj: Array<any>) => boolean): number {
        for (let i = this.length - 1; i > -1; --i) {
            if (predicate(this[i], i, this)) {
                return i;
            }
        }
        return -1;
    },

    groupBy: function (this: any[], grouper: (v: any) => string): any[] & { key: any } {
        let group = this.reduce((prev: any, next: any) => {
            let groupKey = grouper(next);
            if (!prev[groupKey]) {
                prev[groupKey] = [];
            }
            prev[groupKey].push(next)
            return prev;
        }, {});
        return Object.keys(group).map(key => {
            let arr = group[key];
            arr.key = key;
            return arr;
        }) as any
    },

    __k8w_extended: {
        value: true
    }
};

if (!(Array.prototype as any).__k8w_extended) {
    for (let key in extendFuncs) {
        Object.defineProperties(Array.prototype, {
            [key]: {
                value: extendFuncs[key as keyof typeof extendFuncs],
                writable: true
            }
        });
    }
}