const idtobeuncropressed = 0;

function decodeID(id) {
    const hours = (id >> 23) & 0x1F;       // Extrai as horas
    const minutes = (id >> 17) & 0x3F;     // Extrai os minutos
    const extra = id & 0x1FFFF;            // Extrai o valor extra
    
    return {
        hours: hours,
        minutes: minutes,
        extra: extra
    };
}


var pedro = decodeID(idtobeuncropressed);


console.log("cheese")