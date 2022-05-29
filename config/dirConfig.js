export const DIR_CONFIG = () => {
    const DIR_PC = {
      assets: 'assets-pc',
      components: 'components-pc',
      pages: 'pages-pc',
    }
    const DIR_MO = {
      assets: 'assets-mo',
      components: 'components-mo',
      pages: 'pages-mo',
    }
    return process.env.DEVICE === 'pc' ? DIR_PC : DIR_MO
}