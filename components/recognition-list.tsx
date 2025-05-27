"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LogIn, LogOut, User, Clock } from "lucide-react"

type RecognizedPerson = {
  id: number
  first_name: string
  last_name: string
  position: string
  department: string
  image: string
  timestamp: Date
  action: "check_in" | "check_out"
  confidence?: number
}

export function RecognitionList() {
  const [recognizedPeople, setRecognizedPeople] = useState<RecognizedPerson[]>([])

  const addRecognizedPerson = (person: RecognizedPerson) => {
    setRecognizedPeople((prev) => [person, ...prev].slice(0, 10))
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const getTimeDifference = (date: Date) => {
    const diffInSeconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m`
    } else {
      return `${Math.floor(diffInSeconds / 3600)}h`
    }
  }

  return {
    addRecognizedPerson,
    component: (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>Recognition History</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            {recognizedPeople.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-gray-500">
                <p>No recognitions yet</p>
              </div>
            ) : (
              <div className="space-y-1 p-3">
                {recognizedPeople.map((person, index) => (
                  <div
                    key={`${person.id}-${index}`}
                    className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-100"
                  >
                    <div
                      className={`p-2 rounded-full ${
                        person.action === "check_in" ? "bg-green-50 text-green-500" : "bg-blue-50 text-blue-500"
                      }`}
                    >
                      {person.action === "check_in" ? <LogIn className="h-4 w-4" /> : <LogOut className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={person.image || "/placeholder.svg"} />
                          <AvatarFallback>
                            {person.first_name[0]}
                            {person.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {person.first_name} {person.last_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {person.position} • {person.department}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatTime(person.timestamp)}</div>
                      <div className="flex items-center justify-end gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{getTimeDifference(person.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    ),
  }
}
