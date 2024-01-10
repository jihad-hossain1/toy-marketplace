export const saveUser = (user,phone) => {
    const currentUser = {
        email: user?.email,
        name: user?.displayName,
        image: user?.photoURL,
        phone: phone

    }

    fetch(`${import.meta.env.VITE_BASE_URL}/users/${user?.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
        })
}