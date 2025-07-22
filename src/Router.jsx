import { EVENTS } from "./utils/consts";
import { useEffect, useState } from "react";

function matchRoute(path, routePath) {
    if (path === routePath) return { match: true, params: {} };
    const routeParts = routePath.split("/");
    const pathParts = path.split("/");
    if (routeParts.length !== pathParts.length) return { match: false };
    let params = {};
    for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(":")) {
            params[routeParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
        } else if (routeParts[i] !== pathParts[i]) {
            return { match: false };
        }
    }
    return { match: true, params };
}

export default function Router ({ routes= [], defaultComponent: DefaultComponent = () => <h1>404</h1>}) {
    const [ currentPath, setCurrentPath ] = useState(window.location.pathname)

    useEffect(() => {

        const onLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.addEventListener(EVENTS.POPSTATE, onLocationChange)

        return () => {
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
        }
    }, [])

    for (const { path, Component } of routes) {
        const { match, params } = matchRoute(currentPath, path);
        if (match) return <Component params={params} />;
    }
    return <DefaultComponent />;
}