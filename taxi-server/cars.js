let cars = [
    {
        car_id: 1,
        car_number: "CJ44TMP",
        driver_name: "Miguel Fernandes",
        itp_date: "16.01.2021"
    },
    {
        car_id: 2,
        car_number: "PH90DDD",
        driver_name: "Dario Sanchez",
        itp_date: "16.01.2021"
    },
    {
        car_id: 3,
        car_number: "B 666 APP",
        driver_name: "Cristoph Bertz",
        itp_date: "9.04.2023"
    }
]

let maxId = 3;

module.exports = {
    getCars: function () {
        return cars;
    },
    getCar: function (id) {
        return cars.find(car => car.car_id === parseInt(id) || car.car_id === id);
    },
    postCar: function (car) {
        //car = JSON.parse(car)
        console.log(car)
        maxId++;
        car.car_id = maxId;
        cars.push(car);
        return this.getCar(maxId);
    }
}
