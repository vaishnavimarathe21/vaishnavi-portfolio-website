import React, { useRef, useEffect, useState } from 'react'

interface CanvasAvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const CanvasAvatar: React.FC<CanvasAvatarProps> = ({ src, alt: _alt, size = 'md', className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [userIP, setUserIP] = useState<string>('')

  const sizeClasses = {
    sm: { width: 64, height: 64 },
    md: { width: 96, height: 96 },
    lg: { width: 128, height: 128 },
    xl: { width: 192, height: 192 },
  }

  const dimensions = sizeClasses[size]

  // Get user's IP address for watermark
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        setUserIP(data.ip)
      } catch (error) {
        console.log('Could not fetch IP address')
        setUserIP('Unknown')
      }
    }
    fetchIP()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Create image element
    const img = new Image()
    img.crossOrigin = 'Anonymous' // Important for cross-origin images
    
    img.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw the image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      
      // Add dynamic watermark with date and IP
      const currentDate = new Date().toLocaleDateString()
      const watermarkText = `${currentDate} | ${userIP || 'Loading...'}`
      
      // Set watermark style
      ctx.font = '12px Arial'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.lineWidth = 2
      ctx.textAlign = 'center'
      
      // Add text shadow effect
      ctx.strokeText(watermarkText, canvas.width / 2, canvas.height - 8)
      ctx.fillText(watermarkText, canvas.width / 2, canvas.height - 8)
      
      // Add "PROTECTED" watermark diagonally
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(-Math.PI / 4) // -45 degrees
      ctx.font = 'bold 16px Arial'
      ctx.fillStyle = 'rgba(255, 0, 0, 0.4)'
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)'
      ctx.lineWidth = 1
      ctx.textAlign = 'center'
      ctx.strokeText('PROTECTED', 0, 0)
      ctx.fillText('PROTECTED', 0, 0)
      ctx.restore()
      
      setIsLoaded(true)
    }

    img.onerror = () => {
      // Fallback: draw a placeholder
      ctx.fillStyle = '#f0f0f0'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#666'
      ctx.font = '14px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('Image Error', canvas.width / 2, canvas.height / 2)
      setIsLoaded(true)
    }

    // Load the image
    img.src = src

    // Add security event listeners
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      showProtectionMessage('Right-click disabled on protected image')
      return false
    }

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Add event listeners to canvas
    canvas.addEventListener('contextmenu', handleContextMenu)
    canvas.addEventListener('dragstart', handleDragStart)
    canvas.addEventListener('selectstart', handleSelectStart)

    // Add event listeners to container
    container.addEventListener('contextmenu', handleContextMenu)
    container.addEventListener('dragstart', handleDragStart)
    container.addEventListener('selectstart', handleSelectStart)

    // Cleanup
    return () => {
      canvas.removeEventListener('contextmenu', handleContextMenu)
      canvas.removeEventListener('dragstart', handleDragStart)
      canvas.removeEventListener('selectstart', handleSelectStart)
      container.removeEventListener('contextmenu', handleContextMenu)
      container.removeEventListener('dragstart', handleDragStart)
      container.removeEventListener('selectstart', handleSelectStart)
    }
  }, [src, dimensions.width, dimensions.height, userIP])

  // Function to show protection messages
  const showProtectionMessage = (message: string) => {
    // Remove any existing message
    const existingMessage = document.getElementById('canvas-protection-message')
    if (existingMessage) {
      existingMessage.remove()
    }

    // Create new message
    const messageDiv = document.createElement('div')
    messageDiv.id = 'canvas-protection-message'
    messageDiv.textContent = message
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4444;
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      z-index: 10000;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      animation: slideIn 0.3s ease-out;
    `

    document.body.appendChild(messageDiv)

    // Remove message after 3 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove()
      }
    }, 3000)
  }

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserDrag: 'none',
        KhtmlUserSelect: 'none',
        position: 'relative'
      } as React.CSSProperties}
    >
      {/* Canvas element */}
      <canvas
        ref={canvasRef}
        className="rounded-full"
        style={{
          width: '100%',
          height: '100%',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserDrag: 'none',
          KhtmlUserSelect: 'none',
          pointerEvents: 'none'
        } as React.CSSProperties}
        draggable={false}
      />

      {/* Transparent security overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'transparent',
          pointerEvents: 'auto',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserDrag: 'none',
          KhtmlUserSelect: 'none',
          zIndex: 10
        } as React.CSSProperties}
        onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
        onDragStart={(e: React.DragEvent) => e.preventDefault()}
      />

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}
    </div>
  )
}

export default CanvasAvatar
