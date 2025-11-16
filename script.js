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
		const store = document.getElementById('loginStore').value.trim()
		const password = document.getElementById('loginPassword').value
		if(!store || !password){ showMessage('Mohon isi nama toko dan password', 'error'); return }
		const slug = slugify(store)
		const email = `${slug}@toko.local`
		try{
			const { data, error } = await supabase.auth.signInWithPassword({ email, password })
			if(error){ showMessage(error.message || 'Gagal login — cek nama toko dan password', 'error'); return }
			// sukses -> redirect ke dashboard
			window.location.href = 'dashboard.html'
		}catch(err){ showMessage(err.message || String(err), 'error') }
	})

	signupForm.addEventListener('submit', async (e) => {
		e.preventDefault()
		const store = document.getElementById('signupStore').value.trim()
		const password = document.getElementById('signupPassword').value
		if(!store || !password){ showMessage('Mohon isi nama toko dan password', 'error'); return }
		const slug = slugify(store)
		const email = `${slug}@toko.local`
		try{
			// signUp with pseudo-email derived from store name and include store_name in user metadata
			const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { store_name: store } } })
			if(error){ showMessage(error.message || 'Gagal daftar — mungkin nama toko sudah dipakai', 'error'); return }
			// Jika signUp berhasil, coba signIn agar langsung diarahkan ke dashboard
			const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
			if(signInError){
				showMessage('Akun dibuat. Jika verifikasi email diaktifkan, cek email (pseudo-email digunakan).', 'success')
				return
			}
			window.location.href = 'dashboard.html'
		}catch(err){ showMessage(err.message || String(err), 'error') }
	})

	// helper: create simple slug from store name
	function slugify(text){
		return text.toString().toLowerCase()
			.normalize('NFKD')
			.replace(/[^a-z0-9\s-]/g, '')
			.trim()
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
	}
})