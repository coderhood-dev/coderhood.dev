import { supabase } from '@/lib/supabaseClient'

export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res)
}
