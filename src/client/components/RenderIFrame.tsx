import '../styles/IframeView.css'

import React, { useEffect, useState } from 'react'

interface IRenderIFrameProps {
    src: string
}

const RenderIFrame = (props: IRenderIFrameProps) => {
    const [scale, setScale] = useState(1)

    useEffect(() => {
        const handleResize = () => {
            let scaleX = window.innerWidth / 1920
            let scaleY = window.innerHeight / 1200

            // Scale to the smallest part of view
            if (scaleY < scaleX) {
                setScale(scaleY)
            } else {
                setScale(scaleX)
            }
        }
        // Add event listener
        window.addEventListener('resize', handleResize)
        // Call handler right away so state gets updated with initial window size
        handleResize()
        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="iframe-container">
            <iframe
                style={{
                    transform: `scale(${scale})`,
                    height: `${(0.99 / scale) * 100}%`,
                    width: `${(0.99 / scale) * 100}%`,
                }}
                className={'iframe-view'}
                src={props.src}
            ></iframe>
        </div>
    )
}

export default RenderIFrame
