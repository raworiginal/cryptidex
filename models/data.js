const Glossary = {
  monsterTypes: [
    { name: "Beast", motivation: "to run wild, destroying and killing" },
    {
      name: "Breeder",
      motivation: "to give birth to, bring forth, or create evil",
    },
    { name: "Collector", motivation: "to steal specific sorts of things" },
    { name: "Destroyer", motivation: "to bring about the end of the world" },
    { name: "Devourer", motivation: "to consume people" },
    { name: "Executioner", motivation: "to punish the guilty" },
    { name: "Parasite", motivation: "to infest, control and devour" },
    { name: "Queen", motivation: "to possess and control" },
    { name: "Sorcerer", motivation: "to usurp unnatural power" },
    { name: "Tempter", motivation: "to tempt people into evil deeds" },
    { name: "Torturer", motivation: "to hurt and terrify" },
    { name: "Trickster", motivation: "to create chaos" },
  ],
  rangeTags: [
    {
      name: "initimate",
      meaning:
        "Effective at the closest of quarters (within the embrace of the enemy).",
    },
    { name: "hand", meaning: "Effective within arm's reach" },
    {
      name: "close",
      meaning:
        "Effective at fairly close quarters (outside arm's reach, but not too far).",
    },
    { name: "far", meaning: "Effective at long range" },
  ],
  otherTags: [
    {
      name: "area",
      meaning:
        "Can hit muliple targets. Monster may divide the harm it inflicts among multiple targets",
    },
    {
      name: "barrier",
      meaning:
        "Does harm to anything that passes through. Counts as armor against any attacks that pass through it.",
    },
    {
      name: "fire",
      meaning: "Sets things on fire",
    },
    {
      name: "forceful",
      meaning:
        "Pushes things around, allowing the monster 'force them where they want them' in addition to normal attack effects",
    },
    {
      name: "ignore-armor",
      meaning:
        "Ignores protective armor. Armour has no effect of the harm of this attack. If the armor has the magic tag, the the attack needs both ignore-armor and magic tags to bypass the armor.",
    },
    {
      name: "loud",
      meaning: "Loud enough to draw attention",
    },
    {
      name: "magic",
      meaning:
        "Enchanted, and so can affect certain creatures and armors that are proof against normal weapons or attacks",
    },
    {
      name: "messy",
      meaning: "Spreads a lot of blood and gore around",
    },
    {
      name: "restraining",
      meaning: "Grabs or entangles the victim",
    },
    {
      name: "vampiric",
      meaning:
        "Transfer life entery: the monster is healded for as many points of harm as were inflicted. (E.g. if it inflicts 2-harm, than it heals 2-harm from its injuries",
    },
  ],
};
module.exports = Glossary;
