export function errorTimeout(msg, func) {
    if (msg !== '') {
        setTimeout(() => func(''), 10000)
    }
}
