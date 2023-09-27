import React, { CSSProperties, FC } from 'react'

type Props = {
  style?: CSSProperties & { '--animationStartTime': string }
  className?: string
}

const O: FC<Props> = (props) => {
  return (
    <div
      {...props}
      className={'absolute border-[calc(1vmin*var(--size))] border-current w-[calc(6vmin*var(--size))] h-[calc(6vmin*var(--size))] rounded-full text-white ' + props.className || ''}
    />
  )
}

export default O