import React, { FC } from 'react'
import { Board } from '@/Game'
import classNames from 'classnames'
import O from '@/components/O'
import X from '@/components/X'

type GridProps = {
  board: Board
  onClick: (boardIndex: number, cellIndex: number) => void
}

const Grid: FC<GridProps> = ({ board, onClick }) => {
  return (
    <div
      className={classNames({
        'grid grid-cols-3 grid-rows-3 gap-1': true,
        'brightness-90': !board.isActive,
        'brightness-150': board.isActive
      })}
    >
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
            {value && (value === 'x' ? <X/> : <O/>)}
          </div>)
      }
    </div>
  )
}

export default Grid