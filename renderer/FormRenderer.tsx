import { Box, useMediaQuery } from "@material-ui/core";
import { SingleFlowLayout } from "./SingleFlowLayout";
import { TwoSideLayout } from "./TwoSideLayout";

export function FormRenderer() {

    const matchTabletAndDown = useMediaQuery("screen and (max-width:960px)");
    return <Box>
        {matchTabletAndDown && <SingleFlowLayout />}
        {!matchTabletAndDown && <TwoSideLayout />}
    </Box>
}