import { AppProps } from 'next/app'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, DarkTheme, BaseProvider } from 'baseui';
import { styletron, debug } from '../styletron'

export default function MyApp(props: AppProps) {
    const { Component, pageProps } = props

    return (
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
            <BaseProvider theme={LightTheme}>
            {/* <BaseProvider theme={DarkTheme}> */}
                <Component {...pageProps} />
            </BaseProvider>
        </StyletronProvider>
    )
}
