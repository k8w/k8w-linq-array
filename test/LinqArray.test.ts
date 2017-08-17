import '../index';
const assert = require('assert');

describe('LinqArray', function(){
    it('distinct', function(){
        assert.deepEqual([1,1,2,3,2,3,3,2,3,1,3,4,2,5,3,4,3,1,4,5,1,2,3,4,5,1,4,3,1,3,2,4,1,5,3].distinct(),[1,2,3,4,5])
        assert.deepEqual([1,'2',true,null,undefined,{},[1,2,3],1,'2',true,null,undefined,{},[1,2,3]].distinct(),
            [1,'2',true,null,undefined,{},[1,2,3],{},[1,2,3]]
        )
    })

    it('max', function () {
        assert.equal([4,9,5,1,3].max(), 9);
        assert.equal([4,9,5,1,3].max(v=>v*2), 18);
        assert.equal([999999,1,2,3,6].max((v,i)=>v*i), 24);
        assert.equal([4,9,5,1,3].max((v,i,arr)=>arr[i]+1), 10);
    })

    it('min', function () {
        assert.equal([4,9,5,1,3].min(), 1);
        assert.equal([4,9,5,1,3].min(v=>v*2), 2);
        assert.equal([999999,1,2,3,6].min((v,i)=>v*i), 0);
        assert.equal([4,9,5,1,3].min((v,i,arr)=>arr[i]+1), 2);
    })

    it('filterIndex', function(){
        assert.deepEqual([10,20,30,40,50].filterIndex(v=>v>30), [3,4])
        assert.deepEqual([13,14,16,18,20].filterIndex((v,i,arr)=>(v+i*arr.length)%2==1), [0,1,3]);
    })

    it('orderBy', function(){
        let a = [
            {a:6, b:5},
            {a:4, b:3},
            {a:6, b:1},
            {a:2, b:9},
            {a:4, b:7}
        ];
        assert.deepEqual(a.orderBy(v=>v.a), [
            {a:2, b:9},
            {a:4, b:3},
            {a:4, b:7},
            {a:6, b:5},
            {a:6, b:1}
        ]);
        assert.deepEqual(a.orderBy(v=>v.a, v=>v.b), [
            {a:2, b:9},
            {a:4, b:3},
            {a:4, b:7},
            {a:6, b:1},
            {a:6, b:5}
        ]);
        assert.deepEqual(a.orderByDesc(v=>v.b), [
            {a:2, b:9},
            {a:4, b:7},
            {a:6, b:5},
            {a:4, b:3},
            {a:6, b:1}
        ]);
        assert.deepEqual(a.orderByDesc(v=>v.a, v=>v.b), [
            {a:6, b:5},
            {a:6, b:1},
            {a:4, b:7},
            {a:4, b:3},
            {a:2, b:9}
        ]);
    }),

    it('binIndexOf', function(){
        let arr = [1,1,20,20,20,21,30,30,40,50,50,50];
        assert.equal(arr.binIndexOf(30), 6)
        assert.equal(arr.binIndexOf(31), -1)
        assert.equal(arr.binIndexOf(1), 0)
        assert.equal(arr.binIndexOf(50), 10)
        assert.equal(arr.binIndexOf(20), 2)
    })
});