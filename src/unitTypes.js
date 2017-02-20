import {leftPad} from './leftPad'

const unit = (unitSpec) => (val, stringOpts) => ({
  value: val,
  valueToString: (opts) => val.toLocaleString('en-US', {...unitSpec.defaultStringOpts, ...stringOpts, ...opts}),
  toString: ({short = false, ...opts} = {}) => {
    const valueString = val.toLocaleString('en-US', {...unitSpec.defaultStringOpts, ...stringOpts, ...opts})
    const unitString = short ? unitSpec.short : unitSpec.long
    const specSeperator = (unitSpec.seperator && (short ? unitSpec.seperator.short : unitSpec.seperator.long))
    const seperator = (specSeperator !== undefined) ? specSeperator : ' ' // this is a bit wordy because '' is falsy in JS
    return valueString + seperator + unitString
  },
  ...unitSpec
})

export const meters = unit({
  long: 'meters',
  short: 'm',
  compound: false,
  defaultStringOpts: {useGrouping: true, maximumFractionDigits: 0}
})

export const km = unit({
  long: 'kilometers',
  short: 'km',
  compound: false,
  defaultStringOpts: {useGrouping: true, maximumFractionDigits: 1}
})

export const feet = unit({
  long: 'feet',
  short: 'ft',
  compound: false,
  defaultStringOpts: {useGrouping: true, maximumFractionDigits: 0}
})

export const miles = unit({
  long: 'miles',
  short: 'mi',
  compound: false,
  defaultStringOpts: {useGrouping: true, maximumFractionDigits: 1}
})

export const kmPerHour = unit({
  long: 'km per hour',
  short: 'kph',
  compound: true,
  defaultStringOpts: {useGrouping: true, maximumFractionDigits: 1}
})

export const milesPerHour = unit({
  long: 'miles per hour',
  short: 'mph',
  compound: true,
  defaultStringOpts: {useGrouping: true, maximumFractionDigits: 1}
})

export const grade = unit({
  long: 'percent',
  short: '%',
  compound: false,
  defaultStringOpts: {useGrouping: false, maximumFractionDigits: 1, minimumFractionDigits: 1},
  seperator: {short: '', long: ' '}
})

export const degrees = unit({
  long: 'degrees',
  short: 'º',
  compound: false,
  defaultStringOpts: {useGrouping: false, maximumFractionDigits: 1, minimumFractionDigits: 1},
  seperator: {short: '', long: ' '}
})

const MINUTE = 60
const HOUR = 60 * 60
const timePad = (num) => leftPad(num, 2, '0')

export const minuteSecond = (seconds, stringOpts) => ({
  long: 'mm:ss',
  short: 'min',
  compound: false,
  toString: ({short = false} = {}) => {
    const mins = timePad(Math.floor(seconds / MINUTE))
    const secs = timePad(Math.floor(seconds) % MINUTE)
    return `${mins}:${secs} ${short ? 'mm:ss' : 'min'}`
  },
  valueToString: () => {
    const mins = timePad(Math.floor(seconds / MINUTE))
    const secs = timePad(Math.floor(seconds) % MINUTE)
    return `${mins}:${secs}`
  }
})

export const hourMinuteSecond = (seconds, stringOpts) => ({
  long: 'hh:mm',
  short: 'hrs',
  compound: false,
  defaultStringOpts: '',
  valueToString: () => {
    const hrs = Math.floor(seconds / HOUR)
    const mins = timePad(Math.floor((seconds % HOUR) / MINUTE))
    return `${hrs}:${mins}`
  },
  toString: ({short = false} = {}) => {
    const hrs = Math.floor(seconds / HOUR)
    const mins = timePad(Math.floor((seconds % HOUR) / MINUTE))
    return `${hrs}:${mins} ${short ? 'mm:ss' : 'hrs'}`
  }
})

export const paceKm = (secondsPerKm) => ({
  short: 'min/km',
  long: 'minutes per km',
  compound: true,
  valueToString: hourMinuteSecond(secondsPerKm).valueToString,
  toString: ({short = false} = {}) => {
    hourMinuteSecond(secondsPerKm).valueToString() + ' ' + (short ? 'min/km' : 'minutes per km')
  }
})

export const paceMiles = (secondsPerMile) => ({
  short: 'min/mi',
  long: 'minutes per mi',
  compound: true,
  valueToString: hourMinuteSecond(secondsPerMile).valueToString,
  toString: ({short = false} = {}) => {
    hourMinuteSecond(secondsPerMile).valueToString() + ' ' + (short ? 'min/mi' : 'minutes per mile')
  }
})
