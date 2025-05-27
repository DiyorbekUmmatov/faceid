"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Pause, Play } from "lucide-react"

interface FaceIdLiveStreamProps {
  onRecognize: (employee: any) => void
}

export function FaceIdLiveStream({ onRecognize }: FaceIdLiveStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isActive, setIsActive] = useState(true)
  const [recognitionStatus, setRecognitionStatus] = useState<"idle" | "scanning" | "recognized" | "unknown">("idle")

  // Sample employee data for simulation
  const sampleEmployees = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      position: "Frontend Developer",
      department: "Engineering",
      image: "/placeholder.svg?height=48&width=48",
    },
    {
      id: 2,
      first_name: "Sarah",
      last_name: "Smith",
      position: "UI/UX Designer",
      department: "Design",
      image: "/placeholder.svg?height=48&width=48",
    },
  ]

  // Initialize camera
  useEffect(() => {
    if (videoRef.current && isActive) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => {
          console.error("Error accessing camera:", err)
          setIsActive(false)
        })
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [isActive])

  // Simulate face recognition
  useEffect(() => {
    if (!isActive) return

    let recognitionInterval: NodeJS.Timeout

    const simulateRecognition = () => {
      setRecognitionStatus("scanning")

      setTimeout(() => {
        const willRecognize = Math.random() < 0.8

        if (willRecognize) {
          const randomEmployee = sampleEmployees[Math.floor(Math.random() * sampleEmployees.length)]
          setRecognitionStatus("recognized")

          const action = Math.random() > 0.5 ? "check_in" : "check_out"
          const confidence = Math.random() * 30 + 70

          onRecognize({
            ...randomEmployee,
            timestamp: new Date(),
            action,
            confidence,
          })
        } else {
          setRecognitionStatus("unknown")
          setTimeout(() => setRecognitionStatus("scanning"), 2000)
        }
      }, 3000)
    }

    recognitionInterval = setInterval(simulateRecognition, 10000)

    return () => {
      clearInterval(recognitionInterval)
    }
  }, [isActive, onRecognize])

  const toggleCamera = () => {
    setIsActive(!isActive)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            <span>Face ID Camera</span>
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={toggleCamera}>
            {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-black">
          {isActive ? (
            <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-900">
              <Camera className="h-16 w-16 text-gray-500" />
            </div>
          )}

          {/* Recognition status overlay */}
          {recognitionStatus !== "idle" && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 text-white">
              <div className="flex items-center gap-2">
                {recognitionStatus === "scanning" && (
                  <>
                    <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500"></div>
                    <span>Scanning faces...</span>
                  </>
                )}
                {recognitionStatus === "recognized" && (
                  <>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Face recognized</span>
                  </>
                )}
                {recognitionStatus === "unknown" && (
                  <>
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span>Unknown face</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between">
            <Badge variant={isActive ? "default" : "outline"} className="px-3 py-1">
              {isActive ? "Live" : "Paused"}
            </Badge>
            <div className="text-sm text-gray-500">{isActive ? "Camera active" : "Camera inactive"}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
