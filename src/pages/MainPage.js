import React from 'react';
import { Grid, Tabs, Tab, Button, Paper, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import InfoBlock from '../blocks/InfoBlock';
import StatBlock from '../blocks/StatBlock';
import ProfBlock from '../blocks/ProfBlock';
import SaveBlock from '../blocks/SaveBlock';
import SpellDCBlock from '../blocks/SpellDCBlock';
import ArmorBlock from '../blocks/ArmorBlock';
import TrackerBlock from '../blocks/TrackerBlock';
import LangProfBlock from '../blocks/LangProfBlock';
import FeatBlock from '../blocks/FeatBlock';
import EquipmentBlock from '../blocks/EquipmentBlock';
import WeaponBlock from '../blocks/WeaponBlock';
import SpellBlock from '../blocks/SpellBlock';
import TabPanel from '../components/TabPanel';
import SpellPrepBlock from '../blocks/SpellPrepBlock';
import InfoSnackBar from '../components/InfoSnackBar';

const styles = {
    root: {
        flexGrow: 1
    }
};

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.classes = props;

        const skillList = [
            ["Acrobatics", "Dexterity"],
            ["Animal Handling", "Wisdom"],
            ["Arcana", "Intelligence"],
            ["Athletics", "Strength"],
            ["Deception", "Charisma"],
            ["History", "Intelligence"],
            ["Insight", "Wisdom"],
            ["Intimidation", "Charisma"],
            ["Investigation", "Intelligence"],
            ["Medicine", "Wisdom"],
            ["Nature", "Intelligence"],
            ["Perception", "Wisdom"],
            ["Performance", "Charisma"],
            ["Persuasion", "Charisma"],
            ["Religion", "Intelligence"],
            ["Sleight of Hand", "Dexterity"],
            ["Stealth", "Dexterity"],
            ["Survival", "Wisdom"],
        ];

        const statList = ["Strength", "Dexterity", "Constitution",
        "Intelligence", "Wisdom", "Charisma"];

        const spellLevels = ["Cantrip", "1st", "2nd", 
        "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];

        let skills = {};

        skillList.forEach((item) => {
            skills[item[0]] = {
                "statname": item[1],
                "proficiency": "None",
                "override": 0
            };
        });

        let stats = {};
        let saves = {};

        statList.forEach((item) => {
            stats[item] = 10;
            saves[item] = {
                "proficiency": "None",
                "override": 0
            }
        });

        let spells = {};
        let preppedSpells = {
            "unprepared": {}
        };

        spellLevels.forEach((item) => {
            spells[item] = [];
            preppedSpells[item] = {
                "spells": [],
                "slots_total": 0,
                "slots_expended": 0
            };

            preppedSpells.unprepared[item] = [];
        });
        
        this.storage = {
            "character_info": {
                "Character Name": "",
                "Background": "",
                "Player Name": "",
                "Race": "",
                "Alignment": "",
                "Experience Points": "",
                "Classes": [["", "", 1]],
            },

            "skills": skills,

            "saves": saves,

            "armorblock": {
                "Armor Class": 0,
                "Initiative": 0,
                "Speed": "0ft",
                "Hit Points": {
                    "Maximum": 0,
                    "Current": 0,
                    "Temporary": 0
                },
                "Hit Dice": {
                    "Dice": "",
                    "Total": 0,
                    "Remaining": 0
                }
            },

            "langprofblock": {
                "Languages": [],
                "Armor": [],
                "Weapons": []
            },

            "trackerblock": [],

            "featblock": [],

            "spellblock": spells,

            "equipmentblock": {
                "equipment": {
                    "Armor": [],
                    "Weapons": []
                },
                "currency": {
                    "CP": 0,
                    "SP": 0,
                    "EP": 0,
                    "GP": 0,
                    "PP": 0,
                },
                "attuned": {
                    "Attuned Items": 0,
                    "Maximum Attuned": 3
                }
            }
                    
        };

        this.state = {
            "skillsavetabs": 0,
            "festabs": 0,
            "maintabs": 0,

            "statblock": stats,

            "proficiencyBonus": 0,

            "weaponblock": [],

            "spellprepblock": preppedSpells,
            "snackbarOpen": false,

            "spelldcblock": {
                "statname": "Strength",
                "override": {
                    "spellsavedc": 0,
                    "spellattack": 0
                }
            },

        }

        const file = sessionStorage.getItem("file");
        if (file) {
            const jsonObj = JSON.parse(file);
            this.storage.character_info = jsonObj.character_info;
            this.storage.skills = jsonObj.skills;
            this.storage.saves = jsonObj.saves;
            this.storage.armorblock = jsonObj.armorblock;
            this.storage.langprofblock = jsonObj.langprofblock;
            this.storage.trackerblock = jsonObj.trackerblock;
            this.storage.featblock = jsonObj.featblock;
            this.storage.spellblock = jsonObj.spellblock;
            this.storage.equipmentblock = jsonObj.equipmentblock;

            this.state.statblock = jsonObj.statblock;
            this.state.proficiencyBonus = jsonObj.proficiencyBonus;
            this.state.weaponblock = jsonObj.weaponblock;
            this.state.spellprepblock = jsonObj.spellprepblock;
            this.state.spelldcblock = jsonObj.spelldcblock;

            const isLegacyCharacter = sessionStorage.getItem("isLegacyCharacter") === "true";
            if (isLegacyCharacter) {
                this.state.snackbarOpen = true;
            } else {
                window.setTimeout(() => {
                    sessionStorage.removeItem("file");
                    sessionStorage.removeItem("isLegacyCharacter");
                }, 10000);
            }
        }

        // Function Binding
        this.charInfoOnChange = this.charInfoOnChange.bind(this);
        this.classOnChange = this.classOnChange.bind(this);
        this.levelOnChange = this.levelOnChange.bind(this);
        this.classOnAdd = this.classOnAdd.bind(this);
        this.classOnRemove = this.classOnRemove.bind(this);
        this.statOnChange = this.statOnChange.bind(this);
        this.profOnChange = this.profOnChange.bind(this);
        this.skillOverrideOnChange = this.skillOverrideOnChange.bind(this);
        this.charInfoOnChange = this.charInfoOnChange.bind(this);
        this.skillStatOnChange = this.skillStatOnChange.bind(this);
        this.skillProfOnChange = this.skillProfOnChange.bind(this);
        this.saveOverrideOnChange = this.saveOverrideOnChange.bind(this);
        this.saveProfOnChange = this.saveProfOnChange.bind(this);
        this.skillSaveTabsOnChange = this.skillSaveTabsOnChange.bind(this);
        this.spellAbilityOnChange = this.spellAbilityOnChange.bind(this);
        this.spellOverrideOnChange = this.spellOverrideOnChange.bind(this);
        this.armorblockOnChange = this.armorblockOnChange.bind(this);
        this.onTrackerAdd = this.onTrackerAdd.bind(this);
        this.onTrackerRemove = this.onTrackerRemove.bind(this);
        this.onTrackerChange = this.onTrackerChange.bind(this);
        this.onLangProfAdd = this.onLangProfAdd.bind(this);
        this.onLangProfRemove = this.onLangProfRemove.bind(this);
        this.onFeatAdd = this.onFeatAdd.bind(this);
        this.onFeatEdit = this.onFeatEdit.bind(this);
        this.onFeatRemove = this.onFeatRemove.bind(this);
        this.onEquipmentAdd = this.onEquipmentAdd.bind(this);
        this.onEquipmentEdit = this.onEquipmentEdit.bind(this);
        this.onEquipmentRemove = this.onEquipmentRemove.bind(this);
        this.attunedOnChange = this.attunedOnChange.bind(this);
        this.currencyOnChange = this.currencyOnChange.bind(this);
        this.addCustomWeapon = this.addCustomWeapon.bind(this);
        this.addExistingWeapon = this.addExistingWeapon.bind(this);
        this.editCustomWeapon = this.editCustomWeapon.bind(this);
        this.editExistingWeapon = this.editExistingWeapon.bind(this);
        this.onWeaponRemove = this.onWeaponRemove.bind(this);
        this.onSpellAdd = this.onSpellAdd.bind(this);
        this.onSpellRemove = this.onSpellRemove.bind(this);
        this.onSpellEdit = this.onSpellEdit.bind(this);
        this.prepareSpell = this.prepareSpell.bind(this);
        this.unprepareSpell = this.unprepareSpell.bind(this);
        this.slotsOnChange = this.slotsOnChange.bind(this);
        this.setSnackbarOpen = this.setSnackbarOpen.bind(this);
    }

    // Component did mouoont
    componentDidMount() {
        window.addEventListener('keydown', (e) => {
            if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.code === "KeyS") {
                e.preventDefault();
                this.saveFile();
              }
        });
    }

    // Character Info Block
    charInfoOnChange(item, value) {
        this.storage.character_info[item] = value;
    }

    classOnChange(indx1, indx2, value) {
        this.storage.character_info.Classes[indx1][indx2] = value;
    }

    levelOnChange(indx, count) {
        this.storage.character_info.Classes[indx][2] = count;
    }

    classOnAdd() {
        this.storage.character_info.Classes.push(["", "", 1]);
    }

    classOnRemove(indx) {
        this.storage.character_info.Classes.splice(indx, 1);
    }

    // StatBlock
    statOnChange(statname, statvalue) {
        let statblock = this.state.statblock;
        statblock[statname] = (!(statvalue/2) && statvalue.length >= 1) ? 0 : statvalue;

        this.setState({statblock: statblock});
    }

    // ProfBlock
    profOnChange(value) {
        this.setState({proficiencyBonus: ((!(value/2) && value.length >= 1) ? 0 : value)});
    }

    skillOverrideOnChange(skill, value) {
        this.storage.skills[skill].override = value;
    }

    skillStatOnChange(skill, value) {
        this.storage.skills[skill].statname = value;
    }

    skillProfOnChange(skill, value) {
        this.storage.skills[skill].proficiency = value;
    }

    // SaveBlock
    saveOverrideOnChange(save, value) {
        this.storage.saves[save].override = value;
    }

    saveProfOnChange(save, value) {
        this.storage.saves[save].proficiency = value;
    }

    // Tabs
    skillSaveTabsOnChange(e, value) {
        this.setState({"skillsavetabs": value});
    }

    fesTabsOnChange(e, value) {
        this.setState({"festabs": value});
    }

    mainTabsOnChange(e, value) {
        this.setState({"maintabs": value});
    }

    // SpellDCBlock
    spellAbilityOnChange(value) {
        const spelldcblock = this.state.spelldcblock;
        spelldcblock.statname = value;

        this.setState({spelldcblock});
    }

    spellOverrideOnChange(value, item) {
        const spelldcblock = this.state.spelldcblock;
        spelldcblock.override[item] = value;

        this.setState({spelldcblock});
    }
    
    // ArmorBlock
    armorblockOnChange(value, category, subcategory) {
        if (subcategory) {
            this.storage.armorblock[category][subcategory] = value;
        } else {
            this.storage.armorblock[category] = value;
        }
    }

    // Trackerblock
    onTrackerAdd() {
        this.storage.trackerblock.push({
            name: "",
            total: "",
            used: ""
        });
    }

    onTrackerRemove(indx) {
        this.storage.trackerblock.splice(indx, 1);
    }

    onTrackerChange(indx, item, value) {
        this.storage.trackerblock[indx][item] = value;
    }

    // Langprofblock
    onLangProfAdd(lpCategory, lpName) {
        let langprofblock = this.storage.langprofblock;
        lpCategory = lpCategory.title;
        if (lpCategory in langprofblock) {
            langprofblock[lpCategory].push(lpName);
            langprofblock[lpCategory].sort();
        } else {
            langprofblock[lpCategory] = [lpName];
        }
        this.storage.langprofblock = langprofblock;
    }

    onLangProfRemove(lpCategory, indx) {
        if (indx !== null) {
            this.storage.langprofblock[lpCategory].splice(indx, 1);
        } else {
            delete this.storage.langprofblock[lpCategory];
        }
    }

    // Feat Block
    onFeatAdd(featName, featLevel, featDesc) {
        const block = {
            featName: featName,
            featLevel: featLevel,
            featDesc: featDesc
        }
        this.storage.featblock.push(block);
    }

    onFeatRemove(indx) {
        this.storage.featblock.splice(indx, 1);
    }

    onFeatEdit(indx, featName, featLevel, featDesc) {
        this.storage.featblock[indx].featName = featName;
        this.storage.featblock[indx].featLevel = featLevel;
        this.storage.featblock[indx].featDesc = featDesc;
    }

    // Equipment Block
    equipmentSort(a, b) {
        return a.name < b.name ? -1 : a.name === b.name ? 0 : 1;
    }

    onEquipmentAdd(category, name, quantity, weight, desc) {

        if (!(category in this.storage.equipmentblock.equipment)) {
            this.storage.equipmentblock.equipment[category] = [
                {
                    name, quantity, weight, desc
                }
            ];
        } else {
            this.storage.equipmentblock.equipment[category].push({
                name, quantity, weight, desc
            });

            this.storage.equipmentblock.equipment[category].sort(this.equipmentSort);
            
            if (category === "Weapons") {
                const weaponblock = this.state.weaponblock;
                this.storage.equipmentblock.equipment[category].forEach((item, indx) => {
                    const wIndx = item.wIndx;
                    if (wIndx || wIndx === 0) {
                        console.log(weaponblock[wIndx]);
                        weaponblock[wIndx].wIndx = indx;
                    }
                });

                this.setState({weaponblock});
            }
        }
    }

    onEquipmentRemove(category, indx) {
        if (indx !== null) {
            if (category === "Weapons") {
                const wIndx = this.storage.equipmentblock.equipment[category][indx].wIndx;
                const weaponblock = this.state.weaponblock;

                if (wIndx || wIndx === 0) {
                    weaponblock.splice(wIndx, 1);
                    for (let i = wIndx; i < weaponblock.length; i++) {
                        const weapon = weaponblock[i];
                        if (weapon.type === "existing") {
                            this.storage.equipmentblock.equipment.Weapons[weapon.wIndx].wIndx -= 1;
                        }
                    }
                }               

                this.storage.equipmentblock.equipment[category].splice(indx, 1);
                for (let i = indx; i < this.storage.equipmentblock.equipment[category].length; i++) {
                    const weapon = this.storage.equipmentblock.equipment[category][i];
                    if (weapon.wIndx || weapon.wIndx === 0) {
                        weaponblock[weapon.wIndx].wIndx -= 1;
                    }
                }


                this.setState({weaponblock: weaponblock});
            } else {
                this.storage.equipmentblock.equipment[category].splice(indx, 1);
            }
        } else {
            delete this.storage.equipmentblock.equipment[category];
        }
    }

    onEquipmentEdit(category, indx, name, quantity, weight, desc, prevCategory) {
        if (prevCategory !== category) {
            this.onEquipmentAdd(category, name, quantity, weight, desc);
            this.onEquipmentRemove(prevCategory, indx);
        } else {
            if (category !== "Weapons") {
                this.storage.equipmentblock.equipment[category][indx] = {name, quantity, weight, desc};
                this.storage.equipmentblock.equipment[category].sort(this.equipmentSort);
            } else {
                const wIndx = this.storage.equipmentblock.equipment[category][indx].wIndx
                if (!wIndx && wIndx !== 0) {
                    this.storage.equipmentblock.equipment[category][indx] = {name, quantity, weight, desc};
                } else {
                    this.storage.equipmentblock.equipment[category][indx] = {name, quantity, weight, desc, wIndx};
                }

                this.storage.equipmentblock.equipment[category].sort(this.equipmentSort);

                const weaponblock = this.state.weaponblock;
                this.storage.equipmentblock.equipment[category].forEach((item, indx) => {
                    const wIndx = item.wIndx;
                    if (wIndx || wIndx === 0) {
                        weaponblock[wIndx].wIndx = indx;
                    }
                });

                this.setState({weaponblock});
            }
        }
    }

    currencyOnChange(currency, value) {
        this.storage.equipmentblock.currency[currency] = value;
    }

    attunedOnChange(attuned, value) {
        this.storage.equipmentblock.attuned[attuned] = value;
    }

    // Weapon Block
    addCustomWeapon(stat, prof, name, damage, damageType, desc, hitBonus, damageBonus, properties) {
        const weaponblock = this.state.weaponblock;
        weaponblock.push({
            stat, prof, name, damage, damageType, desc, hitBonus, damageBonus, type: "custom", properties
        });

        this.setState({weaponblock: weaponblock});
    }

    addExistingWeapon(wIndx, stat, prof, damage, damageType, hitBonus, damageBonus, properties) {
        let weaponblock = this.state.weaponblock;
        weaponblock.push({
            wIndx, stat, prof, damage, damageType, hitBonus, damageBonus, type: "existing", properties
        });

        console.log(weaponblock.length - 1);

        this.storage.equipmentblock.equipment.Weapons[wIndx].wIndx = weaponblock.length - 1;

        this.setState({weaponblock: weaponblock});
    }

    editCustomWeapon(indx, stat, prof, name, damage, damageType, desc, hitBonus, damageBonus, properties) {
        const weaponblock = this.state.weaponblock;
        weaponblock[indx] = {
            stat, prof, name, damage, damageType, desc, hitBonus, damageBonus, type: "custom", properties
        };

        this.setState({weaponblock: weaponblock});
    }

    editExistingWeapon(indx, wIndx, stat, prof, damage, damageType, hitBonus, damageBonus, properties) {
        const weaponblock = this.state.weaponblock;
        weaponblock[indx] = {
            wIndx, stat, prof, damage, damageType, hitBonus, damageBonus, type: "existing", properties
        }

        this.setState({weaponblock: weaponblock});
    }

    onWeaponRemove(indx, wIndx) {
        const weaponblock = this.state.weaponblock;
        const weaponType = weaponblock[indx].type;
        weaponblock.splice(indx, 1);

        if (weaponType === "existing") delete this.storage.equipmentblock.equipment.Weapons[wIndx].wIndx;

        this.setState({weaponblock: weaponblock});
    }

    // Spell
    onSpellAdd(level, school, name, castingTime, range, components, duration, desc, newSpellprepblock) {
        const sortFunction = (a, b) => a.name < b.name ? -1 : a.name === b.name ? 0 : 1;

        const spellprepblock = newSpellprepblock ? newSpellprepblock : this.state.spellprepblock;
        spellprepblock.unprepared[level].push({name, indx: this.storage.spellblock[level].length});
        spellprepblock.unprepared[level].sort(sortFunction);

        this.storage.spellblock[level].push({
            level, school, name, castingTime, range, components, duration, desc
        });

        spellprepblock.unprepared[level].forEach((preppedSpell, preppedIndx) => {
            this.storage.spellblock[level][preppedSpell.indx].prepIndx = preppedIndx;
            this.storage.spellblock[level][preppedSpell.indx].isPrepped = false;
        });

        this.storage.spellblock[level].sort(sortFunction);

        this.storage.spellblock[level].forEach((spell, spellIndx) => {
            if (!spell.isPrepped) {
                spellprepblock.unprepared[level][spell.prepIndx].indx = spellIndx;
            } else {
                spellprepblock[level].spells[spell.prepIndx].indx = spellIndx;
            }
        });

        this.setState({spellprepblock});
    }

    onSpellRemove(spell, indx, partOfEdit) {
        const spellprepblock = this.state.spellprepblock;
        const isPrepped = this.storage.spellblock[spell.level][indx].isPrepped;
        const prepIndx = this.storage.spellblock[spell.level][indx].prepIndx;

        if (isPrepped) {
            spellprepblock[spell.level].spells.splice(prepIndx, 1);
            for (let i = prepIndx; i < spellprepblock[spell.level].spells.length; i++) {
                let currentSpell = spellprepblock[spell.level].spells[i];
                this.storage.spellblock[spell.level][currentSpell.indx].prepIndx -= 1;
            }
        } else {
            spellprepblock.unprepared[spell.level].splice(prepIndx, 1);
            for (let i = prepIndx; i < spellprepblock.unprepared[spell.level].length; i++) {
                let currentSpell = spellprepblock.unprepared[spell.level][i];
                this.storage.spellblock[spell.level][currentSpell.indx].prepIndx -= 1;
            }
        }

        this.storage.spellblock[spell.level].splice(indx, 1);
        for (let i = indx; i < this.storage.spellblock[spell.level].length; i++) {
            let currentSpell = this.storage.spellblock[spell.level][i];
            console.log(currentSpell);
            if (currentSpell.isPrepped) {
                spellprepblock[spell.level].spells[currentSpell.prepIndx].indx -= 1;
            } else {
                spellprepblock.unprepared[spell.level][currentSpell.prepIndx].indx -= 1;
            }
        }

        if (partOfEdit) return spellprepblock;
        this.setState({spellprepblock});
    }

    onSpellEdit(level, indx, school, name, castingTime, range, components, duration, desc, prevLevel) {
        const spell = {
            level: prevLevel, indx, school, name, castingTime, range, components, duration, desc
        };
        
        const spellprepblock = this.onSpellRemove(spell, indx, true);

        spell.level = level;
        this.onSpellAdd(level, school, name, castingTime, range, components, duration, desc, spellprepblock);
    }

    // Spell Prep
    prepareSpell(level, indx) {
        const sortFunction = (a, b) => a.name < b.name ? -1 : a.name === b.name ? 0 : 1;

        const spellprepblock = this.state.spellprepblock;
        const candidateSpell = spellprepblock.unprepared[level][indx];

        spellprepblock.unprepared[level].splice(indx, 1);
        spellprepblock[level].spells.push(candidateSpell);
        spellprepblock[level].spells.sort(sortFunction);

        spellprepblock[level].spells.forEach((spell, spellIndx) => {
            this.storage.spellblock[level][spell.indx].prepIndx = spellIndx;
        });

        spellprepblock.unprepared[level].forEach((spell, spellIndx) => {
            this.storage.spellblock[level][spell.indx].prepIndx = spellIndx;
        });

        this.storage.spellblock[level][candidateSpell.indx].isPrepped = true;

        this.setState({spellprepblock});
    }

    unprepareSpell(level, indx) {
        const sortFunction = (a, b) => a.name < b.name ? -1 : a.name === b.name ? 0 : 1;

        const spellprepblock = this.state.spellprepblock;
        const candidateSpell = spellprepblock[level].spells[indx];

        spellprepblock[level].spells.splice(indx, 1);
        spellprepblock.unprepared[level].push(candidateSpell);
        spellprepblock.unprepared[level].sort(sortFunction);

        spellprepblock[level].spells.forEach((spell, spellIndx) => {
            this.storage.spellblock[level][spell.indx].prepIndx = spellIndx;
        });

        spellprepblock.unprepared[level].forEach((spell, spellIndx) => {
            this.storage.spellblock[level][spell.indx].prepIndx = spellIndx;
        });

        this.storage.spellblock[level][candidateSpell.indx].isPrepped = false;

        this.setState({spellprepblock});
    }

    slotsOnChange(level, item, value) {
        const spellprepblock = this.state.spellprepblock;
        spellprepblock[level][item] = value;

        this.setState({spellprepblock});
    }

    // File
    fileUpload(e) {
        const fileReader = new FileReader();
        const file = e.target.files[0];

        fileReader.readAsText(file, "UTF-8");

        fileReader.onload = this.editStorage.bind(this);
    }

    editStorage(e) {
        const jsonObj = this.convertLegacyCharacter(JSON.parse(e.target.result));
        console.log(jsonObj);
        console.log(this.storage);
        console.log(this.state);

        sessionStorage.setItem("file", JSON.stringify(jsonObj));
        window.location.reload();
    }

    convertLegacyCharacter(jsonObj) {
        if ("fesblock" in jsonObj) {
            // Set Legacy Character
            sessionStorage.setItem("isLegacyCharacter", "true");
            // Character Info
            jsonObj.character_info.Classes = [[jsonObj.character_info["Class & Level"], "", 1]];
            delete jsonObj.character_info["Class & Level"];

            // Saves, Skills and Proficiency
            jsonObj.proficiencyBonus = parseInt(jsonObj.profblock.prof_var);
            jsonObj.skills = jsonObj.profblock.skills;
            Object.keys(jsonObj.skills).forEach((key) => {
                let override = parseInt(jsonObj.skills[key].override);
                jsonObj.skills[key].override = override ? parseInt(override) : 0;
            });

            jsonObj.saves = jsonObj.profblock.saves;
            Object.keys(jsonObj.saves).forEach((key) => {
                let override = parseInt(jsonObj.saves[key].override);
                jsonObj.saves[key].override = override ? parseInt(override) : 0;
            });

            delete jsonObj.profblock;

            // Stats
            const statblock = jsonObj.statblock;
            Object.keys(statblock).forEach((key) => {jsonObj.statblock[key] = parseInt(statblock[key])});

            // Weaponblock
            jsonObj.weaponblock = [];

            // Equipmentblock
            const equipmentblock = jsonObj.fesblock.equipmentblock;
            Object.keys(equipmentblock.attuned).forEach((subkey) => {
                const value = parseInt(equipmentblock.attuned[subkey]);
                equipmentblock.attuned[subkey] = value ? value : subkey === "Maximum Attuned" ? 3 : 0;
            });

            Object.keys(equipmentblock.currency).forEach((subkey) => {
                equipmentblock.currency[subkey] = equipmentblock.currency[subkey].length > 0 ? parseInt(equipmentblock.currency[subkey]) : 0;
            });

            Object.keys(equipmentblock.equipment).forEach((category) => {
                let group = equipmentblock.equipment[category];
                group.forEach((item, indx) => {
                    group[indx].name = item.itemname;
                    group[indx].weight = 0;
                    delete group[indx].itemname;
                    delete group[indx].category;
                });

                equipmentblock.equipment[category] = group;
            });

            if (!("Weapons" in equipmentblock.equipment)) equipmentblock.equipment.Weapons = [];
            jsonObj.equipmentblock = equipmentblock;
            
            // Featblock
            const featblock = [];
            jsonObj.fesblock.featblock.forEach((feat, indx) => {
                feat.featName = feat.featname;
                feat.featLevel = 1;
                feat.featDesc = feat.description;

                delete feat.featname;
                delete feat.description;

                featblock.push(feat);
            });

            jsonObj.featblock = featblock;

            // Spell block
            const spellprepblock = {
                unprepared: {}
            };
            const spellblock = {};
            Object.keys(jsonObj.fesblock.spellblock).forEach((key) => {
                const currentLevel = jsonObj.fesblock.spellblock[key];
                const items = [];

                spellprepblock.unprepared[key] = [];

                currentLevel.forEach((spell, indx) => {
                    spell.castingTime = spell.casting_time;
                    spell.level = spell.spell_level;
                    spell.name = spell.spellname;
                    spell.desc = spell.description;
                    spell.school = "Abjuration";
                    spell.isPrepped = false;
                    spell.prepIndx = spellprepblock.unprepared[key].length;

                    delete spell.casting_time;
                    delete spell.spell_level;
                    delete spell.spellname;
                    delete spell.description;

                    spellprepblock.unprepared[key].push({
                        name: spell.name, indx: items.length
                    });

                    items.push(spell);
                });

                spellblock[key] = items;
                const slots_total = parseInt(jsonObj.spellprepblock.spellprepblock[key].slots_total);
                const slots_expended = parseInt(jsonObj.spellprepblock.spellprepblock[key].slots_expended);
                spellprepblock[key] = {
                    spells: [],
                    slots_total: slots_total ? slots_total : 0,
                    slots_expended: slots_expended ? slots_expended : 0
                };
            });

            jsonObj.spellblock = spellblock;
            jsonObj.spellprepblock = spellprepblock;

            // Tracker block
            const trackerblock = [];
            jsonObj.fesblock.trackerblock.forEach((tracker) => {
                tracker.name = tracker["Tracker Name"];
                tracker.total = tracker["Total"];
                tracker.used = tracker["Used"];

                delete tracker["Tracker Name"];
                delete tracker["Total"];
                delete tracker["Used"];

                trackerblock.push(tracker);
            });

            jsonObj.trackerblock = trackerblock;

            delete jsonObj.fesblock;

            // Spell DC Block
            const spelldcblock = jsonObj.spelldcblock;
            const spellsavedc = parseInt(spelldcblock.override_spellsave) ? parseInt(spelldcblock.override_spellsave) : 0;
            const spellattack = parseInt(spelldcblock.override_to_hit) ? parseInt(spelldcblock.override_to_hit) : 0;
            spelldcblock.override = {
                spellsavedc, spellattack
            }

            delete spelldcblock["to_hit"];
            delete spelldcblock["spellsave"];
            delete spelldcblock.override_spellsave;
            delete spelldcblock.override_to_hit;

            jsonObj.spelldcblock = spelldcblock;
        }

        return jsonObj;
    }

    async saveFile() {
        const jsonObj = this.storage;
        jsonObj.statblock = this.state.statblock;
        jsonObj.proficiencyBonus = this.state.proficiencyBonus;
        jsonObj.spellprepblock = this.state.spellprepblock;
        jsonObj.weaponblock = this.state.weaponblock;
        jsonObj.spelldcblock = this.state.spelldcblock;

        try {
            window.remote.dialog.showSaveDialog({
                title: 'Select the File Path to save',
                buttonLabel: 'Save',
                filters: [
                    {
                        name: 'JSON File',
                        extensions: ['json']
                    }, ],
                properties: []
            }).then(file => {
                window.fs.writeFile(file.filePath.toString(), JSON.stringify(jsonObj), (err) => {
                    if (err) throw err;
                    console.log('Saved!');
                });
            });
        } catch (err) {
            console.error(err.name, err.message);
        }
    }

    // Snackbar
    setSnackbarOpen(snackbarOpen) {
        sessionStorage.removeItem("file");
        sessionStorage.removeItem("isLegacyCharacter");
        this.setState({snackbarOpen});
    }

    render() {
        return (
            <div>
                <Grid
                    container
                    style={{"margin": "5px 0px 5px 0px", "paddingTop": 5}}
                    className={this.classes.root}
                    spacing={1}
                >
                    <Grid item xs={6} md={2}>
                        <Button variant="contained" onClick={() => this.saveFile()} fullWidth disableElevation>
                            Save Character (Ctrl + s)
                        </Button>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        {/* <Input type="file" name="file" onChange={this.fileUpload.bind(this)}/> */}
                        <label htmlFor="upload-character">
                            <input
                                style={{ display: 'none' }}
                                id="upload-character"
                                type="file"
                                name="JSON file"
                                accept=".json"
                                onChange={this.fileUpload.bind(this)}
                            />

                            <Button variant="contained" component="span" fullWidth disableElevation>
                                Load Character
                            </Button>
                        </label>
                        
                        <InfoSnackBar open={this.state.snackbarOpen} setOpen={this.setSnackbarOpen}/>
                    </Grid>
                </Grid>
                <Tabs
                    value={this.state.maintabs} 
                    onChange={(e, value) => this.mainTabsOnChange(e, value)}
                    indicatorColor="primary"
                    textColor="primary"
                    component={Paper}
                    scrollButtons="auto"
                    variant="scrollable"
                >
                    <Tab label="Main"/>
                    <Tab label="Spells"/>
                </Tabs>
                <TabPanel value={this.state.maintabs} index={0}>
                    <div style={{padding: "10px 20px 0px 0px"}}>

                        <Grid 
                            container
                            style={{"margin": "10px 0px 10px 0px"}}
                            className={this.classes.root}
                            spacing={2}
                            alignItems="flex-start"
                        >

                            <Grid container item xs={12} md={5}>
                                <InfoBlock 
                                    info={this.storage.character_info}
                                    infoOnChange={this.charInfoOnChange}
                                    classOnChange={this.classOnChange}
                                    levelOnChange={this.levelOnChange}
                                    classOnAdd={this.classOnAdd}
                                    classOnRemove={this.classOnRemove}
                                />
                            </Grid>

                            <Grid container item xs={5} md={3}>
                                <ArmorBlock armorblock={this.storage.armorblock} onChange={this.armorblockOnChange}/>
                            </Grid>

                            <Grid container item xs={7} md={4}>
                                <SpellDCBlock 
                                    proficiencyBonus={this.state.proficiencyBonus}
                                    stats={this.state.statblock}
                                    spelldcblock={this.state.spelldcblock}
                                    overrideOnChange={this.spellOverrideOnChange}
                                    spellAbilityOnChange={this.spellAbilityOnChange}
                                />
                            </Grid>
                            
                            <Grid container item xs={12} md={5} >
                                <Grid item xs={12}>
                                    <StatBlock onChange={this.statOnChange} stats={this.state.statblock}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12}>
                                        <Tabs
                                            value={this.state.skillsavetabs}
                                            onChange={(e, value) => this.skillSaveTabsOnChange(e, value)}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            variant="fullWidth"
                                            scrollButtons="auto"
                                        >
                                            <Tab label="Skills"/>
                                            <Tab label="Saving Throws"/>
                                        </Tabs>
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: 15}}>
                                        <TabPanel value={this.state.skillsavetabs} index={0}>
                                            <ProfBlock 
                                                proficiencyBonus={this.state.proficiencyBonus}
                                                skills={this.storage.skills}
                                                stats={this.state.statblock}
                                                profOnChange={this.profOnChange}
                                                skillOverrideOnChange={this.skillOverrideOnChange}
                                                skillStatOnChange={this.skillStatOnChange}
                                                skillProfOnChange={this.skillProfOnChange}
                                            />
                                        </TabPanel>
                                        <TabPanel value={this.state.skillsavetabs} index={1}>
                                            <SaveBlock
                                                proficiencyBonus={this.state.proficiencyBonus}
                                                saves={this.storage.saves}
                                                stats={this.state.statblock}
                                                profOnChange={this.profOnChange}
                                                saveOverrideOnChange={this.saveOverrideOnChange}
                                                saveProfOnChange={this.saveProfOnChange}
                                            />
                                        </TabPanel>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} md={7} spacing={1}>
                                <Grid item xs={3} md={3}>
                                    <LangProfBlock
                                        langprofblock={this.storage.langprofblock}
                                        onLangProfAdd={this.onLangProfAdd}
                                        onLangProfRemove={this.onLangProfRemove}
                                    />
                                </Grid>

                                <Grid item xs={9} md={9}>
                                    <WeaponBlock
                                        equipmentblock={this.storage.equipmentblock}
                                        proficiencyBonus={this.state.proficiencyBonus}
                                        stats={this.state.statblock}
                                        weaponblock={this.state.weaponblock}
                                        addCustomWeapon={this.addCustomWeapon}
                                        addExistingWeapon={this.addExistingWeapon}
                                        editCustomWeapon={this.editCustomWeapon}
                                        editExistingWeapon={this.editExistingWeapon}
                                        onWeaponRemove={this.onWeaponRemove}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Tabs
                                        value={this.state.festabs}
                                        onChange={(e, value) => this.fesTabsOnChange(e, value)}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="scrollable"
                                        scrollButtons="auto"
                                    >
                                        <Tab label="Feats"/>
                                        <Tab label="Equipment"/>
                                        <Tab label="Spells"/>
                                        <Tab label="Trackers"/>
                                    </Tabs>
                                </Grid>
                                <Grid item xs={12} style={{marginTop: 15}}>
                                    <TabPanel value={this.state.festabs} index={0}>
                                        <FeatBlock
                                            featblock={this.storage.featblock}
                                            onFeatAdd={this.onFeatAdd}
                                            onFeatEdit={this.onFeatEdit}
                                            onFeatRemove={this.onFeatRemove}
                                        />
                                    </TabPanel>
                                    <TabPanel value={this.state.festabs} index={1}>
                                        <EquipmentBlock 
                                            equipmentblock={this.storage.equipmentblock}
                                            onEquipmentAdd={this.onEquipmentAdd}
                                            onEquipmentRemove={this.onEquipmentRemove}
                                            onEquipmentEdit={this.onEquipmentEdit}
                                            currencyOnChange={this.currencyOnChange}
                                            attunedOnChange={this.attunedOnChange}
                                        />
                                    </TabPanel>
                                    <TabPanel value={this.state.festabs} index={2}>
                                        <SpellBlock 
                                            spellblock={this.storage.spellblock}
                                            onSpellAdd={this.onSpellAdd}
                                            onSpellRemove={this.onSpellRemove}
                                            onSpellEdit={this.onSpellEdit}
                                        />
                                    </TabPanel>
                                    <TabPanel value={this.state.festabs} index={3}>
                                        <TrackerBlock 
                                            trackers={this.storage.trackerblock}
                                            onTrackerAdd={this.onTrackerAdd}
                                            onTrackerRemove={this.onTrackerRemove}
                                            onChange={this.onTrackerChange}
                                        />
                                    </TabPanel>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.maintabs} index={1}>
                    <div style={{padding: "10px 20px 0px 0px"}}>
                        <Grid
                            container
                            style={{"margin": "10px 0px 10px 0px"}}
                            className={this.classes.root}
                            spacing={2}
                            alignItems="center"
                            alignContent="center"
                        >
                            <Grid container item xs={12}>
                                <Grid item xs={6} md={4}>
                                    <SpellDCBlock 
                                        proficiencyBonus={this.state.proficiencyBonus}
                                        stats={this.state.statblock}
                                        spelldcblock={this.state.spelldcblock}
                                        overrideOnChange={this.spellOverrideOnChange}
                                        spellAbilityOnChange={this.spellAbilityOnChange}
                                    />
                                </Grid>
                                
                                
                            </Grid>

                            <Grid item xs={12}>
                                <Divider fullWidth/>
                            </Grid>

                            <SpellPrepBlock
                                spellblock={this.storage.spellblock}
                                spellprepblock={this.state.spellprepblock}
                                prepareSpell={this.prepareSpell}
                                unprepareSpell={this.unprepareSpell}
                                slotsOnChange={this.slotsOnChange}
                            />

                        </Grid>
                    </div>
                </TabPanel>
                
            </div>
        )
    }
}

export default withStyles(styles)(MainPage);