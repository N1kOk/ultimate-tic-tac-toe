import React, { FC } from 'react'
import O from '@/components/O'
import X from '@/components/X'

const animationTime = 50
const rnd = (min: number, max: number) => Math.round(Math.random() * (max - min) + min)

const listO = [...Array(7)].map(_ => ({ left: rnd(5, 95), timeStart: -rnd(0, animationTime) }))
const listX = [...Array(8)].map(_ => ({ rotate: rnd(-30, 30), left: rnd(5, 95), timeStart: -rnd(0, animationTime) }))

const Background: FC = () => {
  return (
    <>
      {listO.map(({ left, timeStart }, i) =>
        <O
          key={i}
          style={{ '--animationStartTime': `${timeStart}s`, left: `${left}vw` }}
          className={'background-shape opacity-5'}
        />,
      )}
      {listX.map(({ rotate, left, timeStart }, i) =>
        <div
          key={i}
          // @ts-ignore
          style={{ '--animationStartTime': `${timeStart}s`, left: `${left}vw` }}
          className={'background-shape h-[25px]'}
        >
          <X
            style={{ transform: `rotate(${rotate}deg)` }}
            className={'opacity-5'}
          />
        </div>,
      )}
    </>
  )
}

export default Background