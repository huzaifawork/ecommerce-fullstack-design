import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const handleError = (error, defaultMessage) => {
  console.error(defaultMessage, error)
  throw error.response?.data?.message || defaultMessage
}

export const getAllProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams()
    if (filters.category) params.append('category', filters.category)
    if (filters.minPrice) params.append('minPrice', filters.minPrice)
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
    if (filters.search) params.append('search', filters.search)

    const response = await axios.get(`${API_URL}/products?${params}`)
    return response.data
  } catch (error) {
    handleError(error, 'Error fetching products')
  }
}

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`)
    return response.data
  } catch (error) {
    handleError(error, 'Error fetching product')
  }
}

export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/products/search/${query}`)
    return response.data
  } catch (error) {
    handleError(error, 'Error searching products')
  }
}

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData)
    return response.data
  } catch (error) {
    handleError(error, 'Error creating product')
  }
}

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, productData)
    return response.data
  } catch (error) {
    handleError(error, 'Error updating product')
  }
}

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${id}`)
    return response.data
  } catch (error) {
    handleError(error, 'Error deleting product')
  }
}

export const addReview = async (id, reviewData) => {
  try {
    const response = await axios.post(`${API_URL}/products/${id}/reviews`, reviewData)
    return response.data
  } catch (error) {
    handleError(error, 'Error adding review')
  }
}

export const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`)
    return response.data.slice(0, 8)
  } catch (error) {
    handleError(error, 'Error fetching featured products')
  }
}

export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/products?category=${category}`)
    return response.data
  } catch (error) {
    handleError(error, 'Error fetching products by category')
  }
}
