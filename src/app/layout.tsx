"use client"

import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import './globals.css'
import {createTheme, ThemeProvider} from "@mui/material";



export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#5d24ec',
                light: '#9970ff',
                dark: '#0000b3',
                contrastText: '#fff',
            },
        },

    })

    return (
        <html lang="en">
        <body>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>

                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
