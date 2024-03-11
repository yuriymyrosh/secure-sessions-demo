import { ref } from "vue"
import { useRouter } from "vue-router"

export const useAuth = () => {
  const router = useRouter()
  
  const token = ref('')
  const username = ref('')
  const password = ref('')
  
  const getCSRF = async () => {
    const response = await fetch("http://localhost:3000/users-form", { credentials: 'include' })
    const data = await response.json()
  
    token.value = data?.csrfToken || ''
  }
  
  const onLogin = async (event: Event) => {
    event.preventDefault()

    await getCSRF()
  
    if (!username.value.trim() || !password.value.trim()) {
      alert('Input all fields')
      return
    }
  
   await fetch('http://localhost:3000/login', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        _csrf: token.value,
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log({data})
      username.value = ''
      password.value = ''
    })
    .catch(err => {
      console.error(err)
    })
    .finally(() => {
      router.push('/dashboard')
    })
  }
  
  const onLogout = async () => {
    await getCSRF()

    const response = await fetch('http://localhost:3000/logout', {
      mode: 'cors',
      credentials: 'include',
    })
  
    const data = await response.json()
  
    console.log({data})
  }
  
  
  const getUsers = async () => {
    await getCSRF()

    fetch('http://localhost:3000/users', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        _csrf: token.value
      })
    })
    .then(res => res.json())
    .then((data) => {
      console.log('fetch/users: ', data)
    })
  }
  
  const getSessionData = async () => {
    await getCSRF()

    return fetch('http://localhost:3000/session-data', {
      mode: 'cors',
      credentials: 'include',
    })
    .then(res => res.json()) 
    .then(data => {
      return data.session
    })
    .catch(e => {
      console.error(e)
      return null
    })
  }

  return {
    token,
    username,
    password,
    getCSRF,
    onLogin,
    onLogout,
    getUsers,
    getSessionData
  }
}