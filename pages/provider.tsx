import * as React from "react";
import {
    CssVarsProvider as JoyCssVarsProvider,
    extendTheme as extendJoyTheme
} from "@mui/joy/styles"
import {
    Experimental_CssVarsProvider as MaterialCssVarsProvider,
    experimental_extendTheme as extendMaterialTheme,
    THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles"

const joyTheme = extendJoyTheme({
    components: {
        JoyIconButton: {
            styleOverrides: {
                root: () => ({
                    ["&:active, &:hover"]: {
                        backgroundColor: "unset",
                    }
                })
            }
        }
    }
})

const materialTheme = extendMaterialTheme()

export function UIProvider({ children }: { children: React.ReactNode }) {
    return (
        <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
            <JoyCssVarsProvider theme={joyTheme}>
                {children}
            </JoyCssVarsProvider>
        </MaterialCssVarsProvider>
    );
}
