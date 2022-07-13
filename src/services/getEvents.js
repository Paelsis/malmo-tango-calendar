import request from 'superagent'
import moment from 'moment-with-locales-es6'
import getStyle from './getStyle'
const CULTURE = (language) => language===LANGUAGE_SV?'sv':language===LANGUAGE_ES?'es':'en'

const LANGUAGE_SV='SV'
const LANGUAGE_ES='ES'

const findParameter = (s, val) => {
  const idx = s.indexOf(val)  
  console.log('findParameter', val, 'idx',  idx)
  if (idx != -1) {
    const value = s.slice(idx).match(/(\d+)/)[0]
    console.log('newString', s.slice(idx), 'value', value)
    return value
  } else {
    return undefined
  }  
}  

// export means that this function will be available to any module that imports this module
export function getEvents (calendarId, apiKey, callback, timeMin, timeMax, language) {
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=${true}&orderBy=startTime`
  
  function cityForEvent (title, location) {
    if ((title.toLowerCase().indexOf('malmö') !== -1) ||
        (title.toLowerCase().indexOf('lund') !== -1)) {
        return undefined 
    } else {        
        return location?(location.toLowerCase().indexOf('malmö') !== -1)?'Malmö'
               :(location.toLowerCase().indexOf('lund') !== -1)?'Lund'
               :(location.toLowerCase().indexOf('michael') !== -1)?'Lund'
               :(location.toLowerCase().indexOf('tangokompaniet') !== -1)?'Malmö'
               :(location.toLowerCase().indexOf('studio') !== -1)?'Malmö'
               :undefined:undefined          
    }    
  }    

  
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        // create array to push events into
        const events = []
        let previousEndDate=null
        let dateStyle = null
        // in practice, this block should be wrapped in a try/catch block, 
        // because as with any external API, we can't be sure if the data will be what we expect
        moment.locale(CULTURE(language))
        let previousWeekNumber = 0
        let isLightColor = false
        JSON.parse(resp.text).items.map((it) => {
          const start = it.start.dateTime?it.start.dateTime:it.start.date
          const end = it.end.dateTime?it.end.dateTime:it.end.date
          const description = it.description?it.description:''
          const location = it.location?it.location.replace(/Tangokompaniet, |, 212 11 |, 224 64|, 223 63|, Sverige|Stiftelsen Michael Hansens Kollegium, /g, ' ').replace('Fredriksbergsgatan','Fredriksbergsg.'):'Plats ej angiven'
          const sameDate = moment(start).isSame(moment(previousEndDate), 'd') && moment(start).isSame(moment(end), 'd')
          const isToday = moment().isSame(moment(start), 'day')?true:false
          const isWeekend = moment(start).isoWeekday() >=6;
          const calendar = moment(start).calendar()
          const title = it.summary?it.summary:'No Title'
          const city = cityForEvent(title, location)
          const weekNumber = moment(start).isoWeek()
          const maxPar = Number(findParameter(description, 'MAX_PAR'))
          const maxInd = Number(findParameter(description, 'MAX_IND'))
          const maxRegistrants = Number(maxInd?maxInd:maxPar?(maxPar*2):500)
          const useRegistrationButton = it.description?(it.description.indexOf('MAX_IND')!==-1 || it.description.indexOf('MAX_PAR')!==-1):false
          const style = getStyle(title, description)

          isLightColor = weekNumber===previousWeekNumber?isLightColor:!isLightColor
          previousWeekNumber = weekNumber

          let event = {
            start,
            end,
            description,
            title,
            location,
            sameDate,
            isToday,
            isWeekend,
            isLightColor,
            weekNumber,
            calendar,
            city,
            maxPar,
            maxInd,
            maxRegistrants,
            useRegistrationButton,
            style, 
          }  
          events.push(event)
          previousEndDate=end
         
        })
        callback(events)
      } 
    })
}