import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchContext = createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider')
  }
  return context
}

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`)
    } else {
      navigate('/products')
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      handleSearch,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  )
}
