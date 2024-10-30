import React, { ReactNode } from "react"

// tailwind classes adapted from: https://tailgrids.com/components/tooltips

const __TAILWIND_CSS = {
    root: "hidden absolute",
    format: "z-50 whitespace-nowrap rounded bg-black px-4 py-[6px] text-sm font-semibold text-white group-hover:block",
    top: "bottom-full left-1/2 mb-3 -translate-x-1/2",
    left: "right-full top-1/2 mr-3 -translate-y-1/2",
    right: "left-full top-1/2 ml-3 -translate-y-1/2",
    bottom: "left-1/2 top-full mt-3 -translate-x-1/2",
    triangle_top: "absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black",
    triangle_bottom: "absolute left-1/2 top-[-3px] -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black",
    triangle_left: "absolute right-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black",
    triangle_right: "absolute left-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black",
}

interface Tooltip {
    message: string | ReactNode,
    children: string | ReactNode
    position?: 'top' | 'bottom' | 'left' | 'right'
}

export const Tooltip = ({ children, message, position = 'bottom' }: Tooltip) => {
    const tooltipStyle = __TAILWIND_CSS['root'] + " " + __TAILWIND_CSS['format'] + " " + __TAILWIND_CSS[position]
    const triangleStyle = __TAILWIND_CSS[`triangle_${position}`]
    return (
        <div className="group relative inline-block">
            {children}
            <div className={tooltipStyle}>
                <span className={triangleStyle}></span>
                {message}
            </div>
        </div>
    )
}

// function that renders default (bottom) tooltip
export const renderTooltip = (children: any, message: any) => {
    return <Tooltip children={children} message={message} />
}
