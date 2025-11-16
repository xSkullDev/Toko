import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase project URL (kept from your original script)
const SUPABASE_URL = 'https://tyiibbtuesgiqocvoqyc.supabase.co'
// IMPORTANT: replace the placeholder below with your Supabase ANON (public) key.
// Do NOT use the service_role key in the browser.
const SUPABASE_ANON_KEY = 'PASTE_YOUR_ANON_KEY_HERE'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function showMessage(text, type = 'error'){
	const el = document.getElementById('message')
	if(!el) return
	el.textContent = text
	el.className = 'message'
	if(type === 'error') el.classList.add('msg-error')
	else el.classList.add('msg-success')
	el.classList.remove('hidden')
	setTimeout(()=> el.classList.add('hidden'), 6000)
}

document.addEventListener('DOMContentLoaded', () => {
	const loginForm = document.getElementById('loginForm')
	const signupForm = document.getElementById('signupForm')
	const tabLogin = document.getElementById('tabLogin')
	const tabSignup = document.getElementById('tabSignup')

	tabLogin.addEventListener('click', () => {
		tabLogin.classList.add('active')
		tabSignup.classList.remove('active')
		loginForm.classList.remove('hidden')
		signupForm.classList.add('hidden')
		document.getElementById('message').classList.add('hidden')
	})

	tabSignup.addEventListener('click', () => {
		tabSignup.classList.add('active')
		tabLogin.classList.remove('active')
		signupForm.classList.remove('hidden')
		loginForm.classList.add('hidden')
		document.getElementById('message').classList.add('hidden')
	})

	loginForm.addEventListener('submit', async (e) => {
		e.preventDefault()
		const email = document.getElementById('loginEmail').value.trim()
		const password = document.getElementById('loginPassword').value
		if(!email || !password){ showMessage('Mohon isi email dan password', 'error'); return }
		try{
			const { data, error } = await supabase.auth.signInWithPassword({ email, password })
			if(error){ showMessage(error.message || 'Gagal login', 'error'); return }
			// sukses -> redirect ke dashboard
			window.location.href = 'dashboard.html'
		}catch(err){ showMessage(err.message || String(err), 'error') }
	})

	signupForm.addEventListener('submit', async (e) => {
		e.preventDefault()
		const email = document.getElementById('signupEmail').value.trim()
		const password = document.getElementById('signupPassword').value
		if(!email || !password){ showMessage('Mohon isi email dan password', 'error'); return }
		try{
			const { data, error } = await supabase.auth.signUp({ email, password })
			if(error){ showMessage(error.message || 'Gagal daftar', 'error'); return }
			// Jika signUp berhasil, coba signIn agar langsung diarahkan ke dashboard
			const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
			if(signInError){
				showMessage('Akun dibuat. Cek email untuk verifikasi jika diperlukan.', 'success')
				return
			}
			window.location.href = 'dashboard.html'
		}catch(err){ showMessage(err.message || String(err), 'error') }
	})
})