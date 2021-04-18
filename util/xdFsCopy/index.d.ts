/**
creates a copy of `src` file or directory at `dst` path
- both `src` and `dst` paths must be absolute.
- if `dst` already exists, it is removed before `src` is copied - directories aren't merged
*/
export declare function xdFsCopy(src: string, dst: string, __isRecursiveCall?: boolean): void;
