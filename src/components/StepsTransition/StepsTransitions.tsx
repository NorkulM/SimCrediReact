import { easing, Fade, Slide, SlideProps } from "@mui/material"

export interface Props {
    children: SlideProps["children"],
    direction: "up" | "down";
    index: number;
    currentStep: number;
}

const StepsTransitions = ({
    children,
    direction,
    currentStep,
    index,
}: Props) => {
    return (
        <Fade
            in={currentStep === index}
            appear={false}
            easing={easing.sharp}
            timeout={1000}
            mountOnEnter
            unmountOnExit
        >
            <div>
                <Slide
                    in={currentStep === index}
                    direction={direction}
                    timeout={1000}
                    easing={easing.sharp}
                >
                    {children}
                </Slide>
            </div>
        </Fade>
    )
}

export default StepsTransitions
