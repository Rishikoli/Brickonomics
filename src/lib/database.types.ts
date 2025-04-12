export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          project_name: string
          project_type: string
          total_area: number
          estimated_duration: number
          location: string
          requirements: string | null
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          project_name: string
          project_type: string
          total_area: number
          estimated_duration: number
          location: string
          requirements?: string | null
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          project_name?: string
          project_type?: string
          total_area?: number
          estimated_duration?: number
          location?: string
          requirements?: string | null
          status?: string
        }
      }
      cost_analysis: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          project_id: string
          material_cost: number
          labor_cost: number
          transportation_cost: number
          overhead_cost: number
          total_cost: number
          cost_per_sqft: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id: string
          material_cost: number
          labor_cost: number
          transportation_cost: number
          overhead_cost: number
          total_cost: number
          cost_per_sqft: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id?: string
          material_cost?: number
          labor_cost?: number
          transportation_cost?: number
          overhead_cost?: number
          total_cost?: number
          cost_per_sqft?: number
        }
      }
      materials: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          unit: string
          base_rate: number
          category: string
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          unit: string
          base_rate: number
          category: string
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          unit?: string
          base_rate?: number
          category?: string
          description?: string | null
        }
      }
      labor_rates: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          role: string
          daily_rate: number
          location: string
          skill_level: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          role: string
          daily_rate: number
          location: string
          skill_level: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          role?: string
          daily_rate?: number
          location?: string
          skill_level?: string
        }
      }
      project_materials: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          project_id: string
          material_id: string
          quantity: number
          rate: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id: string
          material_id: string
          quantity: number
          rate: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id?: string
          material_id?: string
          quantity?: number
          rate?: number
        }
      }
      project_labor: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          project_id: string
          labor_id: string
          num_workers: number
          num_days: number
          rate_per_day: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id: string
          labor_id: string
          num_workers: number
          num_days: number
          rate_per_day: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id?: string
          labor_id?: string
          num_workers?: number
          num_days?: number
          rate_per_day?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
