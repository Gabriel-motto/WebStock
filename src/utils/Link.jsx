import { EVENTS } from "./consts"

export function navigateTo (href) {
    window.history.pushState({}, '', href)
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    window.dispatchEvent(navigationEvent)
}

export function CustomLink ({ target, to, ...props }) {
    const handleClick = (event) => {
        const isMainEvent = event.button === BUTTONS.primary
        const isModifiedEvent = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
        const isManagedEvent = target === undefined || target === '_self'
        if (isMainEvent && isManagedEvent && !isModifiedEvent) {   
            event.preventDefault()
            navigateTo(to)
        }
    }

    return <a href={to} onClick={handleClick} target={target} {...props} />
}