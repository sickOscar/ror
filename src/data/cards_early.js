const cards = [
    {
        "id": "1",
        "name": "Oscar",
        "type": "senator",
        "military": 2,
        "oratory": 9,
        "loyalty": 2,
        "influence": 9
    },
    {
        "id": "2",
        "name": "Livio",
        "type": "senator",
        "military": 3,
        "oratory": 8,
        "loyalty": 4,
        "influence": 6
    },
    {
        "id": "3",
        "name": "Alessio",
        "type": "senator",
        "military": 8,
        "oratory": 6,
        "loyalty": 1,
        "influence": 7
    },
    {
        "id": "4",
        "name": "Gianluca",
        "type": "senator",
        "military": 1,
        "oratory": 5,
        "loyalty": 3,
        "influence": 5
    },
    {
        "id": "5",
        "name": "Giulio",
        "type": "senator",
        "military": 5,
        "oratory": 3,
        "loyalty": 9,
        "influence": 4
    },
    {
        "id": "6",
        "name": "Pericoli",
        "type": "senator",
        "military": 8,
        "oratory": 7,
        "loyalty": 1,
        "influence": 9
    },
    {
        "id": "7",
        "name": "Shoto",
        "type": "senator",
        "military": 6,
        "oratory": 3,
        "loyalty": 2,
        "influence": 7
    },
    {
        "id": "8",
        "name": "Barozzi",
        "type": "senator",
        "military": 2,
        "oratory": 9,
        "loyalty": 5,
        "influence": 9
    },
    {
        "id": "9",
        "name": "Alvise",
        "type": "senator",
        "military": 6,
        "oratory": 1,
        "loyalty": 7,
        "influence": 5
    },
    {
        "id": "10",
        "name": "Scaputi",
        "type": "senator",
        "military": 8,
        "oratory": 2,
        "loyalty": 3,
        "influence": 7
    },
    {
        "id": "11",
        "name": "Massimo",
        "type": "senator",
        "military": 9,
        "oratory": 7,
        "loyalty": 7,
        "influence": 8
    },
    {
        "id": "12",
        "name": "Piaia",
        "type": "senator",
        "military": 4,
        "oratory": 2,
        "loyalty": 5,
        "influence": 2
    },
    {
        "id": "13",
        "name": "Giopego",
        "type": "senator",
        "military": 7,
        "oratory": 6,
        "loyalty": 3,
        "influence": 8
    },
    {
        "id": "14",
        "name": "De Zordi",
        "type": "senator",
        "military": 4,
        "oratory": 2,
        "loyalty": 7,
        "influence": 6
    },
    {
        "id": "15",
        "name": "Privato",
        "type": "senator",
        "military": 8,
        "oratory": 6,
        "loyalty": 4,
        "influence": 6
    },
    {
        "id": "16",
        "name": "Manuel",
        "type": "senator",
        "military": 1,
        "oratory": 8,
        "loyalty": 8,
        "influence": 7
    },
    {
        "id": "17",
        "name": "Militello",
        "type": "senator",
        "military": 6,
        "oratory": 9,
        "loyalty": 2,
        "influence": 8
    },
    {
        "id": "18",
        "name": "Chioggia",
        "type": "senator",
        "military": 4,
        "oratory": 4,
        "loyalty": 8,
        "influence": 5
    },
    {
        "id": "19",
        "name": "Fulvio",
        "type": "senator",
        "military": 8,
        "oratory": 2,
        "loyalty": 5,
        "influence": 3
    },


    {
        "id": "1A",
        "name": "Statesman Oscar",
        "type": "statesman"
    },
    {
        "id": "6A",
        "name": "Statesman Pericoli",
        "type": "statesman"
    },
    {
        "id": "4A",
        "name": "Statesman Gianluca",
        "type": "statesman"
    },
    {
        "id": "2A",
        "name": "Statesman Livio",
        "type": "statesman"
    },

    /***
     *     _____      _        _                  
     *    |_   _|    | |      (_)                 
     *      | | _ __ | |_ _ __ _  __ _ _   _  ___ 
     *      | || '_ \| __| '__| |/ _` | | | |/ _ \
     *     _| || | | | |_| |  | | (_| | |_| |  __/
     *     \___/_| |_|\__|_|  |_|\__, |\__,_|\___|
     *                            __/ |           
     *                           |___/            
     *                                            
     */   
    
    {
        id: "047",
        type: "intrigue",
        subtype: "bodyguard",
        name: "Secret bodyguard"
    },

    {
        id: "048",
        type: "intrigue",
        subtype: "influence",
        name: "Influence Peddling"
    },

    {
        id: "049",
        type: "intrigue",
        subtype: "assassin",
        name: "Assassin"
    },

    {
        id: "050",
        type: "intrigue",
        subtype: "seduction",
        name: "Seduction"
    },

    {
        id: "050",
        type: "intrigue",
        subtype: "blackmail",
        name: "Blackmail"
    },

    /***
     *     _____                               _                 
     *    /  __ \                             (_)                
     *    | /  \/ ___  _ __   ___ ___  ___ ___ _  ___  _ __  ___ 
     *    | |    / _ \| '_ \ / __/ _ \/ __/ __| |/ _ \| '_ \/ __|
     *    | \__/\ (_) | | | | (_|  __/\__ \__ \ | (_) | | | \__ \
     *     \____/\___/|_| |_|\___\___||___/___/_|\___/|_| |_|___/
     *                                                           
     */

    {
        id: "052",
        type: "concession",
        name: "Armaments",
        talents: 2,
        activation: 'legionBuild',
        destroyable: true,
        // TODO add special condition
        destroyedBy: ["naturalDisaster"]
    },

    {
        id: "053",
        type: "concession",
        name: "Ship Building",
        talents: 2,
        activation: 'fleetBuild',
        destroyable: true,
        // TODO add special condition
        destroyedBy: ["naturalDisaster"]
    },

    {
        id: "054",
        type: "concession",
        name: "Aegyptian Grain",
        talents: 5,
        activation: 'turn',
        destroyable: true,
        // TODO add special condition
        destroyedBy: ["Alexandrine War"]
    },
         
    {
        id: "055",
        type: "concession",
        name: "Sicilian Grain",
        talents: 4,
        activation: 'turn',
        destroyable: true,
        // TODO add special condition
        destroyedBy: ["sicilian Slave Revolt"]
    },

    {
        id: "056",
        type: "concession",
        name: "Harbor Fees",
        talents: 3,
        activation: 'turn',
        destroyable: true,
        destroyedBy: ["naturalDisaster"]
    },

    {
        id: "057",
        type: "concession",
        name: "Mining",
        talents: 3,
        activation: 'turn',
        destroyable: true,
        destroyedBy: ['naturalDisaster']
    },

    {
        id: "058",
        type: "concession",
        name: "Land Commissioner",
        talents: 3,
        activation: 'turn',
        destroyable: false
    },

    /***
     *     _    _                
     *    | |  | |               
     *    | |  | | __ _ _ __ ___ 
     *    | |/\| |/ _` | '__/ __|
     *    \  /\  / (_| | |  \__ \
     *     \/  \/ \__,_|_|  |___/
     *            
     */
    {
        "id": "005",
        "name": "1st Gallic War",
        "type": "war",
        "landStrength": 10,
        "navalSupport": 0,
        "navalStrength": null,
        "disaster": 13,
        "standoff": 15,
        "talents": 20,
        "armament": true,
        "description": "1st of 3 gallic wars (225 - 222 BC)",
        "conditions": {
            "provinceCreation": ["Gallia Cisalpina"]
        }
    },

    {
        "id": "001",
        "name": "1st Punic War",
        "type": "war",
        "landStrength": 10,
        "navalSupport": 5,
        "navalStrength": 10,
        "disaster": 13,
        "standoff": 11,
        "talents": 35,
        "armament": false,
        "description": "1st of 3 punic wars (264 - 241 BC)",
        "conditions": {
            "activation": "attackedOrMatched",
            "provinceCreation": ["Sicilia & Corsica et Sardinia"]
        }
    },

    {
        "id": "002",
        "name": "2nd Punic War",
        "type": "war",
        "landStrength": 15,
        "navalSupport": 5,
        "navalStrength": null,
        "disaster": 10,
        "standoff": 11,
        "talents": 25,
        "armament": true,
        "description": "2nd of 3 punic wars (218 - 201 BC)",
        "conditions": {
            "provinceCreation": ["Hispania Citerior", "Hispania Ulterior"]
        }
    },

    {
        "id": "003",
        "name": "1st Illyrian War",
        "type": "war",
        "landStrength": 5,
        "navalSupport": 3,
        "navalStrength": null,
        "disaster": 5,
        "standoff": 17,
        "talents": 10,
        "armament": false,
        "drought": true,
        "description": "1st of 2 illyrian wars (229 - 228 BC)",
        "conditions": {
            "activation": "attackedOrMatched",
            "provinceCreation": ["Illyrium"]
        }
    },

    {
        "id": "004",
        "name": "2nd Illyrian War",
        "type": "war",
        "landStrength": 4,
        "navalSupport": 2,
        "navalStrength": null,
        "disaster": 5,
        "standoff": 17,
        "talents": 10,
        "armament": true,
        "drought": true,
        "description": "1st of 2 illyrian wars (220 - 219 BC)",
        "conditions": {
            "provinceCreation": ["Illyrium"]
        }
    },

    {
        "id": "006",
        "name": "1st Macedonian War",
        "type": "war",
        "landStrength": 12,
        "navalSupport": 10,
        "navalStrength": null,
        "disaster": 12,
        "standoff": 11,
        "talents": 25,
        "armament": true,
        "description": "1st of 4 Macedonian wars (215 - 205 BC)",
        "conditions": {
            "revolt": "hasProvince('Macedonia')"
        }
    },

    {
        "id": "007",
        "name": "2nd Macedonian War",
        "type": "war",
        "landStrength": 10,
        "navalSupport": 5,
        "navalStrength": null,
        "disaster": 13,
        "standoff": 14,
        "talents": 45,
        "armament": false,
        "description": "2nd of 4 Macedonian wars (200 - 196 BC)",
        "conditions": {
            "activation": "attackedOrMatched",
            "revolt": "hasProvince('Macedonia')"
        }
    },

    {
        "id": "008",
        "name": "Syrian War",
        "type": "war",
        "landStrength": 6,
        "navalSupport": 2,
        "navalStrength": null,
        "disaster": 16,
        "standoff": 15,
        "talents": 45,
        "armament": true,
        "description": "(192 - 189 BC)",
        "conditions": {
            "revolt": "hasProvince('Syria')"
        }
    },

    /***
     *     _                    _               
     *    | |                  | |              
     *    | |     ___  __ _  __| | ___ _ __ ___ 
     *    | |    / _ \/ _` |/ _` |/ _ \ '__/ __|
     *    | |___|  __/ (_| | (_| |  __/ |  \__ \
     *    \_____/\___|\__,_|\__,_|\___|_|  |___/
     *                                          
     *                                          
     *          
     **/
    {
        id: "034",
        name: "Hamilcar",
        type: "leader",
        associatedWar: ["001", "002"], // punic wars
        strength: 3,
        disaster: 8,
        standoff: 12
    },

    {
        id: "035",
        name: "Hannibal",
        type: "leader",
        associatedWar: ["001", "002"], // punic wars
        strength: 7,
        disaster: 9,
        standoff: 16
    },

    {
        id: "036",
        name: "Antiochus III",
        type: "leader",
        associatedWar: ["008"], // syrian wars
        strength: 5,
        disaster: 14,
        standoff: 17
    },

    {
        id: "037",
        name: "Philip V",
        type: "leader",
        associatedWar: ["006", "007"], // macedonian wars
        strength: 6,
        disaster: 15,
        standoff: 14
    },


]

export default cards;