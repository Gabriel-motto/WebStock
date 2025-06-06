import { EVENTS } from "./utils/consts";
import { useEffect, useState } from "react";


export default function Router ({ routes= [], defaultComponent: DefaultComponent = () => <h1>404</h1>}) {
    const [ currentPath, setCurrentPath ] = useState(window.location.pathname)

    useEffect(() => {

        const onLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener(EVENTS.POPSTATE, onLocationChange)
        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)

        return () => {
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
        }
    }, [])

    const Page = routes.find(({path}) => path === currentPath)?.Component
    return Page ? <Page /> : <DefaultComponent />
}