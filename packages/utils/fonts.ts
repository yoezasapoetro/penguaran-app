import { Poppins as Font } from 'next/font/google'

export const font = Font({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--joy-fontFamily-body'
})

