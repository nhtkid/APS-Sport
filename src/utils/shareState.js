const defaultFilters = {
  school: 'all',
  sport: 'all',
  season: 'all',
  status: 'all',
}

const filterKeys = Object.keys(defaultFilters)

export function resetFilters() {
  return { ...defaultFilters }
}

export function filtersAreDefault(filters) {
  return filterKeys.every((key) => filters[key] === defaultFilters[key])
}

export function readFiltersFromLocation(search = window.location.search) {
  const params = new URLSearchParams(search)
  const nextFilters = { ...defaultFilters }

  for (const key of filterKeys) {
    const value = params.get(key)

    if (value) {
      nextFilters[key] = value
    }
  }

  return nextFilters
}

export function writeFiltersToUrl(filters) {
  const params = new URLSearchParams()

  for (const key of filterKeys) {
    if (filters[key] !== defaultFilters[key]) {
      params.set(key, filters[key])
    }
  }

  const search = params.toString()
  const nextUrl = `${window.location.pathname}${search ? `?${search}` : ''}`

  window.history.replaceState({}, '', nextUrl)
}

export function buildShareUrl(filters) {
  const params = new URLSearchParams()

  for (const key of filterKeys) {
    if (filters[key] !== defaultFilters[key]) {
      params.set(key, filters[key])
    }
  }

  const origin = window.location.origin
  const path = window.location.pathname
  const search = params.toString()

  return `${origin}${path}${search ? `?${search}` : ''}`
}