const Configs = { }

const StaticImages = {
    googleCloudLogo320: 'https://firebasestorage.googleapis.com/v0/b/abyss-todo.appspot.com/o/public%2Fgoogle-cloud-logo-320.png?alt=media&token=0118f2df-dfbc-461c-9fd2-e244829e4bff',
    googleCloudLogo160: 'https://firebasestorage.googleapis.com/v0/b/abyss-todo.appspot.com/o/public%2Fgoogle-cloud-logo-160.png?alt=media&token=94c00b0c-668e-44f1-9891-287878af63c0',
    screenshot01: 'https://firebasestorage.googleapis.com/v0/b/abyss-todo.appspot.com/o/public%2Fscreenshot01.png?alt=media&token=92042a2e-ebb6-4acf-8d50-e08218d1db40',
    screenshot02: 'https://firebasestorage.googleapis.com/v0/b/abyss-todo.appspot.com/o/public%2Fscreenshot02.png?alt=media&token=79e9c6c0-f1c0-4d75-8213-ab0a45702ccf',
    user01: 'https://firebasestorage.googleapis.com/v0/b/abyss-todo.appspot.com/o/public%2Fusers%2Fuser01.jpeg?alt=media&token=3ae9fe8f-9f35-42f9-9990-47397ea5ce7a',
    user02: 'https://firebasestorage.googleapis.com/v0/b/abyss-todo.appspot.com/o/public%2Fusers%2Fuser02.jpeg?alt=media&token=fee08489-6bf8-418d-9238-1538a02cd16d',
    user03: 'https://firebasestorage.googleapis.com/v0/b/abyss-todo.appspot.com/o/public%2Fusers%2Fuser03.jpeg?alt=media&token=bde8db37-8344-4351-b85f-3aac828d3522',
    user04: 'https://firebasestorage.googleapis.com/v0/b/abyss-todo.appspot.com/o/public%2Fusers%2Fuser04.jpeg?alt=media&token=65934658-218c-4f9d-aa6e-4b39688e4849',
    user05: 'https://firebasestorage.googleapis.com/v0/b/abyss-todo.appspot.com/o/public%2Fusers%2Fuser05.jpeg?alt=media&token=f462760a-5398-42fa-b8dd-b6095c8c4c21',
    user06: 'https://firebasestorage.googleapis.com/v0/b/abyss-todo.appspot.com/o/public%2Fusers%2Fuser06.jpeg?alt=media&token=77f2c32e-ea08-47d4-a980-0390fe059c40'
}

const StaticRoutes = {
    HOME: '/',
    TODO: '/todo',
    ARCHIVE: '/archive',
    TEAM: '/team',
    PRIVACY: '/privacy',
    TERMS: '/terms',
    LINK_ACCOUNT: '/linkAccount',
    NOT_FOUND: '/404',
    CONTACT_EMAIL: 'mailto:support@wisetreeapps.com'
}

const StandardPadding = {
    PX: 2,
    PY: 2
}

const LargePadding = {
    PX: 4,
    PY: 4
}

const ContentWidth = {
    SM: 12,
    MD: 6
}

const DateFormat = {
    DefaultFormat: "YYYY-MM-DD"
}

const MaxFocusItems = 3

export default Configs
export { DateFormat, StaticImages, StandardPadding, LargePadding, ContentWidth, StaticRoutes, MaxFocusItems }