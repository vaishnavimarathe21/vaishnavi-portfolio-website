import React, { useRef, useEffect } from 'react'

interface SecureAvatarProps {
  src: string
  alt: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const SecureAvatar: React.FC<SecureAvatarProps> = ({ 
  src, 
  alt, 
  className = '', 
  size = 'md' 
}) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  useEffect(() => {
    const img = imgRef.current
    const container = containerRef.current

    if (!img || !container) return

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Disable image saving via keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Ctrl+S, Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
      if (e.ctrlKey && ['s', 'a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())) {
        e.preventDefault()
        return false
      }
      // Disable F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault()
        return false
      }
      // Disable Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        return false
      }
    }

    // Add event listeners
    img.addEventListener('contextmenu', handleContextMenu)
    img.addEventListener('dragstart', handleDragStart)
    img.addEventListener('selectstart', handleSelectStart)
    container.addEventListener('keydown', handleKeyDown)

    // Add CSS to prevent image saving
    img.style.userSelect = 'none'
    ;(img.style as any).webkitUserSelect = 'none'
    ;(img.style as any).mozUserSelect = 'none'
    ;(img.style as any).msUserSelect = 'none'
    ;(img.style as any).webkitTouchCallout = 'none'
    ;(img.style as any).webkitUserDrag = 'none'
    ;(img.style as any).khtmlUserSelect = 'none'
    img.style.pointerEvents = 'none'

    // Add watermark overlay
    const watermark = document.createElement('div')
    watermark.style.position = 'absolute'
    watermark.style.top = '0'
    watermark.style.left = '0'
    watermark.style.width = '100%'
    watermark.style.height = '100%'
    watermark.style.background = 'transparent'
    watermark.style.pointerEvents = 'none'
    watermark.style.zIndex = '1'
    watermark.style.userSelect = 'none'
    ;(watermark.style as any).webkitUserSelect = 'none'
    ;(watermark.style as any).mozUserSelect = 'none'
    ;(watermark.style as any).msUserSelect = 'none'
    
    container.appendChild(watermark)

    // Cleanup
    return () => {
      img.removeEventListener('contextmenu', handleContextMenu)
      img.removeEventListener('dragstart', handleDragStart)
      img.removeEventListener('selectstart', handleSelectStart)
      container.removeEventListener('keydown', handleKeyDown)
      if (watermark.parentNode) {
        watermark.parentNode.removeChild(watermark)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${sizeClasses[size]} ${className}`}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserDrag: 'none',
        KhtmlUserSelect: 'none'
      } as React.CSSProperties}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded-full ${sizeClasses[size]}`}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserDrag: 'none',
          KhtmlUserSelect: 'none',
          pointerEvents: 'none',
          filter: 'blur(0.5px)', // Subtle blur to make screenshots less clear
          imageRendering: 'auto'
        } as React.CSSProperties}
        draggable={false}
        onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
        onDragStart={(e: React.DragEvent) => e.preventDefault()}
      />
      
      {/* Invisible overlay to catch any interaction attempts */}
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
          KhtmlUserSelect: 'none'
        } as React.CSSProperties}
        onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
        onDragStart={(e: React.DragEvent) => e.preventDefault()}
      />
    </div>
  )
}

export default SecureAvatar
