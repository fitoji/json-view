import data from "../data/MOCK_DATA.json"

export const pedirData = (() => {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)

    }, 500)
  })
})

export const pedirItemPorId = (id) => {
  return new Promise((resolve, reject) => {
    const item = data.find((el) => el.id === id)
    if (item) {
      resolve(item)
    } else {
      reject({
        error: "no se encotro el articulo"
      })
    }
  })
}