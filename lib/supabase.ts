// Supabase klientini yaratish uchun singleton pattern
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Xodimlar uchun tiplar
export type Employee = {
  id: number
  first_name: string
  last_name: string
  position: string
  department: string
  email?: string
  phone?: string
  join_date: string
  contract_end?: string
  status: "active" | "blocked"
  face_id_data?: any
  created_at?: string
  updated_at?: string
}

// Davomat uchun tiplar
export type Attendance = {
  id: number
  employee_id: number
  date: string
  check_in?: string
  check_out?: string
  status: "present" | "late" | "absent"
  hours_worked?: number
  created_at?: string
  updated_at?: string
}

// Face ID tanib olish loglari uchun tiplar
export type FaceRecognitionLog = {
  id: number
  employee_id: number
  timestamp: string
  action: "check_in" | "check_out"
  confidence?: number
  device_info?: string
  created_at?: string
}
