export interface DataState<T> {
    data: T;
    hasError: boolean;
    isLoading: boolean;
    message: string | undefined;
}
export default function useDataState<T, K>(action: (prevData: T, ...input: K[]) => T | Promise<T>, initialData: T): [state: DataState<T>, handleAction: (...input: K[]) => void];
