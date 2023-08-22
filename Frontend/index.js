
const baseurl = `https://backend-mrkishansharma.vercel.app`

function handleLogin(e) {
    e.preventDefault()

    const Email = e.target.email_L.value
    const Password = e.target.password_L.value

    const payload = { Email, Password }

    fetch(`${baseurl}/login`, {
        method: "POST",
        headers: {
            "content-type": 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert(data.msg)
            if (!data.isError) {
                localStorage.setItem('token', data.token)
                location.href = './Dashboard.html'
            }
        })
        .catch(err => {
            console.log(err);
        })

}


function handlSignup(e) {
    e.preventDefault()

    console.log(e);

    const Email = e.target.email_R.value
    const Password = e.target.password_R.value
    const Con_password = e.target.con_password_R.value

    if (Password !== Con_password) {
        alert('Password And COnfirm Password Not Match')
        return
    }

    const payload = { Email, Password }

    console.log(payload);

    fetch(`${baseurl}/signup`, {
        method: "POST",
        headers: {
            "content-type": 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert(data.msg)

        })
        .catch(err => {
            console.log(err);
        })

}

