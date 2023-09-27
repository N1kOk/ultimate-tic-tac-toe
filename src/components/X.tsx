import React, { CSSProperties, FC } from 'react'
import classNames from 'classnames'

type Props = {
  style?: CSSProperties & { '--animationStartTime'?: string }
  className?: string
}

const X: FC<Props> = (props) => {
  return (
    <div
      {...props}
      className={classNames({
        [`absolute flex justify-center items-center w-[calc(6vmin*var(--size))] h-[calc(6vmin*var(--size))] ${props.className || ''}`]: true,
        'after:absolute after:bg-current after:w-[calc(7vmin*var(--size))] after:h-[calc(1vmin*var(--size))] after:rotate-45 after:rounded-full': true,
        'before:absolute before:bg-current before:w-[calc(7vmin*var(--size))] before:h-[calc(1vmin*var(--size))] before:-rotate-45 before:rounded-full': true,
      })}
    />
  )
}

export default X