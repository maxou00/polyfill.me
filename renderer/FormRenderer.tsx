import { Box, useMediaQuery } from "@material-ui/core";
import { useContext } from "react";
import { createContext } from "react";
import { SingleFlowLayout } from "./SingleFlowLayout";
import { TwoSideLayout } from "./TwoSideLayout";

const RenderingModeContext = createContext({ mode: 'preview' });

export function useRenderingMode() {
    return useContext(RenderingModeContext);
}

export function FormRenderer(props: { preview: boolean }) {
    const matchTabletAndDown = useMediaQuery("screen and (max-width:960px)");
    return <RenderingModeContext.Provider value={{ mode: props.preview ? "preview" : "live" }}>
        <Box>
            {matchTabletAndDown && <SingleFlowLayout />}
            {!matchTabletAndDown && <TwoSideLayout />}
        </Box>
    </RenderingModeContext.Provider>
}