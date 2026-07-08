# Roadbook-VE
Préparez vos voyages en véhicule électrique en toute sérénité.
# Roadbook VE

Application web de préparation de trajets en véhicule électrique.

## Objectifs

- Préparer des voyages longue distance
- Optimiser les recharges
- Comparer les cartes RFID
- Gérer plusieurs véhicules
- Générer un roadbook PDF
- Fonctionner hors connexion
- Hébergement sur Synology

## Technologies

- HTML
- CSS
- JavaScript
- Bootstrap
- LocalStorage
- JSON

Projet développé par Julien avec ChatGPT.
Idées futures
- Météo
- Waze
- PDF
- OBD Bluetooth
- Historique des voyages
- Export Excel
## À améliorer plus tard : interface plein écran

- Faire tenir le tableau de bord sur une seule page sans zoom navigateur à 75%.
- Réduire ou replier le menu latéral.
- Déplacer la carte plus haut ou la rendre plus compacte.
- Supprimer ou réduire le footer véhicule en bas.
- Déplacer le résumé batterie/autonomie du menu gauche vers le tableau de bord.
- Adapter l’interface pour écran PC, tablette et téléphone.
- Prévoir un mode "Roadbook conducteur" très lisible avec seulement :
  - prochaine étape
  - prochaine recharge
  - batterie prévue
  - heure d’arrivée estimée
  - bouton Google Maps / Waze
  ## Hébergement

Roadbook VE peut être hébergé sur un Synology avec Web Station (Nginx).

Exemple d'accès local :

http://192.168.1.41/Roadbook-VE/

Technologies utilisées :
- HTML
- CSS
- JavaScript
- Leaflet
- OpenStreetMap
- OpenRouteService