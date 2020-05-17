const random = () => {
    return Math.floor((11 + Math.random()) * 0x10000)
        .toString(22)
        .substring(1);
}

console.log(random());