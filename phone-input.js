const endpoint = 'https://api.ipgeolocation.io/ipgeo?apiKey=eedfd39bb571440e979bca47868c36c2'

// fetch
const fetchLocation = async () => {
  const response = await fetch(endpoint)
  const data = await response.json()
  return data
}

fetchLocation().then(data => {
    const code = data.country_code2.toLowerCase()
    
    console.log(data)

    const input = document.querySelector("[js-phone-input]")

    const iti = window.intlTelInput(input, {
        initialCountry: code,
        showSelectedDialCode: true,        
    //   utilsScript: "/intl-tel-input/js/utils.js?1707906286003" // just for formatting/placeholders etc
    });    

    setBigFlag(code)

    input.addEventListener('countrychange', function() {
        const code = iti.getSelectedCountryData().iso2
        setBigFlag(code)
    })    
})

function setBigFlag(code) {
    const flag = `https://flagicons.lipis.dev/flags/4x3/${code}.svg` 
    // console.log({code, flag})

    const flagEl = document.querySelector(".iti__flag")
    if (!flagEl) return
    flagEl.style.backgroundImage = `url(${flag})`
}

// props:
// calling_code
// country_name
// country_code2
