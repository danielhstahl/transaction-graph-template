//todo: add production url
const baseUrl = process.env.NODE_ENV === 'production' ? '' : ''
//testing for now
export const getResults = () => fetch(`${baseUrl}/account/123`).then(res => res.text()).then(r => console.log(r)).catch(e => console.log(e))