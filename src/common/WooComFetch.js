
import WooCommerceAPI from 'react-native-woocommerce-api'
import theme from './Theme.style'
import base64 from 'react-native-base64'
const WooAPI = new WooCommerceAPI({
  url: theme.url.startsWith('https')
    ? theme.url
    : theme.url.replace('http', 'https'),
  ssl: true,
  consumerKey: theme.consumerKey, // Your consumer secret
  consumerSecret: theme.consumerSecret, // Your consumer secret
  wp_api: true,
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true
})
export const getHeadersForHttp = (url) => {
  let headers = { 'Content-Type': 'application/json' }
  // if (url.indexOf('wcfmmp') !== -1 || url.indexOf('posts') !== -1 || url.indexOf('wp-json') !== -1) {
  // nikita add this code
  if (url.includes('wcfmmp') || url.includes('/private/') || url.includes('/secure/'))
 {
    const Authorization = 'Basic ' + base64.encode(theme.yourVendorUserNameString + ':' + theme.yourVendorPasswordString)
    headers = Object.assign({ Authorization: Authorization }, headers)
  }
  return headers
}

// Get Request
export const getFetchHttp = async (url) => {
  const returnObject = {}
  try {
    const customHeaders = getHeadersForHttp(url)
    const httpOptions = {
      headers: customHeaders,
      method: 'GET'
    }
    // alert(JSON.stringify(httpOptions));
    const res = await fetch(url, httpOptions)
      .then(response => response.json())
    returnObject.status = 'success'
    returnObject.data = res

    return returnObject
  } catch (err) {
    returnObject.status = 'error'
    returnObject.data = err.response
    return returnObject
  }
}

// post request
// Get Request
export const postFetchHttp = async (url, data) => {
  const returnObject = {}
  try {
    const customHeaders = getHeadersForHttp(url)

    const requestOptions = {
      method: 'POST',
      body: data,
      // body: JSON.stringify({
      //     name:"testing",
      //     email:"testing2@gmail.com",
      //     message:"testing",
      //     subject:"testing"
      
      // }),
      headers: customHeaders
    }

    console.log("custom header : ",customHeaders);
    console.log('data : ',data);
//  console.log('url',url);
    const res = await fetch(url, requestOptions)
      .then(response => response.json());
    returnObject.status = 'success'
    returnObject.data = res
    
    return returnObject
  } catch (err) {
    returnObject.status = 'error'
    returnObject.data = err.response

    return returnObject
  }
}

export const getHttp = async (url, obj) => {
  const returnObject = {}
  try {
    const res = await WooAPI.get(url, obj)
    returnObject.status = 'success'
    returnObject.data = res
    return returnObject
  } catch (err) {
    returnObject.status = 'error'
    returnObject.data = err.response
    return returnObject
  }
}

export const postHttp = async (url, body) => {
  const returnObject = {}
  try {
    const res = await WooAPI.post(url, body)
    returnObject.status = 'success'
    returnObject.data = res
    return returnObject
  } catch (err) {
    returnObject.status = 'error'
    returnObject.data = err.response
    return returnObject
  }
}

export const putHttp = async (url, body) => {
  const returnObject = {}
  try {
    const res = await WooAPI.put(url, body)
    returnObject.status = 'success'
    returnObject.data = res
    return returnObject
  } catch (err) {
    returnObject.status = 'error'
    returnObject.data = err.response
    return returnObject
  }
}

export const getUrl = () => {
  if (theme.url.startsWith('https')) {
    return theme.url + '/api/client/'
  } else {
    return theme.url.replace('http', 'https') + '/api/client/'
  }
}
