import Grid from '@/components/Grid'
import { Game } from '@/Game'
import { useMemo, useReducer } from 'react'
import Head from 'next/head'
import Background from '@/components/Background'

export default function Index() {
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  const game = useMemo(() => new Game(), [])

  const handleClick = (boardIndex: number, cellIndex: number) => {
    game.makeMove(boardIndex, cellIndex)
    forceUpdate()
  }

  return (
    <>
      <Head>
        <title>Ultimate Tic-Tac-Toe</title>
        <meta name="viewport" content="width=768"/>
      </Head>
      <main
        className={'flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-[#352870] to-[#641c90]'}
      >
        <Background/>

        <div
          className={'grid grid-cols-3 grid-rows-3 gap-4 w-[100vmin] h-[100vmin] min-w-[500px] min-h-[500px] m-auto p-8'}>
          {game.boards.map((board, i) => <Grid key={i} board={board} onClick={handleClick}/>)}
        </div>
      </main>
    </>
  )
}
