import { useEffect, useState } from 'react'

export function useError() {
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (errorMessage === '') return

        const timer = setTimeout(() => setErrorMessage(''), 10000)
        return () => clearTimeout(timer)
    }, [errorMessage])

    return [errorMessage, setErrorMessage]
}
