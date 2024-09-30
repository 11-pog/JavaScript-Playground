// Testing Site

function encodeID(hours, minutes, extra)
{
    return (hours << 23) | (minutes << 17) | extra;
}

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


var ID = encodeID(NaN, NaN, NaN)
var pedro = decodeID(ID);

console.log("cheese")