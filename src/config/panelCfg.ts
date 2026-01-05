
export interface ArcOption {
    color?: string;
    field?: string;
}

export enum ZoomMode {
}

export enum LayoutAlgorithm {
    Layered = 'layered',
}

export interface Options {
    zoomMode?: ZoomMode;

    layoutAlgorithm?: LayoutAlgorithm;

    nodes?: {
        mainStatUnit?: string;
        secondaryStatUnit?: string;
        arcs?: Array<ArcOption>;
    };

    edges?: {
        mainStatUnit?: string;
        secondaryStatUnit?: string;
    };
}