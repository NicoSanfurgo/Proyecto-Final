
document.addEventListener('DOMContentLoaded', () => {

    const login = async (user)=> {
        try{
            const res = await fetch('/auth/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const jsonData = await res.json()
            return jsonData
    
        }catch(err){
            throw err 
        }
    }
    const form = document.getElementById('form-login')
    form.addEventListener('submit',async (e)=>{
        try{
            e.preventDefault()
            const email = document.getElementsByName('email')[0].value
            const password = document.getElementsByName('password')[0].value
            const res = await fetch('/auth/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email, password: password })
            })
            const jsonData = await res.json()
            console.log(jsonData)

            if(res.ok){
                alert('Ha iniciado sesion')

                window.location.replace('/')
            }
           
        }catch(err){
            console.log(err)
        }
    })
})
