// Database types for Supabase

export type Database = {
  public: {
    Tables: {
      product_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          base_price: number
          material_options: string[] | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          base_price: number
          material_options?: string[] | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          base_price?: number
          material_options?: string[] | null
          image_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          id: string
          title: string | null
          image_url: string
          uploaded_at: string
          display_order: number | null
        }
        Insert: {
          id?: string
          title?: string | null
          image_url: string
          uploaded_at?: string
          display_order?: number | null
        }
        Update: {
          id?: string
          title?: string | null
          image_url?: string
          uploaded_at?: string
          display_order?: number | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          id: string
          name: string
          thumbnail_url: string | null
          image_url: string | null
          product_category_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          thumbnail_url?: string | null
          image_url?: string | null
          product_category_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          thumbnail_url?: string | null
          image_url?: string | null
          product_category_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'templates_product_category_id_fkey'
            columns: ['product_category_id']
            isOneToOne: false
            referencedRelation: 'product_categories'
            referencedColumns: ['id']
          }
        ]
      }
      quote_requests: {
        Row: {
          id: string
          customer_name: string
          customer_email: string
          customer_phone: string | null
          product_type: string | null
          quantity: number | null
          fabric_options: string | null
          printing_type: string | null
          estimated_price: string | null
          message: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          customer_name: string
          customer_email: string
          customer_phone?: string | null
          product_type?: string | null
          quantity?: number | null
          fabric_options?: string | null
          printing_type?: string | null
          estimated_price?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string | null
          product_type?: string | null
          quantity?: number | null
          fabric_options?: string | null
          printing_type?: string | null
          estimated_price?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          is_read?: boolean
          created_at?: string
        }
        Relationships: []
      }
      ratings: {
        Row: {
          id: string
          customer_name: string | null
          stars: number
          review_text: string | null
          product_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          customer_name?: string | null
          stars: number
          review_text?: string | null
          product_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          customer_name?: string | null
          stars?: number
          review_text?: string | null
          product_id?: string | null
          created_at?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Enums
export type DatabaseEnums = {
  [_ in never]: never
}