"use client"

import { FaceIdLiveStream } from "@/components/face-id-live-stream"
import { RecognitionList } from "@/components/recognition-list"

export function FaceIdLiveStreamWithRecognitionList() {
  const recognitionList = RecognitionList()

  return (
    <>
      <FaceIdLiveStream onRecognize={recognitionList.addRecognizedPerson} />
      {recognitionList.component}
    </>
  )
}
