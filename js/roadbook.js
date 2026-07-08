function genererRoadbook() {

  let soc = 100;
  let cumul = 0;
  let html = "";

  mission.etapes.forEach((etape, index) => {

    if (index > 0) {
      soc -= consoPourcentage(etape.distance);
      cumul += etape.distance;
    }

    html += `
      <tr>
        <td>${etape.nom}</td>
        <td>${etape.distance} km</td>
        <td>${cumul} km</td>
        <td class="${couleurSoc(soc)}">${Math.round(soc)} %</td>
        <td>${statutSoc(soc)}</td>
      </tr>
    `;

    if (etape.recharge !== null) {
      soc = etape.recharge;
    }

  });

  return html;
}

function genererTroncons() {

  let html = "";

  mission.troncons.forEach((troncon, index) => {

    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${troncon.depart}</td>
        <td>${troncon.arrivee}</td>
        <td>${troncon.distance} km</td>
        <td>${libelleRoute(troncon.route)}</td>
      </tr>
    `;

  });

  return html;
}