
export const StatusAbandonos = new Map<string, string>([
    ['Finished', 'Finished'],
    ['Lapped', 'Lap'],
])

export const ReglaPuntajeAciertos = new Map<number, number>([
    [1, 1],
    [2, 3],
    [3, 6],
    [4, 12],
    [5, 20],
])

export const ReglaPuntajeAbandono =  new Map<number, number>([
    [1, 1],
    [2, 4],
    [3, 6]
])

export const ReglaPuntajePenalidadAbandonos =  new Map<number, number>([
    [1, 1],
    [2, 3],
    [3, 6],
    [4, 10],
    [5, 20]
])

export const ReglaCarrerasPuntajeDoble =  new Map<string, string>([
    ["yas_marina", "Yas Marina"],
    ["monaco", "Monaco"],
    ["baku", "Baku"],
])

export const ReglaMultiplicadorAbandonoMitadCarrera = 4
export const ReglaMultiplicadorAbandonoCaotico = 5
export const ReglaCantidadAciertosMitadCarreraParaGanar = 3
export const ReglaCantidadAciertosAbandonoCaoticoParaGanar = 3
export const ReglaCantidadPuntosPenalidadPorCadaAbandono = 5