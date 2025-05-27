"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FaceIdLiveStream } from "@/components/face-id-live-stream"
import { RecognitionList } from "@/components/recognition-list"
import { Users, Clock, DollarSign, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const [recognizedPeople, setRecognizedPeople] = useState<any[]>([])
  const recognitionList = RecognitionList()

  const handleRecognition = (person: any) => {
    recognitionList.addRecognizedPerson(person)
    setRecognizedPeople((prev) => [person, ...prev].slice(0, 10))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Employees</p>
                <h2 className="text-3xl font-bold">25</h2>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-700">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Present Today</p>
                <h2 className="text-3xl font-bold">23</h2>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-700">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Payroll</p>
                <h2 className="text-3xl font-bold">$24,820</h2>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-700">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Attendance Rate</p>
                <h2 className="text-3xl font-bold">94%</h2>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-700">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Face ID and Recognition */}
      <div className="grid gap-6 md:grid-cols-2">
        <FaceIdLiveStream onRecognize={handleRecognition} />
        {recognitionList.component}
      </div>
    </div>
  )
}
