"use client"

import type React from "react"
import { useRef, useEffect, useCallback } from "react"

interface FallingDotsBackgroundProps {
  colors: string[];
  dotCount?: number;
}

const FallingDotsBackground: React.FC<FallingDotsBackgroundProps> = ({ colors }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | null>(null)
  const dots = useRef<Dot[]>([])

  interface Dot {
    x: number
    y: number
    radius: number
    speed: number
    color: string
    opacity: number
  }

  const initDots = useCallback(
    (canvas: HTMLCanvasElement) => {
      const numDots = Math.floor((canvas.width * canvas.height) / 30000) // Reduced density
      dots.current = Array.from({ length: numDots }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.3, // Smaller dots
        speed: Math.random() * 0.3 + 0.1, // Slower speed
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.15 + 0.05, // Very light opacity
      }))
    },
    [colors],
  )

  const drawDots = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dots.current.forEach((dot) => {
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${Number.parseInt(dot.color.slice(1, 3), 16)}, ${Number.parseInt(dot.color.slice(3, 5), 16)}, ${Number.parseInt(dot.color.slice(5, 7), 16)}, ${dot.opacity})`
      ctx.fill()
    })
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    dots.current.forEach((dot) => {
      dot.y += dot.speed
      if (dot.y - dot.radius > canvas.height) {
        dot.y = -dot.radius
        dot.x = Math.random() * canvas.width
        dot.speed = Math.random() * 0.3 + 0.1
        dot.radius = Math.random() * 1.2 + 0.3
        dot.opacity = Math.random() * 0.15 + 0.05
      }
    })

    drawDots(ctx, canvas)
    animationFrameId.current = requestAnimationFrame(animate)
  }, [drawDots])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const setCanvasSize = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
        initDots(canvas)
      }
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [animate, initDots])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />
}

export default FallingDotsBackground
