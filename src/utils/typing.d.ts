export type LoggerColor =
    | 'black'
    | 'blue'
    | 'blueBright'
    | 'cyan'
    | 'cyanBright'
    | 'gray'
    | 'green'
    | 'greenBright'
    | 'magenta'
    | 'magentaBright'
    | 'red'
    | 'redBright'
    | 'white'
    | 'whiteBright'
    | 'yellow'
    | 'yellowBright';

export type Optional<O, K extends keyof O> = Omit<O, K> & Partial<Pick<O, K>>