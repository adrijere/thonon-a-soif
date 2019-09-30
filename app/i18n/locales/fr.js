export default {
  dashboard: {
    title : {
      suggestions: 'Prestations proposées',
      drawSuggestions: 'Prestations en pioche',
      affected: 'RDV à prendre',
      ongoingPassages: 'Passages à valider',
      ongoingServices: 'Prestations à facturer'
    }
  },
  description:{
    demand: {
      affectedServices: "Rendez vous à prendre",
      affectedRecurringDemand: "Rendez vous récurrent à prendre",
      ongoingPassages: "Passage à valider",
      ongoingServices: "Prestation à facturer",
      recurringSuggestions: "Prestation récurrente proposée",
      serviceSuggestions: "Prestation proposée",
      drawSuggestions: "Prestations en pioche",
      ongoing: {
        ongoingServices: "Prestation en cours",
        ongoingPassages: "Passage en cours",
      },
      passed: {
        ongoingServices: "Prestation à facturer",
        ongoingPassages: "Passage à valider",
      }
    },
    refuseReason: {
      "too-far" : "La prestation est trop loin.",
      "unavailable" : "Je ne suis pas disponible.",
      "missing-skill" : "Je ne sais pas faire.",
      "low-money" : "Ce n'est pas assez payé.",
      "not-interested" : "Cela ne m'intéresse pas.",
      "no-detail" : "Il n'y a pas assez de détails.",
      "missing-tools" : "Je n'ai pas les outils demandés.",
      "many-waiting-demand" : "J'ai trop de prestations en attente.",
      "other" : "Autre",
    },
    vehicleTypeDimensions: {
      kangoo: 'Kangoo - 3m3',
      trafic: 'Trafic - 6m3',
      master: 'Master - 9m3',
      van: 'Petit Camion - 12m3',
      truck: 'Camion - 20m3',
      car: 'Voiture'
    },
  },
  profile: {
    "icon-date": "Ponctuel(le)",
    "icon-efficient": "Efficace",
    "icon-niceguy": "Très Sympa",
    "icon-thumb": "Très professionel(le)",
    "icon-clean": "A laissé l'endroit propre",
    mainActivity: {
      all: "Toutes les activités",
      cleaning: "Ménage",
      handyman: "Bricoleur",
      henchman: "Gros bras",
      "helping-hand": "Petits coups de main",
      geek: "Geek",
    }
  },
  solde:{
    title:{
      entry: {
        credit:{
          commission: "Annulation commission",
          "credit-card-payment": "Paiement",
          "promo-code": "Réduction LDMR",
          "voucher-creating": "Réduction LDMR",
          "voucher-using": "Réduction LDMR",
          "direct-payment": "PRELEVEMENT SUR MON COMPTE",
          "fund-withdrawal": "TRANSFERT VERS MON COMPTE",
          "management-fee": "Frais de gestion",
          dispute: "Litige"
        },
        debit:{
          commission: "Commission",
          "credit-card-payment": "Annulation paiement",
          "promo-code": "Annulation réduction LDMR",
          "voucher-creating": "Réduction LDMR",
          "voucher-using": "Annulation réduction LDMR",
          "direct-payment": "PRELEVEMENT SUR MON COMPTE",
          "fund-withdrawal": "TRANSFERT VERS MON COMPTE",
          "management-fee": "Frais de gestion",
          "register-fee": "Frais d'enregistrement Lulu dans ma rue",
          dispute: "Litige"
        }
      }
    },
    icon: {
      entry: {
        commission: "percent",
        "credit-card-payment": "credit-card",
        "promo-code": "wallet-giftcard",
        "voucher-creating": "wallet-giftcard",
        "voucher-using": "wallet-giftcard",
        "direct-payment": "upload",
        "fund-withdrawal": "upload",
        "management-fee" : "currency-eur",
        "register-fee": "currency-eur",
        dispute: "alert"
      }
    }
  }
};
