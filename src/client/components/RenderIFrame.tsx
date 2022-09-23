import '../styles/IframeView.css'

import React, { useEffect, useState, useRef } from 'react'

interface IRenderIFrameProps {
  src: string
}

const contentSize = {
  width: 1920,
  height: 1080,
}

const RenderIFrame = (props: IRenderIFrameProps) => {
  const [scale, setScale] = useState(1)
  const [width, setWidth] = useState(1)
  const [height, setHeight] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      const size = containerRef.current?.getBoundingClientRect()
      const maxWidth = size?.width || window.innerWidth
      const maxHeight = size?.height || window.innerHeight
      const scaleX = Math.min(1, maxWidth / contentSize.width)
      const scaleY = Math.min(1, maxHeight / contentSize.height)
      const contentRatio = contentSize.width / contentSize.height
      const containerRatio = maxWidth / maxHeight
      if (scaleX < scaleY) {
        setScale(scaleX)
        setWidth(maxWidth / scaleX)
        setHeight(containerRatio < contentRatio ? maxHeight / scaleX : maxWidth / (contentRatio * scaleX))
      } else {
        setScale(scaleY)
        setWidth(containerRatio > contentRatio ? maxWidth / scaleY : maxHeight * contentRatio / scaleY)
        setHeight(maxHeight / scaleY)
      }
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    setTimeout(() => handleResize(), 200)
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="iframe-container" ref={containerRef}>
      <iframe
        style={{
          transform: `scale(${scale})`,
          height: `${height}px`,
          width: `${width}px`,
        }}
        className={'iframe-view'}
        src={props.src}
      ></iframe>
    </div>
  )
}

export default RenderIFrame
