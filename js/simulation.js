function energieDisponible(soc){

    return batterieReelle()*(soc/100);

}

function energieConsommee(distance){

    return distance*consoReelle()/100;

}

function socArrivee(distance,socDepart){

    const energieRestante=
        energieDisponible(socDepart)
        -energieConsommee(distance);

    return Math.round(
        energieRestante/
        batterieReelle()*100
    );

}

function rechargeNecessaire(socActuel){

    if(socActuel<strategieRecharge.reserveConfort)
        return strategieRecharge.socDepartMaximum;

    return strategieRecharge.socRechargeLongue;

}