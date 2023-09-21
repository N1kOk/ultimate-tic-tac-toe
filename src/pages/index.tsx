import { Inter } from 'next/font/google'
import Grid from '@/components/Grid'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-[#352870] to-[#641c90] ${inter.className}`}>
      <div className={'grid grid-cols-3 grid-rows-3 gap-4 w-[100vmin] h-[100vmin] p-8 overflow-hidden'}>
        <Grid isActive/>
        <Grid/>
        <Grid/>
        <Grid/>
        <Grid/>
        <Grid/>
        <Grid/>
        <Grid/>
        <Grid/>
      </div>
    </main>
  )
}
