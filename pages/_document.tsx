import { ServerStyleSheets } from "@material-ui/core";
import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document";
import { Children } from "react";

class MainDocument extends Document {

    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () => originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
        })

        return {
            ...initialProps,
            styles: [...Children.toArray(initialProps.styles), sheets.getStyleElement()]
        }
    }

    render() {
        return (
            <Html>
                <Head/>
                <body>
                    <Main />
                    <NextScript />
                    <div id="modal-root"></div>
                </body>
            </Html>
        );
    }
}



export default MainDocument;