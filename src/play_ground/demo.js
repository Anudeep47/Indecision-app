const play = () => "this is playground";

console.log(play());

const multiplier = {
    numbers: [1,2,3,4,5,6,7],
    multiplyBy: 7,
    multiply(){
        return this.numbers.map((num) => this.multiplyBy*num);
    }
};

console.log(multiplier.multiply());