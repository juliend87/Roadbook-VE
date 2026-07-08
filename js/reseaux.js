const reseauxRecharge = {
  Powerdot: {
    nom: "Powerdot",
    couleur: "🟣",
    priorite: 1,
    commentaire: "Très bon réseau à privilégier au Portugal et sur certains axes."
  },

  Zunder: {
    nom: "Zunder",
    couleur: "🟢",
    priorite: 1,
    commentaire: "Excellent réseau en Espagne, souvent fiable et puissant."
  },

  Iberdrola: {
    nom: "Iberdrola",
    couleur: "🔵",
    priorite: 2,
    commentaire: "Bon réseau de secours, parfois un peu plus cher."
  },

  "Iberdrola / bp pulse": {
    nom: "Iberdrola / bp pulse",
    couleur: "🔵",
    priorite: 2,
    commentaire: "Intéressant si beaucoup de stèles disponibles."
  },

  Wenea: {
    nom: "Wenea",
    couleur: "🟠",
    priorite: 2,
    commentaire: "Bon réseau espagnol, utile près de la frontière."
  },

  Prio: {
    nom: "Prio",
    couleur: "🟡",
    priorite: 2,
    commentaire: "Utile au Portugal, surtout à Vilar Formoso."
  },

  Atlante: {
  nom: "Atlante",
  couleur: "🟦",
  priorite: 2,
  commentaire: "Excellent réseau présent en Espagne et au Portugal. Bornes généralement fiables et bien situées."
},

  Izivia: {
    nom: "Izivia",
    couleur: "🔴",
    priorite: 3,
    commentaire: "À garder en secours selon prix et disponibilité."
  },

  Tesla: {
    nom: "Tesla",
    couleur: "⚪",
    priorite: 2,
    commentaire: "Très fiable si ouvert aux autres véhicules."
  },

  Ionity: {
    nom: "Ionity",
    couleur: "⚡",
    priorite: 2,
    commentaire: "Puissant, mais prix à surveiller."
  }
};

function infosReseau(nomReseau) {
  return reseauxRecharge[nomReseau] || {
    nom: nomReseau,
    couleur: "📍",
    priorite: 9,
    commentaire: "Réseau non renseigné."
  };
}