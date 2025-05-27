"use server"

/**
 * Bugungi davomat ma'lumotlarini olish
 */
export async function getTodayAttendance() {
  try {
    // Mock ma'lumotlarni qaytaramiz
    return [
      {
        id: 1,
        employee_id: 1,
        date: new Date().toISOString().split("T")[0],
        check_in: new Date(new Date().setHours(9, 0, 0)).toISOString(),
        check_out: null,
        status: "present",
        hours_worked: null,
      },
      {
        id: 2,
        employee_id: 2,
        date: new Date().toISOString().split("T")[0],
        check_in: new Date(new Date().setHours(9, 45, 0)).toISOString(),
        check_out: new Date(new Date().setHours(18, 30, 0)).toISOString(),
        status: "late",
        hours_worked: 8.75,
      },
      {
        id: 3,
        employee_id: 3,
        date: new Date().toISOString().split("T")[0],
        check_in: new Date(new Date().setHours(9, 5, 0)).toISOString(),
        check_out: null,
        status: "present",
        hours_worked: null,
      },
    ]
  } catch (error) {
    console.error("Bugungi davomat ma'lumotlarini olishda xatolik:", error)
    return []
  }
}

/**
 * Belgilangan kun uchun davomat ma'lumotlarini olish
 */
export async function getAttendanceByDate(date: string) {
  try {
    // Mock ma'lumotlarni qaytaramiz
    return [
      {
        id: 1,
        employee_id: 1,
        date: date,
        check_in: new Date(new Date(date).setHours(9, 0, 0)).toISOString(),
        check_out: new Date(new Date(date).setHours(18, 0, 0)).toISOString(),
        status: "present",
        hours_worked: 9,
        employees: {
          id: 1,
          first_name: "Alisher",
          last_name: "Navoiy",
          position: "Bosh muhandis",
          department: "Muhandislik",
        },
      },
      {
        id: 2,
        employee_id: 2,
        date: date,
        check_in: new Date(new Date(date).setHours(9, 45, 0)).toISOString(),
        check_out: new Date(new Date(date).setHours(18, 30, 0)).toISOString(),
        status: "late",
        hours_worked: 8.75,
        employees: {
          id: 2,
          first_name: "Zulfiya",
          last_name: "Isroilova",
          position: "Moliya menejeri",
          department: "Moliya",
        },
      },
      {
        id: 3,
        employee_id: 3,
        date: date,
        check_in: null,
        check_out: null,
        status: "absent",
        hours_worked: 0,
        employees: {
          id: 3,
          first_name: "Abdulla",
          last_name: "Qodiriy",
          position: "Dizayner",
          department: "Dizayn",
        },
      },
    ]
  } catch (error) {
    console.error("Davomat ma'lumotlarini olishda xatolik:", error)
    return []
  }
}

/**
 * Xodim uchun davomat ma'lumotlarini olish
 */
export async function getEmployeeAttendance(employeeId: number, startDate: string, endDate: string) {
  try {
    // Mock ma'lumotlarni qaytaramiz
    return [
      {
        id: 1,
        employee_id: employeeId,
        date: startDate,
        check_in: new Date(new Date(startDate).setHours(9, 0, 0)).toISOString(),
        check_out: new Date(new Date(startDate).setHours(18, 0, 0)).toISOString(),
        status: "present",
        hours_worked: 9,
      },
      {
        id: 2,
        employee_id: employeeId,
        date: new Date(new Date(startDate).getTime() + 86400000).toISOString().split("T")[0],
        check_in: new Date(new Date(startDate).getTime() + 86400000 + 9 * 3600000).toISOString(),
        check_out: new Date(new Date(startDate).getTime() + 86400000 + 18 * 3600000).toISOString(),
        status: "present",
        hours_worked: 9,
      },
      {
        id: 3,
        employee_id: employeeId,
        date: new Date(new Date(startDate).getTime() + 2 * 86400000).toISOString().split("T")[0],
        check_in: null,
        check_out: null,
        status: "absent",
        hours_worked: 0,
      },
    ]
  } catch (error) {
    console.error("Xodim davomat ma'lumotlarini olishda xatolik:", error)
    return []
  }
}

/**
 * Davomat statistikasini olish
 */
export async function getAttendanceStats(startDate: string, endDate: string) {
  try {
    // Mock ma'lumotlarni qaytaramiz
    return {
      present: 42,
      late: 7,
      absent: 3,
      total: 52,
    }
  } catch (error) {
    console.error("Davomat statistikasini olishda xatolik:", error)
    return { present: 0, late: 0, absent: 0, total: 0 }
  }
}
