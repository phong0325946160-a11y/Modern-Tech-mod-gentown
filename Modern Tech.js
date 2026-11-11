/**
 * Modern Disasters & Technology Mod for Gentown (R74n)
 * Modder: Community
 */

(function() {
    'use strict';

    console.log("Loading Modern Disasters & Tech Mod for Gentown...");

    // 1. Configuration & Modern Technology State
    window.ModernTechMod = {
        techLevel: 1, // 1: Computer Era, 2: Internet Era
        computers: 0,
        serverTowers: 0,
        powerGridActive: true,
        cyberAttackRisk: 0.05, // 5% risk of network failure per cycle
        disasterMultiplier: 2.5 // Increase disaster frequency to 250%
    };

    // 2. Definition of New Events & Disasters
    const modernDisasters = [
        {
            name: "National Server Outage (Cyber Outage)",
            type: "modern",
            description: "All computer networks have been disconnected. Technology production is stalled!",
            trigger: function() {
                if (ModernTechMod.computers > 0) {
                    ModernTechMod.powerGridActive = false;
                    return true;
                }
                return false;
            }
        },
        {
            name: "Tropical Superstorm & Flooding",
            type: "natural",
            description: "A superstorm swept through, destroying infrastructure and broadcast towers!",
            trigger: function() {
                if (Math.random() < 0.4) {
                    ModernTechMod.serverTowers = Math.max(0, ModernTechMod.serverTowers - 1);
                    return true;
                }
                return false;
            }
        },
        {
            name: "Electronic Waste Crisis (E-Waste Crisis)",
            type: "pollution",
            description: "Too many old computers are causing soil pollution and reducing agricultural yield.",
            trigger: function() {
                return ModernTechMod.computers > 10;
            }
        }
    ];

    // 3. Function to Trigger Random Disasters Frequently
    function triggerRandomDisaster() {
        const isModern = Math.random() < 0.5;
        if (isModern) {
            const disaster = modernDisasters[Math.floor(Math.random() * modernDisasters.length)];
            if (disaster.trigger()) {
                console.warn(`[SYSTEM DISASTER]: ${disaster.name} - ${disaster.description}`);
                if (typeof console !== "undefined") {
                    console.log(`WARNING SYSTEM DISASTER: ${disaster.name}`);
                }
            }
        }
    }

    // 4. Loop to Increase Disaster Frequency (Runs every 10 seconds)
    setInterval(() => {
        if (Math.random() < (0.3 * ModernTechMod.disasterMultiplier)) {
            triggerRandomDisaster();
        }
    }, 10000);

    // 5. Add Modern Buildings to the Game
    window.ModernTechMod.buildComputer = function() {
        ModernTechMod.computers += 1;
        console.log(`Built 1 Computer (Total: ${ModernTechMod.computers})`);
    };

    window.ModernTechMod.buildServerTower = function() {
        ModernTechMod.serverTowers += 1;
        console.log(`Built 1 Broadcast Tower (Total: ${ModernTechMod.serverTowers})`);
    };

    console.log("Mod loaded successfully! Type 'ModernTechMod' in the Console to check status.");
})();