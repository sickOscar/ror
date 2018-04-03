const cards = [

    /***
     *     _____                  _                 
     *    /  ___|                | |                
     *    \ `--.  ___ _ __   __ _| |_ ___  _ __ ___ 
     *     `--. \/ _ \ '_ \ / _` | __/ _ \| '__/ __|
     *    /\__/ /  __/ | | | (_| | || (_) | |  \__ \
     *    \____/ \___|_| |_|\__,_|\__\___/|_|  |___/
     *                                              
     *                                              
     */
    {
        "id": "21",
        "name": "Serviluis",
        "type": "senator",
        "military": 3,
        "oratory": 4,
        "loyalty": 9,
        "influence": 4,
        statesman: false
    },
    {
        "id": "22",
        "name": "Porcius",
        "type": "senator",
        "military": 2,
        "oratory": 4,
        "loyalty": 10,
        "influence": 1,
        statesman: false
    },
    {
        "id": "23",
        "name": "Popillus",
        "type": "senator",
        "military": 1,
        "oratory": 3,
        "loyalty": 7,
        "influence": 3,
        statesman: false
    },
    {
        "id": "24",
        "name": "Cassius",
        "type": "senator",
        "military": 3,
        "oratory": 3,
        "loyalty": 9,
        "influence": 3,
        statesman: false
    },
    {
        "id": "25",
        "name": "Sempronius",
        "type": "senator",
        "military": 1,
        "oratory": 3,
        "loyalty": 6,
        "influence": 3,
        statesman: false
    },

    /***
     *     _____ _        _                                 
     *    /  ___| |      | |                                
     *    \ `--.| |_ __ _| |_ ___  ___ _ __ ___   ___ _ __  
     *     `--. \ __/ _` | __/ _ \/ __| '_ ` _ \ / _ \ '_ \ 
     *    /\__/ / || (_| | ||  __/\__ \ | | | | |  __/ | | |
     *    \____/ \__\__,_|\__\___||___/_| |_| |_|\___|_| |_|
     *                                                      
     *                                                      
     */
    {
        "id": "7A",
        "name": "M fulvius Flaccus",
        "type": "senator",
        "military": 2,
        "oratory": 5,
        "loyalty": "6/0|23A",
        "influence": 5,
        statesman: true,
    },
    {
        "id": "25B",
        "name": "C Sempronius Gracchus",
        "type": "senator",
        "military": 1,
        "oratory": 5,
        "loyalty": "6/0|25A",
        "influence": 4,
        popularity: 3,
        statesman: true,
    },
    {
        "id": "25A",
        "name": "T Sempronius Gracchus",
        "type": "senator",
        "military": 1,
        "oratory": 4,
        "loyalty": "6/0|25B",
        "influence": 3,
        popularity: 2,
        statesman: true,
    },
    {
        "id": "1C",
        "name": "L. Cornelius Sulla",
        "type": "senator",
        "military": 4,
        "oratory": 4,
        "loyalty": "5/0|27A",
        "influence": 5,
        statesman: true,
    },
    {
        "id": "21A",
        "name": "C Servilus Glauca",
        "type": "senator",
        "military": 1,
        "oratory": 3,
        "loyalty": "3/0|1C",
        "influence": 2,
        statesman: true,
    },
    {
        "id": "1B",
        "name": "P Cornelius Scipio Aemilianus Africanus",
        "type": "senator",
        "military": 4,
        "oratory": 3,
        "loyalty": 7,
        "influence": 5,
        statesman: true,
    },
    {
        "id": "23A",
        "name": "P. Popillius Laenas",
        "type": "senator",
        "military": 2,
        "oratory": 5,
        "loyalty": "6/0|25A|25B|7A",
        "influence": 4,
        statesman: true,
    },
    {
        "id": "1B",
        "name": "C Marius",
        "type": "senator",
        "military": 5,
        "oratory": 3,
        "loyalty": "6/0|1C",
        "influence": 5,
        statesman: true,
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
        id: "101",
        type: "intrigue",
        subtype: "bodyguard",
        name: "Secret bodyguard"
    },

    {
        id: "102",
        type: "intrigue",
        subtype: "bodyguard",
        name: "Secret bodyguard"
    },

    {
        id: "104",
        type: "intrigue",
        subtype: "influence",
        name: "Influence Peddling"
    },

    {
        id: "099",
        type: "intrigue",
        subtype: "assassin",
        name: "Assassin"
    },

    {
        id: "100",
        type: "intrigue",
        subtype: "assassin",
        name: "Assassin"
    },

    {
        id: "097",
        type: "intrigue",
        subtype: "murder",
        name: "Murder of a tribune"
    },

    {
        id: "098",
        type: "intrigue",
        subtype: "murder",
        name: "Murder of a tribune"
    },

    {
        id: "103",
        type: "intrigue",
        subtype: "graft",
        name: "Graft",
        // TODO a senator in rome may cancel a tribune veto or proposal by paying 1d6 from personal
        // trasury to the bank
    },

    {
        id: "105",
        type: "intrigue",
        subtype: "mob",
        name: "Mob Incited To Violence"
        // TODO this card may be played against any player who just resolved a murder of a tribune
        // draw 1d6 mortality chits plus oratory of one of your senators in rome
        // Chits corresponding to senators in rome belonging to the faction of the player cancelling
        // the tribune are killed
    },

    /***
     *     _                        
     *    | |                       
     *    | |     __ ___      _____ 
     *    | |    / _` \ \ /\ / / __|
     *    | |___| (_| |\ V  V /\__ \
     *    \_____/\__,_| \_/\_/ |___/
     *                              
     *                              
     */

    // TODO

    /***
     *    ______                                              
     *    | ___ \                                             
     *    | |_/ /__ _ __ __ _  __ _ _ __ ___   ___ _ __   ___ 
     *    |  __/ _ \ '__/ _` |/ _` | '_ ` _ \ / _ \ '_ \ / _ \
     *    | | |  __/ | | (_| | (_| | | | | | |  __/ | | |  __/
     *    \_|  \___|_|  \__, |\__,_|_| |_| |_|\___|_| |_|\___|
     *                   __/ |                                
     *                  |___/                                 
     */
    {
        id: "106",
        type: "pergamene",
        subtype: "bequest",
        name: "Pergamene Bequest"
        // TODO the state gains 50talents in the revenue phase if, in the prior Senate phase, the field 
        // consull with 3 legions and 3 fleets are sent to retrieve it
        // Rebel consul may keep Bequest
        // Creates Province of Asia when collected
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
        "id": "066",
        "name": "3rd Macedonian War",
        "type": "war",
        "landStrength": 8,
        "navalSupport": 5,
        "navalStrength": null,
        "disaster": 8,
        "standoff": 14,
        "talents": 35,
        "armament": true,
        "description": "3rd of 4 Macedonian wars (171 - 167 BC)",
        "conditions": {
            "revolt": "hasProvince('Macedonia')"
        }
    },

    {
        "id": "067",
        "name": "4th Macedonian War",
        "type": "war",
        "landStrength": 5,
        "navalSupport": 1,
        "navalStrength": null,
        "disaster": 5,
        "standoff": 17,
        "talents": 30,
        "armament": true,
        "description": "3rd of 4 Macedonian wars (149 - 148 BC)",
        "conditions": {
            "provinceCreation": ["Macedonia"]
        }
    },

    {
        "id": "068",
        "name": "Jugurthine War",
        "type": "war",
        "landStrength": 8,
        "navalSupport": 2,
        "navalStrength": null,
        "disaster": 14,
        "standoff": 13,
        "talents": 25,
        "armament": true,
        "description": "(111 - 105 BC)",
        "conditions": {}
    },

    {
        "id": "069",
        "name": "3rd Punic War",
        "type": "war",
        "landStrength": 7,
        "navalSupport": 1,
        "navalStrength": null,
        "disaster": 7,
        "standoff": 15,
        "talents": 20,
        "armament": true,
        "description": "3rd of 3 Punic wars (149 - 146 BC)",
        "conditions": {
            "provinceCreation": ["Africa"]
        }
    },

    {
        "id": "070",
        "name": "German Migrations",
        "type": "war",
        "landStrength": 15,
        "navalSupport": 0,
        "navalStrength": null,
        "disaster": 10,
        "standoff": 11,
        "talents": 15,
        "armament": true,
        "description": "(113 - 101 BC)",
        "conditions": {
            "provinceCreation": ["Gallia Narbonensis"]
        }
    },

    {
        "id": "071",
        "name": "Cilician Pirates",
        "type": "war",
        "landStrength": 3,
        "navalSupport": 2,
        "navalStrength": 8,
        "disaster": 18,
        "standoff": 15,
        "talents": 10,
        "armament": false,
        drought: true,
        "description": "1st of 2 Cilician Pirates (104 - 101 BC)",
        "conditions": {
            "activation": "attackedOrMatched",
            "provinceCreation": ["Cilicia et Cyprus"]
        }
    },

    {
        "id": "072",
        "name": "Lusitanian War",
        "type": "war",
        "landStrength": 6,
        "navalSupport": 2,
        "navalStrength": null,
        "disaster": 6,
        "standoff": "11/16",
        "talents": 0,
        "armament": false,
        "description": "1st of 3 Spanish revolts (154 - 138 BC)",
        "conditions": {
            "activation": "", // TODO revolt condition
            // if hispania Citerior and Hispania Ulterior are not yet provinces, treat
            // as inactive until the revolution phase that they are
        }
    },

    {
        "id": "073",
        "name": "Numantine War",
        "type": "war",
        "landStrength": 8,
        "navalSupport": 2,
        "navalStrength": null,
        "disaster": 14,
        "standoff": "11/18",
        "talents": 0,
        "armament": false,
        "description": "2nd of 3 Spanish revolts (143 - 133 BC)",
        "conditions": {
            "activation": "", // TODO revolt condition
            // if hispania Citerior is not yet province, treat
            // as inactive until the revolution phase that they are
        }
    },

    {
        "id": "074",
        "name": "Sicilian Slave Revolt",
        "type": "war",
        "landStrength": 4,
        "navalSupport": 0,
        "navalStrength": null,
        "disaster": 17,
        "standoff": 15,
        "talents": 0,
        "armament": false,
        drought: true,
        "description": "1st of 3 slave revolts (135 - 132 BC)",
        "conditions": {
            "activation": "", // TODO revolt condition
            // if Sicilia is not yet province, treat
            // as inactive until the revolution phase that they are,
            // TODO Eliminates Sicilian Grain Concession
        }
    },

    {
        "id": "075",
        "name": "Sicilian Slave Revolt",
        "type": "war",
        "landStrength": 7,
        "navalSupport": 1,
        "navalStrength": null,
        "disaster": 7,
        "standoff": 15,
        "talents": 0,
        "armament": false,
        drought: true,
        "description": "2nd of 3 slave revolts (103 - 99 BC)",
        "conditions": {
            "activation": "", // TODO revolt condition
            // if Sicilia is not yet province, treat
            // as inactive until the revolution phase that they are,
            // TODO Eliminates Sicilian Grain Concession
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
        id: "089",
        name: "Viriathus",
        type: "leader",
        associatedWar: ["072", "073"], // punic wars
        strength: 5,
        disaster: 15,
        standoff: 12
    },


]

export default cards;