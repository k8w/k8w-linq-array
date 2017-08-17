//Extend Array
interface Array<T>{
    remove(filter:(v:T,i:number,arr:Array<T>)=>boolean): Array<T>;
    remove(filter:T): Array<T>;
    
    removeOne(filter:(v:T,i:number,arr:Array<T>)=>boolean): Array<T>;
    removeOne(filter:T): Array<T>;

    first(): T;
    last(): T;

    max(): T;
    max<P>(mapper: (v:T,i:number,arr:this)=>P): P|null;

    min(): T;
    min<P>(mapper: (v:T,i:number,arr:this)=>P): P|null;

    distinct(): Array<T>;
    filterIndex(filter:(v:T, i:number, arr:this)=>boolean): Array<number>;

    //排序 返回新的数组
    orderBy(...mappers: ((v:T)=>any)[]): Array<T>;
    orderByDesc(...mappers: ((v:T)=>any)[]): Array<T>;

    //二分专用
    binIndexOf(filter: T): number;
}