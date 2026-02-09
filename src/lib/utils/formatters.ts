import { format, formatDistanceToNow } from 'date-fns'

export const formatDate = (date: Date | null, formatStr: string = 'PPP'): string => {
  if (!date) return 'N/A'
  return format(date, formatStr)
}

export const formatRelativeTime = (date: Date | null): string => {
  if (!date) return 'Never'
  return formatDistanceToNow(date, { addSuffix: true })
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num)
}

export const formatPercentage = (value: number, decimals: number = 0): string => {
  return `${value.toFixed(decimals)}%`
}

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const toCamelCase = (text: string): string => {
  return text.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
}

export const toKebabCase = (text: string): string => {
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}