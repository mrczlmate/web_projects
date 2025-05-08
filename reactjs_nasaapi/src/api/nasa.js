export async function fetchApodData(NASA_KEY) {
    const today = (new Date()).toDateString()
    const localKey = `nasaData-${today}`

    if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey))
        console.log('Fetched from local storage')
        return apiData
    }

    localStorage.clear()

    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`)
    const apiData = await response.json()

    if (!response.ok) throw new Error('Network response was not ok')

    localStorage.setItem(localKey, JSON.stringify(apiData))
    console.log('Fetched from API')

    return apiData
}