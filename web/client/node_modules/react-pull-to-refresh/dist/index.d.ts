import { HTMLAttributes, ReactNode } from 'react';

interface ReactPullToRefreshProps extends HTMLAttributes<HTMLDivElement> {
    onRefresh: () => Promise<void>;
    icon?: ReactNode;
    loading?: ReactNode;
    disabled?: boolean;
    distanceToRefresh?: number;
    resistance?: number;
    hammerOptions?: HammerOptions;
}
declare function ReactPullToRefresh(props: ReactPullToRefreshProps): JSX.Element;

export { ReactPullToRefreshProps, ReactPullToRefresh as default };
