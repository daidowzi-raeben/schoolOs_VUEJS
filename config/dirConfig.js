export const DIR_CONFIG = () => {
    const DIR_PC = {
        assets: 'assets-pc',
        components: 'components-pc',
        pages: 'pages-pc',

    }
    return process.env.DEVICE === 'pc' ? DIR_PC : DIR_PC
}