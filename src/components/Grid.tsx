import React, { FC } from 'react'

type GridProps = {
    isActive?: boolean
}

const Grid: FC<GridProps> = (props) => (
  <div className={`grid grid-cols-3 grid-rows-3 gap-1 ${props.isActive ? 'brightness-150' : 'brightness-90'}`}>
    <div className={`cell ${props.isActive ? 'cell--active' : ''}`}></div>
    <div className={`cell ${props.isActive ? 'cell--active' : ''}`}></div>
    <div className={`cell ${props.isActive ? 'cell--active' : ''}`}></div>
    <div className={`cell ${props.isActive ? 'cell--active' : ''}`}></div>
    <div className={`cell ${props.isActive ? 'cell--active' : ''}`}></div>
    <div className={`cell ${props.isActive ? 'cell--active' : ''}`}></div>
    <div className={`cell ${props.isActive ? 'cell--active' : ''}`}></div>
    <div className={`cell ${props.isActive ? 'cell--active' : ''}`}></div>
    <div className={`cell ${props.isActive ? 'cell--active' : ''}`}></div>
  </div>
)

export default Grid