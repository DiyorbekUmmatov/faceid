"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { DocumentUpload } from "@/components/document-upload"
import { Download, FileText, Search, Upload } from "lucide-react"

// Mock data for documents
const documentsData = [
  {
    id: 1,
    name: "Contract - John Doe.pdf",
    type: "Contract",
    employee: {
      name: "John Doe",
      position: "Frontend Developer",
      image: "/placeholder.svg?height=32&width=32",
    },
    uploadDate: "2023-01-15",
    size: "1.2 MB",
  },
  {
    id: 2,
    name: "Resume - Sarah Smith.pdf",
    type: "Resume",
    employee: {
      name: "Sarah Smith",
      position: "UI/UX Designer",
      image: "/placeholder.svg?height=32&width=32",
    },
    uploadDate: "2023-02-20",
    size: "0.8 MB",
  },
  {
    id: 3,
    name: "ID Document - Michael Johnson.pdf",
    type: "ID Document",
    employee: {
      name: "Michael Johnson",
      position: "Backend Developer",
      image: "/placeholder.svg?height=32&width=32",
    },
    uploadDate: "2023-03-10",
    size: "2.5 MB",
  },
  {
    id: 4,
    name: "Contract - Emily Davis.pdf",
    type: "Contract",
    employee: {
      name: "Emily Davis",
      position: "Project Manager",
      image: "/placeholder.svg?height=32&width=32",
    },
    uploadDate: "2023-04-05",
    size: "1.5 MB",
  },
  {
    id: 5,
    name: "Resume - David Wilson.pdf",
    type: "Resume",
    employee: {
      name: "David Wilson",
      position: "DevOps Engineer",
      image: "/placeholder.svg?height=32&width=32",
    },
    uploadDate: "2023-05-12",
    size: "1.1 MB",
  },
]

export default function DocumentsPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [uploadDocumentOpen, setUploadDocumentOpen] = useState(false)

  // Filter documents based on search and filters
  const filteredDocuments = documentsData.filter((document) => {
    const matchesSearch =
      document.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      document.employee.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || document.type === typeFilter

    return matchesSearch && matchesType
  })

  const getDocumentTypeIcon = (type: string) => {
    return <FileText className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t("documents")}</h1>
        <Dialog open={uploadDocumentOpen} onOpenChange={setUploadDocumentOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              {t("upload_document")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DocumentUpload onClose={() => setUploadDocumentOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{t("documents")}</CardTitle>
          <CardDescription>{t("manage_documents_description")}</CardDescription>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t("search_documents")}
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue>{t("document_type")}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("all_types")}</SelectItem>
                  <SelectItem value="Contract">{t("contract")}</SelectItem>
                  <SelectItem value="Resume">{t("resume")}</SelectItem>
                  <SelectItem value="ID Document">{t("id_document")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="list">{t("list_view")}</TabsTrigger>
              <TabsTrigger value="grid">{t("grid_view")}</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("document")}</TableHead>
                    <TableHead>{t("employee")}</TableHead>
                    <TableHead>{t("type")}</TableHead>
                    <TableHead>{t("upload_date")}</TableHead>
                    <TableHead>{t("size")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-md">
                            <FileText className="h-4 w-4 text-gray-500" />
                          </div>
                          <div className="font-medium">{document.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={document.employee.image || "/placeholder.svg"} />
                            <AvatarFallback>{document.employee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{document.employee.name}</div>
                            <div className="text-sm text-gray-500">{document.employee.position}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{document.type}</Badge>
                      </TableCell>
                      <TableCell>{document.uploadDate}</TableCell>
                      <TableCell>{document.size}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">{t("download")}</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((document) => (
                  <Card key={document.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-2 bg-gray-100 rounded-md">
                            <FileText className="h-6 w-6 text-gray-500" />
                          </div>
                          <Badge variant="outline">{document.type}</Badge>
                        </div>
                        <h3 className="font-medium truncate">{document.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={document.employee.image || "/placeholder.svg"} />
                            <AvatarFallback>{document.employee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-500">{document.employee.name}</span>
                        </div>
                      </div>
                      <div className="border-t px-4 py-3 bg-gray-50 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {document.uploadDate} • {document.size}
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">{t("download")}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
