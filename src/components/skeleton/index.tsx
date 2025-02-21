import React from 'react'
import './style.css'

export const Skeleton = () => {
    const elements = [
        { id: 0, left: 26.3333, top: 11.9, width: 290, height: 276 },
        { id: 1, left: 342, top: 10.5, width: 424, height: 38 },
        { id: 2, left: 342.5, top: 60, width: 65, height: 24 },
        { id: 3, left: 342.5, top: 95, width: 119, height: 24 },
        { id: 4, left: 343.5, top: 132.5, width: 157, height: 23 },
        { id: 5, left: 343, top: 166.5, width: 108, height: 25 },
        { id: 6, left: 342.5, top: 203.5, width: 159, height: 25 },
        { id: 7, left: 527.5, top: 203.5, width: 185, height: 25 },
        { id: 8, left: 471, top: 167.5, width: 94, height: 23 },
        { id: 9, left: 521, top: 130.5, width: 184, height: 27 },
        { id: 10, left: 481, top: 95, width: 186, height: 26 },
        { id: 11, left: 431, top: 60.5, width: 126, height: 23 },
        { id: 12, left: 343, top: 252.5, width: 421, height: 57 },
      ];
  return (
    <div id="skeleton" className="relative w-full h-full">
    <div className="wrapper relative">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute bg-gray-300"
          style={{
            zIndex: el.id,
            left: `${el.left}px`,
            top: `${el.top}px`,
            width: `${el.width}px`,
            height: `${el.height}px`,
          }}
        ></div>
      ))}
    </div>
  </div>
  )
}
