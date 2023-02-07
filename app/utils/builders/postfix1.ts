export const postfix1 = (amount: number) => {
    if (amount < 0) return 'ов'
    if (amount % 10 === 0) return 'ов'
    if (amount % 10 === 1) return ''
    if (amount % 10 >= 2 && amount % 10 < 5) return 'a'
    if (amount % 10 >= 5) return 'ов'
}