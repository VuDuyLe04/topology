export enum ZoomMode {
}

export enum LayoutAlgorithm {
    LayeredTopDown = 'layered-top-down',
    LayeredBottomUp = 'layered-bottom-up',
    LayeredRightLeft = 'layered-right-left',
    LayeredLeftRight = 'layered-left-right',
}

export interface Options {
    zoomMode?: ZoomMode;

    layoutAlgorithm?: LayoutAlgorithm;

    theme?: string;

    nodes?: {
        mainStatUnit?: string;
        secondaryStatUnit?: string;
    };

    edges?: {
        mainStatUnit?: string;
        secondaryStatUnit?: string;
    };
    // eslint-disable-next-line eol-last
}