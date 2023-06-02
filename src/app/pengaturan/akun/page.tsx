import { UserProfile } from '@clerk/nextjs'
import { UserProfileTheme } from '@clerk/types'

const userProfileAppearance: UserProfileTheme = {
    layout: {
        shimmer: true
    },
    elements: {
        pageScrollBox: {
            padding: '1rem'
        },
        navbarMobileMenuRow: {
            marginTop: '-1rem'
        },
        navbarMobileMenuButton: {
            display: 'none'
        },
        page: {
            gap: '1rem',
        },
        profilePage: {
            gap: '1rem',
        }
    }
}

export default function Akun() {
    return (
        <div className='flex flex-col items-center justify-center my-2'>
            <UserProfile
                appearance={userProfileAppearance}
            />
        </div>
    )
}
