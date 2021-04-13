const fetch = require('node-fetch')
const API_BASE = "https://ry3x6hiyc8.execute-api.us-east-1.amazonaws.com/prod"

const headers = {
    'Content-Type': 'application/json'
}

const Duda = {
    createSite: (templateId, session) => {
        return new Promise(async (resolve, reject) => {
            const url = `${API_BASE}/sites`
            const options = {
                method: 'POST',
                headers: { ...headers, Authorization: `Bearer ${session}` },
                body: JSON.stringify({
                    templateId: templateId
                })
            }
            const response = await fetch(url, options)
            if (response.error) {
                var result = {
                    statusCode: 500,
                    error: true,
                    message: ''
                }
                result.statusCode = response.statusCode
                result.error = response.error
                const error = await response.json()
                result.message = error.message
                reject(result)
            } else {
                resolve(await response.json())
            }
        })
    },
    createUser: (userId, session) =>{
        return new Promise(async (resolve, reject) => {
            const url = `${API_BASE}/users`
            const options = {
                method: 'POST',
                headers: { ...headers, Authorization: `Bearer ${session}` },
                body: JSON.stringify({
                    userId: userId
                })
            }
            const response = await fetch(url, options)
            if (response.error) {
                var result = {
                    statusCode: 500,
                    error: true,
                    message: ''
                }
                result.statusCode = response.statusCode
                result.error = response.error
                const error = await response.json()
                result.message = error.message
                reject(result)
            } else {
                resolve(await response.json())
            }
        })
    },
    deleteSite: (siteName, session) => {
        return new Promise(async (resolve, reject) => {
            const url = `${API_BASE}/sites/${siteName}`
            const options = {
                method: 'DELETE',
                headers: { ...headers, Authorization: `Bearer ${session}` },
            }
            const response = await fetch(url, options)
            if (response.error) {
                var result = {
                    statusCode: 500,
                    error: true,
                    message: ''
                }
                result.statusCode = response.statusCode
                result.error = response.error
                const error = await response.json()
                result.message = error.message
                reject(result)
            } else {
                resolve(await response.json())
            }
        })
    },
    getSSOLink: (userId, siteName, session) => {
        return new Promise(async (resolve, reject) => {
            const url = `${API_BASE}/users/${userId}/accessFor/${siteName}`
            const options = {
                method: 'GET',
                headers: { ...headers, Authorization: `Bearer ${session}` },
            }
            const response = await fetch(url, options)
            if (response.error) {
                var result = {
                    statusCode: 500,
                    error: true,
                    message: ''
                }
                result.statusCode = response.statusCode
                result.error = response.error
                const error = await response.json()
                result.message = error.message
                reject(result)
            } else {
                resolve(await response.json())
            }
        })
    },
    getSites: (session) => {
        return new Promise(async (resolve, reject) => {
            const url = `${API_BASE}/sites`
            const options = {
                method: 'GET',
                headers: { ...headers, Authorization: `Bearer ${session}` },
            }
            const response = await fetch(url, options)
            if (response.error) {
                var result = {
                    statusCode: 500,
                    error: true,
                    message: ''
                }
                result.statusCode = response.statusCode
                result.error = response.error
                const error = await response.json()
                result.message = error.message
                reject(result)
            } else {
                resolve(await response.json())
            }
        })
    },
    grantUserAccess: (userId, siteName, session) => {
        return new Promise(async (resolve, reject) => {
            const url = `${API_BASE}/users/${userId}/accessFor/${siteName}`
            const options = {
                method: 'POST',
                headers: { ...headers, Authorization: `Bearer ${session}` },
            }
            const response = await fetch(url, options)
            if (response.error) {
                var result = {
                    statusCode: 500,
                    error: true,
                    message: ''
                }
                result.statusCode = response.statusCode
                result.error = response.error
                const error = await response.json()
                result.message = error.message
                reject(result)
            } else {
                resolve(await response.json())
            }
        })
    },
    publishSite: (siteName, session) => {
        return new Promise(async (resolve, reject) => {
            const url = `${API_BASE}/sites/${siteName}/versions`
            const options = {
                method: 'POST',
                headers: { ...headers, Authorization: `Bearer ${session}` },
            }
            const response = await fetch(url, options)
            if (response.error) {
                var result = {
                    statusCode: 500,
                    error: true,
                    message: ''
                }
                result.statusCode = response.statusCode
                result.error = response.error
                const error = await response.json()
                result.message = error.message
                reject(result)
            } else {
                resolve(await response.json())
            }
        })
    },
    updateContent: (siteName, contentLibrary, session) => {
        return new Promise(async (resolve, reject) => {
            const url = `${API_BASE}/sites/${siteName}`
            const options = {
                method: 'PATCH',
                headers: { ...headers, Authorization: `Bearer ${session}` },
                body: JSON.stringify(contentLibrary)
            }
            const response = await fetch(url, options)
            if (response.error) {
                var result = {
                    statusCode: 500,
                    error: true,
                    message: ''
                }
                result.statusCode = response.statusCode
                result.error = response.error
                const error = await response.json()
                result.message = error.message
                reject(result)
            } else {
                resolve(await response.json())
            }
        })
    }
}

export default Duda