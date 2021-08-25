import { Box, Container } from "@material-ui/core";
import { usePageNavigation } from "../state/selectors"
import { PageNavigation } from "./PageNavigation";
import { PageRenderer } from "./PageRenderer";

export function ActivePage() {
    const navigation = usePageNavigation();
    return <Box flexGrow={1} marginY={2} style={{ width: 'min(100%, 560px)' }}>
        
        <PageRenderer page={navigation.activePage} />
    </Box>
}