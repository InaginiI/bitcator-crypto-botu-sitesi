import { Provider } from "@/components/ui/provider"

export default function RootLayout({ children }) {
    return (
        <html suppressHydrationWarning>
            <body>
                <Provider>
                    <main>{children}</main>
                </Provider>
            </body>
        </html>
    )
}


