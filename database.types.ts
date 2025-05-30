export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      article_bookmarks: {
        Row: {
          article_id: string
          created_at: string | null
          user_id: string
        }
        Insert: {
          article_id: string
          created_at?: string | null
          user_id: string
        }
        Update: {
          article_id?: string
          created_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_bookmarks_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_comments: {
        Row: {
          article_id: string | null
          content: string
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          article_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          article_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_likes: {
        Row: {
          article_id: string
          created_at: string | null
          user_id: string
        }
        Insert: {
          article_id: string
          created_at?: string | null
          user_id: string
        }
        Update: {
          article_id?: string
          created_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_likes_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_tag_relations: {
        Row: {
          article_id: string
          tag_id: string
        }
        Insert: {
          article_id: string
          tag_id: string
        }
        Update: {
          article_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_tag_relations_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_tag_relations_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "article_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      article_tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          published_at: string | null
          read_time: string
          slug: string
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          read_time: string
          slug: string
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          read_time?: string
          slug?: string
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      communities: {
        Row: {
          avatar_url: string | null
          category: string | null
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          is_featured: boolean | null
          is_verified: boolean | null
          long_description: string | null
          name: string
          posts_count: number | null
          posts_per_day: number | null
          rules: string[] | null
          slug: string | null
          updated_at: string
          visibility: string | null
        }
        Insert: {
          avatar_url?: string | null
          category?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_verified?: boolean | null
          long_description?: string | null
          name: string
          posts_count?: number | null
          posts_per_day?: number | null
          rules?: string[] | null
          slug?: string | null
          updated_at?: string
          visibility?: string | null
        }
        Update: {
          avatar_url?: string | null
          category?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_verified?: boolean | null
          long_description?: string | null
          name?: string
          posts_count?: number | null
          posts_per_day?: number | null
          rules?: string[] | null
          slug?: string | null
          updated_at?: string
          visibility?: string | null
        }
        Relationships: []
      }
      community_members: {
        Row: {
          community_id: string
          created_at: string
          role: string | null
          user_id: string
        }
        Insert: {
          community_id: string
          created_at?: string
          role?: string | null
          user_id: string
        }
        Update: {
          community_id?: string
          created_at?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_members_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      community_moderators: {
        Row: {
          community_id: string
          created_at: string | null
          user_id: string
        }
        Insert: {
          community_id: string
          created_at?: string | null
          user_id: string
        }
        Update: {
          community_id?: string
          created_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_moderators_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_moderators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      community_requests: {
        Row: {
          benefits: string
          created_at: string
          description: string
          id: string
          name: string
          notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          target_audience: string
          topic: string
          user_id: string
        }
        Insert: {
          benefits: string
          created_at?: string
          description: string
          id?: string
          name: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          target_audience: string
          topic: string
          user_id: string
        }
        Update: {
          benefits?: string
          created_at?: string
          description?: string
          id?: string
          name?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          target_audience?: string
          topic?: string
          user_id?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          benefits: string[] | null
          company_size: string | null
          created_at: string
          culture_values: string[] | null
          description: string | null
          featured: boolean | null
          founded_year: number | null
          id: string
          industry: string | null
          linkedin_url: string | null
          location: string | null
          logo_url: string | null
          name: string
          open_positions: number | null
          rating: number | null
          recruiter_id: string
          review_count: number | null
          updated_at: string
          verified: boolean | null
          website_url: string | null
        }
        Insert: {
          benefits?: string[] | null
          company_size?: string | null
          created_at?: string
          culture_values?: string[] | null
          description?: string | null
          featured?: boolean | null
          founded_year?: number | null
          id?: string
          industry?: string | null
          linkedin_url?: string | null
          location?: string | null
          logo_url?: string | null
          name: string
          open_positions?: number | null
          rating?: number | null
          recruiter_id: string
          review_count?: number | null
          updated_at?: string
          verified?: boolean | null
          website_url?: string | null
        }
        Update: {
          benefits?: string[] | null
          company_size?: string | null
          created_at?: string
          culture_values?: string[] | null
          description?: string | null
          featured?: boolean | null
          founded_year?: number | null
          id?: string
          industry?: string | null
          linkedin_url?: string | null
          location?: string | null
          logo_url?: string | null
          name?: string
          open_positions?: number | null
          rating?: number | null
          recruiter_id?: string
          review_count?: number | null
          updated_at?: string
          verified?: boolean | null
          website_url?: string | null
        }
        Relationships: []
      }
      course_reviews: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          rating: number | null
          review_text: string | null
          student_image: string | null
          student_name: string | null
          user_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          review_text?: string | null
          student_image?: string | null
          student_name?: string | null
          user_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          review_text?: string | null
          student_image?: string | null
          student_name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          access_type: string | null
          bestseller: boolean | null
          certificate_included: boolean | null
          course_image: string | null
          course_sections: Json | null
          created_at: string
          description: string
          discount_percentage: number | null
          features: Json | null
          id: string
          instructor_bio: string | null
          instructor_course_count: number | null
          instructor_image: string | null
          instructor_name: string
          instructor_rating: number | null
          instructor_title: string | null
          instructor_total_students: number | null
          language: string | null
          last_updated: string | null
          learning_outcomes: Json | null
          lecture_count: number | null
          long_description: string | null
          money_back_guarantee: number | null
          new_course: boolean | null
          original_price: number | null
          prerequisites: Json | null
          preview_video_url: string | null
          price: number
          rating: number | null
          requirements: Json | null
          resources: Json | null
          review_count: number | null
          reviews: Json | null
          skill_level: string | null
          subtitles_languages: Json | null
          target_audience: Json | null
          title: string
          total_students: number | null
          updated_at: string
          video_hours: number | null
        }
        Insert: {
          access_type?: string | null
          bestseller?: boolean | null
          certificate_included?: boolean | null
          course_image?: string | null
          course_sections?: Json | null
          created_at?: string
          description: string
          discount_percentage?: number | null
          features?: Json | null
          id?: string
          instructor_bio?: string | null
          instructor_course_count?: number | null
          instructor_image?: string | null
          instructor_name: string
          instructor_rating?: number | null
          instructor_title?: string | null
          instructor_total_students?: number | null
          language?: string | null
          last_updated?: string | null
          learning_outcomes?: Json | null
          lecture_count?: number | null
          long_description?: string | null
          money_back_guarantee?: number | null
          new_course?: boolean | null
          original_price?: number | null
          prerequisites?: Json | null
          preview_video_url?: string | null
          price: number
          rating?: number | null
          requirements?: Json | null
          resources?: Json | null
          review_count?: number | null
          reviews?: Json | null
          skill_level?: string | null
          subtitles_languages?: Json | null
          target_audience?: Json | null
          title: string
          total_students?: number | null
          updated_at?: string
          video_hours?: number | null
        }
        Update: {
          access_type?: string | null
          bestseller?: boolean | null
          certificate_included?: boolean | null
          course_image?: string | null
          course_sections?: Json | null
          created_at?: string
          description?: string
          discount_percentage?: number | null
          features?: Json | null
          id?: string
          instructor_bio?: string | null
          instructor_course_count?: number | null
          instructor_image?: string | null
          instructor_name?: string
          instructor_rating?: number | null
          instructor_title?: string | null
          instructor_total_students?: number | null
          language?: string | null
          last_updated?: string | null
          learning_outcomes?: Json | null
          lecture_count?: number | null
          long_description?: string | null
          money_back_guarantee?: number | null
          new_course?: boolean | null
          original_price?: number | null
          prerequisites?: Json | null
          preview_video_url?: string | null
          price?: number
          rating?: number | null
          requirements?: Json | null
          resources?: Json | null
          review_count?: number | null
          reviews?: Json | null
          skill_level?: string | null
          subtitles_languages?: Json | null
          target_audience?: Json | null
          title?: string
          total_students?: number | null
          updated_at?: string
          video_hours?: number | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          course_id: string
          enrolled_at: string
          id: string
          last_accessed: string | null
          progress: Json | null
          status: string | null
          user_id: string
        }
        Insert: {
          course_id: string
          enrolled_at?: string
          id?: string
          last_accessed?: string | null
          progress?: Json | null
          status?: string | null
          user_id: string
        }
        Update: {
          course_id?: string
          enrolled_at?: string
          id?: string
          last_accessed?: string | null
          progress?: Json | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          created_at: string | null
          id: string
          job_id: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_recommended_courses: {
        Row: {
          course_id: string
          job_id: string
        }
        Insert: {
          course_id: string
          job_id: string
        }
        Update: {
          course_id?: string
          job_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_recommended_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_recommended_courses_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_recruiters: {
        Row: {
          job_id: string
          recruiter_id: string
        }
        Insert: {
          job_id: string
          recruiter_id: string
        }
        Update: {
          job_id?: string
          recruiter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_recruiters_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_recruiters_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiters"
            referencedColumns: ["id"]
          },
        ]
      }
      job_skill_requirements: {
        Row: {
          job_id: string
          skill_id: string
        }
        Insert: {
          job_id: string
          skill_id: string
        }
        Update: {
          job_id?: string
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_skill_requirements_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_skill_requirements_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "job_skills"
            referencedColumns: ["id"]
          },
        ]
      }
      job_skills: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          benefits: string[] | null
          company_name: string
          created_at: string | null
          created_by: string | null
          department: string
          description: string | null
          experience_level: Database["public"]["Enums"]["experience_level"]
          id: string
          is_remote: boolean | null
          job_type: Database["public"]["Enums"]["job_type"]
          location: string
          posted_at: string | null
          required_experience_years: number | null
          requirements: string[] | null
          responsibilities: string[] | null
          salary_currency: string | null
          salary_max: number | null
          salary_min: number | null
          skills: string[] | null
          status: Database["public"]["Enums"]["application_status"] | null
          team_size: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          benefits?: string[] | null
          company_name: string
          created_at?: string | null
          created_by?: string | null
          department: string
          description?: string | null
          experience_level: Database["public"]["Enums"]["experience_level"]
          id?: string
          is_remote?: boolean | null
          job_type: Database["public"]["Enums"]["job_type"]
          location: string
          posted_at?: string | null
          required_experience_years?: number | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills?: string[] | null
          status?: Database["public"]["Enums"]["application_status"] | null
          team_size?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          benefits?: string[] | null
          company_name?: string
          created_at?: string | null
          created_by?: string | null
          department?: string
          description?: string | null
          experience_level?: Database["public"]["Enums"]["experience_level"]
          id?: string
          is_remote?: boolean | null
          job_type?: Database["public"]["Enums"]["job_type"]
          location?: string
          posted_at?: string | null
          required_experience_years?: number | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills?: string[] | null
          status?: Database["public"]["Enums"]["application_status"] | null
          team_size?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      recruiters: {
        Row: {
          avatar_url: string | null
          avg_response_time: number | null
          company: string | null
          created_at: string | null
          current_hiring_count: number | null
          email: string
          first_name: string
          id: string
          is_online: boolean | null
          last_name: string
          office_location: string | null
          response_rate: number | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          avg_response_time?: number | null
          company?: string | null
          created_at?: string | null
          current_hiring_count?: number | null
          email: string
          first_name: string
          id?: string
          is_online?: boolean | null
          last_name: string
          office_location?: string | null
          response_rate?: number | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          avg_response_time?: number | null
          company?: string | null
          created_at?: string | null
          current_hiring_count?: number | null
          email?: string
          first_name?: string
          id?: string
          is_online?: boolean | null
          last_name?: string
          office_location?: string | null
          response_rate?: number | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          course_id: string
          created_at: string
          id: string
          rating: number
          review_text: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          rating: number
          review_text: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          rating?: number
          review_text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_jobs: {
        Row: {
          created_at: string | null
          job_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          job_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          job_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_jobs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          academic_role: string | null
          applications_count: number | null
          avatar_url: string | null
          bio: string | null
          certifications: Json[] | null
          company: string | null
          courses_completed: number | null
          cover_image_url: string | null
          created_at: string
          department: string | null
          education: Json[] | null
          email: string
          email_notifications: boolean | null
          experience: Json[] | null
          experience_years: number | null
          field_of_expertise: string | null
          first_name: string | null
          github_url: string | null
          headline: string | null
          id: string
          institution: string | null
          is_available_for_work: boolean | null
          is_premium: boolean | null
          job_title: string | null
          last_active_at: string | null
          last_name: string | null
          linkedin_url: string | null
          location: string | null
          name: string
          other_field_of_expertise: string | null
          phone_number: string | null
          preferred_language: string | null
          primary_skills: string[] | null
          profile_strength: number | null
          profile_views: number | null
          profile_visibility: string | null
          secondary_skills: string[] | null
          skills: string[] | null
          timezone: string | null
          twitter_url: string | null
          updated_at: string
          username: string
          verified: boolean | null
          website: string | null
        }
        Insert: {
          academic_role?: string | null
          applications_count?: number | null
          avatar_url?: string | null
          bio?: string | null
          certifications?: Json[] | null
          company?: string | null
          courses_completed?: number | null
          cover_image_url?: string | null
          created_at?: string
          department?: string | null
          education?: Json[] | null
          email: string
          email_notifications?: boolean | null
          experience?: Json[] | null
          experience_years?: number | null
          field_of_expertise?: string | null
          first_name?: string | null
          github_url?: string | null
          headline?: string | null
          id?: string
          institution?: string | null
          is_available_for_work?: boolean | null
          is_premium?: boolean | null
          job_title?: string | null
          last_active_at?: string | null
          last_name?: string | null
          linkedin_url?: string | null
          location?: string | null
          name: string
          other_field_of_expertise?: string | null
          phone_number?: string | null
          preferred_language?: string | null
          primary_skills?: string[] | null
          profile_strength?: number | null
          profile_views?: number | null
          profile_visibility?: string | null
          secondary_skills?: string[] | null
          skills?: string[] | null
          timezone?: string | null
          twitter_url?: string | null
          updated_at?: string
          username: string
          verified?: boolean | null
          website?: string | null
        }
        Update: {
          academic_role?: string | null
          applications_count?: number | null
          avatar_url?: string | null
          bio?: string | null
          certifications?: Json[] | null
          company?: string | null
          courses_completed?: number | null
          cover_image_url?: string | null
          created_at?: string
          department?: string | null
          education?: Json[] | null
          email?: string
          email_notifications?: boolean | null
          experience?: Json[] | null
          experience_years?: number | null
          field_of_expertise?: string | null
          first_name?: string | null
          github_url?: string | null
          headline?: string | null
          id?: string
          institution?: string | null
          is_available_for_work?: boolean | null
          is_premium?: boolean | null
          job_title?: string | null
          last_active_at?: string | null
          last_name?: string | null
          linkedin_url?: string | null
          location?: string | null
          name?: string
          other_field_of_expertise?: string | null
          phone_number?: string | null
          preferred_language?: string | null
          primary_skills?: string[] | null
          profile_strength?: number | null
          profile_views?: number | null
          profile_visibility?: string | null
          secondary_skills?: string[] | null
          skills?: string[] | null
          timezone?: string | null
          twitter_url?: string | null
          updated_at?: string
          username?: string
          verified?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          added_at: string
          course_id: string
          id: string
          user_id: string
        }
        Insert: {
          added_at?: string
          course_id: string
          id?: string
          user_id: string
        }
        Update: {
          added_at?: string
          course_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status:
        | "Open"
        | "Closed"
        | "Draft"
        | "pending"
        | "reviewing"
        | "withdrawn"
      experience_level: "Entry" | "Mid" | "Senior" | "Lead" | "Executive"
      job_type: "Full-time" | "Part-time" | "Contract" | "Freelance"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
