import '../../../dist/types/stencil.core';
export declare class SwavePlayer {
    audioUrl: string;
    title: string;
    private plays;
    private currentTime;
    private totalTime;
    private element;
    private swave;
    componentWillLoad(): void;
    componentDidLoad(): void;
    play(): void;
    stop(): void;
    pause(): void;
    setProgress(e: any): void;
    fastForward(): void;
    fastBackward(): void;
    togglePlay(): void;
    render(): JSX.Element;
}
