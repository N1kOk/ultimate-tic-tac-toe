import React, { FC } from 'react'
import { Board } from '@/Game'
import classNames from 'classnames'

type GridProps = {
  board: Board
  onClick: (boardIndex: number, cellIndex: number) => void
}

const Grid: FC<GridProps> = ({ board, onClick }) => {
  const x = (
    <>
      <div className={'absolute bg-white w-[7vmin] h-[1vmin] rotate-45 rounded-full'}></div>
      <div className={'absolute bg-white w-[7vmin] h-[1vmin] -rotate-45 rounded-full'}></div>
    </>
  )

  const o = (
    <div className={'absolute border-[1vmin] border-white w-[6vmin] h-[6vmin] rounded-full'}></div>
  )

  return (
    <div className={`grid grid-cols-3 grid-rows-3 gap-1 ${board.isActive ? 'brightness-150' : 'brightness-90'}`}>
      {
        board.getCells().map((value, index) =>
          <div
            key={index}
            onClick={() => onClick(board.index, index)}
            className={classNames({
              'cell': true,
              'cell--active': board.isActive && !value,
              'cell--win': board.winRow.length && board.winRow.find(value => value === index) !== undefined
            })}
          >
            {value && (value === 'x' ? x : o)}
          </div>)
      }
    </div>
  )
}

export default Grid