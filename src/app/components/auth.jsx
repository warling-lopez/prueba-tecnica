import { useState } from 'react'
import { supabase } from '../../Supabase/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4 sm:px-0">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
         warhub.inc
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Sign in via magic link with your email below
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Sending...' : 'Send magic link'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          You will receive an email with a login link.
        </p>
      </div>
    </div>
  )
}
