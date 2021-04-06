import { ProxyState } from "../AppState.js";
import { housesService } from "../Services/HousesService.js";


//Private
function _draw() {
    let houses = ProxyState.houses
    let template = ''
    houses.forEach(house => {
        template += house.Template
    })
    document.getElementById('houses').innerHTML = template
}
function showHouses() {
    let house = (document.getElementById("houseApp"))
    if (!car.classList('d-none')) {
        car.classList.add('d-none')
    } else {
        car.classList.remove('d-none')
    }
}
showCars()


//Public
export default class HousesController {
    constructor() {
        ProxyState.on('houses', _draw);

        // REVIEW
        // GET CARS ON LOAD
        this.getHouses()
    }

    async getHouses() {
        try {
            await housesService.getHouses()
        } catch (error) {
            console.error(error)
        }
    }

    async createHouse() {
        try {
            window.event.preventDefault()
            const form = window.event.target
            let newHouse = {
                // @ts-ignore
                price: form.price.value,
                // @ts-ignore
                bedrooms: form.bedrooms.value,
                // @ts-ignore
                bathrooms: form.bathrooms.value,
                levels: form.levels.value,
                // @ts-ignore  this converts the string to a number
                year: Number(form.price.value),
                // @ts-ignore
                description: form.description.value,
                // @ts-ignore
                imgUrl: form.imgUrl.value
            }
            await housesService.createHouse(newHouse)

            // @ts-ignore
            form.reset()

            $('#new-house-form').modal('hide')
        } catch (error) {
            console.error(error)
        }
    }


    deleteHouse(id) {
        try {
            housesService.deleteHouse(id)
        } catch (error) {
            console.error(error)
        }
    }

    bid(id) {
        housesService.bid(id)
    }

}