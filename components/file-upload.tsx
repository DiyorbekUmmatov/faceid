"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface FileUploadProps {
  icon?: React.ReactNode
  title?: string
  description?: string
  accept?: string
  onFileSelect?: (file: File) => void
}

export function FileUpload({ icon, title, description, accept, onFileSelect }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0 && onFileSelect) {
      onFileSelect(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0 && onFileSelect) {
      onFileSelect(files[0])
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-2">
        {icon || <Upload className="h-8 w-8 text-gray-400" />}
        <h3 className="text-lg font-medium">{title || "Upload File"}</h3>
        <p className="text-sm text-gray-500">{description || "Drag and drop or click to select"}</p>
        <input type="file" accept={accept} onChange={handleFileSelect} className="hidden" id="file-upload" />
        <Button variant="outline" asChild>
          <label htmlFor="file-upload" className="cursor-pointer">
            Select File
          </label>
        </Button>
      </div>
    </div>
  )
}
