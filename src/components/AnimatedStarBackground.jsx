import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const AnimatedStarBackground = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <div className="absolute inset-0 z-0" style={{ transform: "translateY(-100px)" }}>
            <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            height={"600px"}
            options={{
                background: {
                    color: {
                        value: "#0a1126",
                    },
                },
                fullScreen: {
                    enable: false,
                    zIndex: 1,
                },
                height: "100vh",
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 0,
                        },
                        repulse: {
                            distance: 0,
                            duration: 1,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 100,
                        enable: true,
                        opacity: 0.1,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: true,
                        speed: .5,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 1200,
                        },
                        value: 150,
                    },
                    opacity: {
                        value: 0.3,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: .5, max: 1 },
                    },
                },
                detectRetina: true,
            }}
        />
        </div>
        
    );
};

export default AnimatedStarBackground;