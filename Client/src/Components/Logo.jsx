import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group transition-all">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-premium-gradient text-white font-extrabold text-xl premium-shadow group-hover:scale-105 transition-transform">
            <span className="z-10">A</span>
            <span className="text-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 text-white">&</span>
            <span className="z-10">A</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
            Store
          </span>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] -mt-1">
            Premium
          </span>
        </div>
    </Link>
  )
}

export default Logo