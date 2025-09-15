// hooks/use-mobile.ts
import { useEffect, useState } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // 检测窗口宽度，判断是否为移动设备（可根据需求调整阈值）
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px 是常见的移动设备断点
    }

    // 初始化检查
    checkIsMobile()

    // 监听窗口大小变化
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}