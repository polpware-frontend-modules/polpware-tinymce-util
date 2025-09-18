import EventDispatcher, { type EditorEvent, type MappedEvent } from './EventDispatcher';
interface Observable<T extends {}> {
    fire<K extends string, U extends MappedEvent<T, K>>(name: K, args?: U, bubble?: boolean): EditorEvent<U>;
    dispatch<K extends string, U extends MappedEvent<T, K>>(name: K, args?: U, bubble?: boolean): EditorEvent<U>;
    on<K extends string>(name: K, callback: (event: EditorEvent<MappedEvent<T, K>>) => void, prepend?: boolean): EventDispatcher<T>;
    off<K extends string>(name?: K, callback?: (event: EditorEvent<MappedEvent<T, K>>) => void): EventDispatcher<T>;
    once<K extends string>(name: K, callback: (event: EditorEvent<MappedEvent<T, K>>) => void): EventDispatcher<T>;
    hasEventListeners(name: string): boolean;
}
declare const Observable: Observable<any>;
export default Observable;
//# sourceMappingURL=Observable.d.ts.map