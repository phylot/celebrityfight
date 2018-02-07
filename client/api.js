// TODO: Put all calls to backend api here
// For now, simply export card JSON and any other object data from here

export const cards = [
{
  "number": "001",
  "code": "MORGANFREEMAN",
  "name": "Morgan Freeman",
  "stats": [
      {"attribute":"age","value":100,"label":"Age"},
      {"attribute":"strength","value":32,"label":"Strength"},
      {"attribute":"intelligence","value":95,"label":"Intelligence"},
      {"attribute":"speed","value":5,"label":"Speed"}
  ],
  "abilityPresent": true,
  "abilityUsed": false,
  "abilityType": "STATSHOW",
  "ability": "FORESIGHT",
  "abilityLabel": "Foresight",
  "abilityDescription": "See one random stat on your opponent's card",
  "battlecry": "I'm the one. The Divine Being. Alpha and Omega.",
  "image": "/client/img/freeman.jpg"
},
{
  "number": "002",
  "code": "SEANBEAN",
  "name": "Sean Bean",
  "stats": [
      {"attribute":"age","value":56,"label":"Age"},
      {"attribute":"strength","value":94,"label":"Strength"},
      {"attribute":"intelligence","value":78,"label":"Intelligence"},
      {"attribute":"speed","value":85,"label":"Speed"}
  ],
  "abilityPresent": true,
  "abilityUsed": false,
  "abilityType": "STRENGTHDAMAGE",
  "ability": "BASTARDPUNCH",
  "abilityLabel": "Bastard Punch",
  "abilityDescription": "Permanently half the strength of your opponent's current card",
  "battlecry": "Bloody 'av that y' bastard...",
  "image": "/client/img/bean.jpg"
},
{
  "number": "003",
  "code": "JEANLUCPICARD",
  "name": "Jean-Luc Picard",
  "stats": [
      {"attribute":"age","value":58,"label":"Age"},
      {"attribute":"strength","value":74,"label":"Strength"},
      {"attribute":"intelligence","value":98,"label":"Intelligence"},
      {"attribute":"speed","value":55,"label":"Speed"}
  ],
  "abilityPresent": true,
  "abilityUsed": false,
  "abilityType": "STATSHOW",
  "ability": "FORESIGHT",
  "abilityLabel": "Foresight",
  "abilityDescription": "See one random stat on your opponent's card",
  "battlecry": "Make it so.",
  "image": "/client/img/picard.jpg"
},
{
  "number": "004",
  "code": "WILLIAMTRIKER",
  "name": "William T. Riker",
  "stats": [
      {"attribute":"age","value": 38,"label":"Age"},
      {"attribute":"strength","value": 90,"label":"Strength"},  
      {"attribute":"intelligence","value": 85,"label":"Intelligence"},
      {"attribute":"speed","value": 84,"label":"Speed"}
  ],
  "ability": "LEGUP",
  "image": "/client/img/riker.jpg"
},
{
  "number": "005",
  "code": "JEFFGOLDBLUM",
  "name": "Jeff Goldblum",
  "stats": [
      {"attribute":"age","value":63,"label":"Age"},
      {"attribute":"strength","value":50,"label":"Strength"},
      {"attribute":"intelligence","value":89,"label":"Intelligence"},
      {"attribute":"speed","value":62,"label":"Speed"}
  ],
  "abilityPresent": true,
  "abilityUsed": false,
  "abilityType": "STRENGTHDAMAGE",
  "ability": "RAPTORATTACK",
  "abilityLabel": "Raptor Attack",
  "abilityDescription": "Permanently half the strength of your opponent's current card",
  "battlecry": "Life, uh... finds a way",
  "image": "/client/img/goldblum.jpg"
},
{
  "number": "006",
  "code": "WILLSMITH",
  "name": "Will Smith",
  "stats": [
      {"attribute":"age","value": 47,"label":"Age"},
      {"attribute":"strength","value": 91,"label":"Strength"},
      {"attribute":"intelligence","value": 81,"label":"Intelligence"},
      {"attribute":"speed","value": 93,"label":"Speed"}
  ],
  "abilityPresent": false,
  "image": "/client/img/willsmith.jpg"
},
{
  "number": "007",
  "code": "PIERCEBROSNAN",
  "name": "Pierce Brosnan",
  "stats": [
      {"attribute":"age","value": 62,"label":"Age"},
      {"attribute":"strength","value": 89,"label":"Strength"},
      {"attribute":"intelligence","value": 92,"label":"Intelligence"},
      {"attribute":"speed","value": 96,"label":"Speed"}
  ],
  "abilityPresent": true,
  "abilityUsed": false,
  "abilityType": "STRENGTHDAMAGE",
  "ability": "JUDOCHOP",
  "abilityLabel": "Judo Chop",
  "abilityDescription": "Permanently half the strength of your opponent's current card",
  "battlecry": "Judo... Chop!",
  "image": "/client/img/brosnan.jpg"
},
{
  "number": "008",
  "code": "VINDIESEL",
  "name": "Vin Diesel",
  "stats": [
      {"attribute":"age","value":48,"label":"Age"},
      {"attribute":"strength","value":95,"label":"Strength"},
      {"attribute":"intelligence","value":45,"label":"Intelligence"},
      {"attribute":"speed","value":91,"label":"Speed"}
  ],
  "abilityPresent": false,
  "image": "/client/img/vin.jpg"
},
{
  "number": "009",
  "code": "RANDYMARSH",
  "name": "Randy Marsh",
  "stats": [
      {"attribute":"age","value": 44,"label":"Age"},
      {"attribute":"strength","value": 41,"label":"Strength"},  
      {"attribute":"intelligence","value": 56,"label":"Intelligence"},
      {"attribute":"speed","value": 63,"label":"Speed"}
  ],
  "abilityPresent": false,
  "image": "/client/img/randy.jpg"
},
{
  "number": "010",
  "code": "KARLKENNEDY",
  "name": "Karl Kennedy",
  "stats": [
      {"attribute":"age","value":58,"label":"Age"},
      {"attribute":"strength","value":38,"label":"Strength"},
      {"attribute":"intelligence","value":82,"label":"Intelligence"},
      {"attribute":"speed","value":54,"label":"Speed"}
  ],
  "abilityPresent": true,
  "abilityUsed": false,
  "abilityType": "STRENGTHDAMAGE",
  "ability": "FACEANDARMS",
  "abilityLabel": "Face & Arms Punch",
  "abilityDescription": "Permanently half the strength of your opponent's current card",
  "battlecry": "I will punch you in the face and arms!",
  "image": "/client/img/kennedy.jpg"
},
{
  "number": "011",
  "code": "HAROLDBISHOP",
  "name": "Harold Bishop",
  "stats": [
      {"attribute":"age","value":77,"label":"Age"},
      {"attribute":"strength","value":63,"label":"Strength"},
      {"attribute":"intelligence","value":35,"label":"Intelligence"},
      {"attribute":"speed","value":20,"label":"Speed"}
  ],
  "abilityPresent": false,
  "image": "/client/img/bishop.jpg"
},
{
  "number": "012",
  "code": "SHIALEBOEUF",
  "name": "Shia Leboeuf",
  "stats": [
      {"attribute":"age","value":29,"label":"Age"},
      {"attribute":"strength","value":72,"label":"Strength"},
      {"attribute":"intelligence","value":78,"label":"Intelligence"},
      {"attribute":"speed","value":88,"label":"Speed"}
  ],
  "abilityPresent": false,
  "image": "/client/img/shia.jpg"
},
{
  "number": "013",
  "code": "WILWHEATON",
  "name": "Wil Wheaton",
  "stats": [
      {"attribute":"age","value":45,"label":"Age"},
      {"attribute":"strength","value":53,"label":"Strength"},
      {"attribute":"intelligence","value":86,"label":"Intelligence"},
      {"attribute":"speed","value":80,"label":"Speed"}
  ],
  "abilityPresent": false,
  "image": "/client/img/wheaton.jpg"
},
{
  "number": "014",
  "code": "DAENERYSTARGARYEN",
  "name": "Daenerys Targaryen",
  "stats": [
      {"attribute":"age","value":22,"label":"Age"},
      {"attribute":"strength","value":69,"label":"Strength"},
      {"attribute":"intelligence","value":90,"label":"Intelligence"},
      {"attribute":"speed","value":100,"label":"Speed"}
  ],
  "ability": "DRAGONATTACK",
  "image": "/client/img/daenerys.jpg"
},
{
  "number": "015",
  "code": "JONSNOW",
  "name": "Jon Snow",
  "stats": [
      {"attribute":"age","value":21,"label":"Age"},
      {"attribute":"strength","value":92,"label":"Strength"},
      {"attribute":"intelligence","value":71,"label":"Intelligence"},
      {"attribute":"speed","value":91,"label":"Speed"}
  ],
  "abilityPresent": false,
  "image": "/client/img/jonsnow.jpg"
},
{
  "number": "016",
  "code": "TYRIONLANNISTER",
  "name": "Tyrion Lannister",
  "stats": [
      {"attribute":"age","value":38,"label":"Age"},
      {"attribute":"strength","value":48,"label":"Strength"},
      {"attribute":"intelligence","value":96,"label":"Intelligence"},
      {"attribute":"speed","value":30,"label":"Speed"}
  ],
  "abilityPresent": true,
  "abilityUsed": false,
  "abilityType": "STATSHOW",
  "ability": "FORESIGHT",
  "abilityLabel": "Foresight",
  "abilityDescription": "See one random stat on your opponent's card",
  "battlecry": "It's not easy being drunk all the time. Everyone would do it if it were easy.",
  "image": "/client/img/tyrion.jpg"
},
{
  "number": "017",
  "code": "DAMEJUDIDENCH",
  "name": "Dame Judi Dench",
  "stats": [
      {"attribute":"age","value":83,"label":"Age"},
      {"attribute":"strength","value":41,"label":"Strength"},
      {"attribute":"intelligence","value":87,"label":"Intelligence"},
      {"attribute":"speed","value":28,"label":"Speed"}
  ],
  "abilityPresent": false,
  "image": "/client/img/dench.jpg"
},
{
  "number": "018",
  "code": "YODA",
  "name": "Yoda",
  "stats": [
      {"attribute":"age","value":900,"label":"Age"},
      {"attribute":"strength","value":20,"label":"Strength"},
      {"attribute":"intelligence","value":100,"label":"Intelligence"},
      {"attribute":"speed","value":17,"label":"Speed"}
  ],
  "abilityPresent": true,
  "abilityUsed": false,
  "abilityType": "STATSHOW",
  "ability": "FORESIGHT",
  "abilityLabel": "Foresight",
  "abilityDescription": "See one random stat on your opponent's card",
  "battlecry": "It is the future you see...",
  "image": "/client/img/yoda.jpg"
},
{
  "number": "019",
  "code": "DARTHVADER",
  "name": "Darth Vader",
  "stats": [
      {"attribute":"age","value":45,"label":"Age"},
      {"attribute":"strength","value":95,"label":"Strength"},
      {"attribute":"intelligence","value":91,"label":"Intelligence"},
      {"attribute":"speed","value":43,"label":"Speed"}
  ],
  "abilityPresent": true,
  "abilityUsed": false,
  "abilityType": "STRENGTHDAMAGE",
  "ability": "FORCECHOKE",
  "abilityLabel": "Force Choke",
  "abilityDescription": "Permanently half the strength of your opponent's current card",
  "battlecry": "I find your lack of faith disturbing...",
  "image": "/client/img/vader.jpg"
},
{
  "number": "020",
  "code": "ELLENRIPLEY",
  "name": "Ellen Ripley",
  "stats": [
      {"attribute":"age","value":32,"label":"Age"},
      {"attribute":"strength","value":90,"label":"Strength"},
      {"attribute":"intelligence","value":90,"label":"Intelligence"},
      {"attribute":"speed","value":89,"label":"Speed"}
  ],
  "abilityPresent": false,
  "image": "/client/img/ripley.jpg"
}];