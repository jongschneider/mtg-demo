// Shared enums
export const CardRarity = {
  Common: 'Common',
  Uncommon: 'Uncommon',
  Rare: 'Rare',
  MythicRare: 'Mythic Rare',
} as const;

export type CardRarityType = typeof CardRarity[keyof typeof CardRarity];
