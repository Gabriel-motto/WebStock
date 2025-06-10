import { EVENTS } from "./consts"

export function navigateTo (href) {
    window.history.pushState({}, '', href)
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    window.dispatchEvent(navigationEvent)
}

export function CustomLink ({ target, to, ...props }) {
    const handleClick = (event) => {
        event.preventDefault()
        navigateTo(to)
    }

    return <a href={to} onClick={handleClick} target={target} {...props} />
}