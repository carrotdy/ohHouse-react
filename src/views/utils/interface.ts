export interface ICssProps {
    [index: string]: string | number | { [index: string]: string | number };
}

export interface IDecoratorProps {
    css: {
        zIndex?: number;
        pc: {
            width: string;
            height: string;
            top?: string;
            left?: string;
            right?: string;
            bottom?: string;
        },
        tablet: {
            width: string;
            height: string;
            top?: string;
            left?: string;
            right?: string;
            bottom?: string;
        },
        mobile: {
            width: string;
            height: string;
            top?: string;
            left?: string;
            right?: string;
            bottom?: string;
        }
    }
};

export interface ICheckBoxItemsContainerProps {
    containerHeight: {
        pc: string;
        tablet: string;
        mobile: string;
    }
};

export interface ISlideProps {
    showMobileSlide: boolean;
};

export interface ISlideMenuProps {
    showMobileSlide: boolean;
    setShowMobileSlide: (arg: boolean) => void;
};

export interface IPCModalProps {
    showPCModal: boolean;
    setShowPCModal: (arg: boolean) => void;
}