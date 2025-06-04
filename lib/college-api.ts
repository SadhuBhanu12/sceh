// College API integration
export class CollegeAPI {
  private static baseURL = process.env.COLLEGE_API_BASE_URL
  private static apiKey = process.env.COLLEGE_API_KEY

  // Authenticate user with college API
  static async authenticateUser(credentials: { username: string; password: string }) {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": this.apiKey!,
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error("Authentication failed")
      }

      const data = await response.json()

      return {
        success: true,
        user: {
          id: data.user_id,
          name: data.full_name,
          email: data.email,
          role: data.role,
          department: data.department,
          year: data.academic_year,
          section: data.section,
        },
        token: data.access_token,
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Get student details
  static async getStudentDetails(studentId: string) {
    try {
      const response = await fetch(`${this.baseURL}/students/${studentId}`, {
        headers: {
          "X-API-Key": this.apiKey!,
          Authorization: `Bearer ${this.getStoredToken()}`,
        },
      })

      return await response.json()
    } catch (error) {
      throw new Error("Failed to fetch student details")
    }
  }

  // Get faculty details
  static async getFacultyDetails(facultyId: string) {
    try {
      const response = await fetch(`${this.baseURL}/faculty/${facultyId}`, {
        headers: {
          "X-API-Key": this.apiKey!,
          Authorization: `Bearer ${this.getStoredToken()}`,
        },
      })

      return await response.json()
    } catch (error) {
      throw new Error("Failed to fetch faculty details")
    }
  }

  private static getStoredToken(): string {
    // Get token from secure storage
    return localStorage.getItem("college_auth_token") || ""
  }
}
