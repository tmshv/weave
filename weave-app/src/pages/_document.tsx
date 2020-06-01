import Document, { Head, Main, NextScript } from 'next/document'
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron, getStyletronServerStylesheets } from '../styletron'

class MyDocument extends Document {
    static getInitialProps(props) {
        const page = props.renderPage((App) => (props) => (
            <StyletronProvider value={styletron} >
                <App {...props} />
            </StyletronProvider>
        ))

        const stylesheets = getStyletronServerStylesheets()
        return { ...page, stylesheets }
    }

    render() {
        const props = this.props as any
        return (
            <html>
                <Head>
                    {props.stylesheets.map((sheet, i) => (
                        <style
                            className="_styletron_hydrate_"
                            dangerouslySetInnerHTML={{ __html: sheet.css }}
                            media={sheet.attrs.media}
                            data-hydrate={sheet.attrs['data-hydrate']}
                            key={i}
                        />
                    ))}
                </Head>
                < body >
                    <Main />
                    < NextScript />
                </body>
            </html>
        )
    }
}

export default MyDocument
