function convertirGps(texte) {
  if (!texte || texte.trim() === "") return null;

  texte = texte.trim().replaceAll(",", " ");

  const decimal = texte.match(/(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)/);
  if (decimal) {
    return [Number(decimal[3]), Number(decimal[1])];
  }

  const regex = /(\d+)°\s*(\d+)'?\s*(\d+(?:\.\d+)?)?"?\s*([NSEO])/gi;
  const valeurs = [...texte.matchAll(regex)];

  if (valeurs.length < 2) return null;

  function dmsToDecimal(v) {
    let deg = Number(v[1]);
    let min = Number(v[2]);
    let sec = Number(v[3] || 0);
    let dir = v[4].toUpperCase();

    let dec = deg + min / 60 + sec / 3600;

    if (dir === "S" || dir === "O" || dir === "W") {
      dec = -dec;
    }

    return dec;
  }

  const lat = dmsToDecimal(valeurs[0]);
  const lon = dmsToDecimal(valeurs[1]);

  return [lon, lat];
}

async function pointVersCoordonnees(adresse, gps) {
  const coordGps = convertirGps(gps);

  if (coordGps) {
    return coordGps;
  }

  return await geocoderAdresse(adresse);
}

async function calculerDistanceTroncon(troncon) {
  return await calculerDistance(
    troncon.depart,
    troncon.arrivee,
    troncon.departGps,
    troncon.arriveeGps
  );
}

async function calculerDistance(depart, arrivee, departGps = "", arriveeGps = "") {
  const url = "https://api.openrouteservice.org/v2/directions/driving-car";

  try {
    const coordDepart = await pointVersCoordonnees(depart, departGps);
    const coordArrivee = await pointVersCoordonnees(arrivee, arriveeGps);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": ORS_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        coordinates: [coordDepart, coordArrivee]
      })
    });

    const data = await response.json();

    if (!data.routes || !data.routes[0]) {
      alert("ORS n'a pas trouvé d'itinéraire pour : " + depart + " → " + arrivee);
      return 0;
    }

    return Math.round(data.routes[0].summary.distance / 1000);

  } catch (erreur) {
    console.error("Erreur ORS :", erreur);
    alert("Erreur ORS : " + erreur.message);
    return 0;
  }
}

async function geocoderAdresse(adresse) {
  const url =
    "https://api.openrouteservice.org/geocode/search" +
    "?api_key=" + ORS_API_KEY +
    "&text=" + encodeURIComponent(adresse);

  const response = await fetch(url);
  const data = await response.json();

  if (!data.features || data.features.length === 0) {
    throw new Error("Adresse introuvable : " + adresse);
  }

  return data.features[0].geometry.coordinates;
}