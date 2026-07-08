function majSidebar() {

  document.getElementById("sideBattery").textContent =
    batterieReelle().toFixed(1) + " kWh";

  document.getElementById("sideRange").textContent =
    autonomie() + " km";

  document.getElementById("footerVehicule").textContent =
    "🚗 " + vehicule.modele;

  document.getElementById("footerSoh").textContent =
    "🔋 SOH : " + vehicule.soh + " %";

  document.getElementById("footerJantes").textContent =
    "🛞 Jantes : " + vehicule.jantes + " pouces";

  document.getElementById("footerConso").textContent =
    "📊 Conso : " + vehicule.conso + " kWh/100 km";
}