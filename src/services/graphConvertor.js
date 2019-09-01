//todo: add production url
const baseUrl = process.env.NODE_ENV === 'production' ? '' : ''
export const getTransactions = (
    accountId, interactionLevel, dollarAmount, days
) => fetch(
    `${baseUrl}/account/${accountId}?interaction_level=${interactionLevel}&transaction_amount=${dollarAmount}&days=${days}`)
    .then(res => res.json())