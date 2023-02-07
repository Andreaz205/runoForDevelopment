
export const accentColor = 'rgba(255,228,23,0.93)'
export const bgColor = '#eee'

export const IS_SERVER = typeof window === 'undefined'
export const IS_CLIENT = typeof window !== 'undefined'
export const IS_PRODUCTION = process.env.APP_ENV === 'production'